import { CustomBody } from "@/components/Body/CustomeBody";
import { CustomHead } from "@/components/Head/CustomHead";
import { webScraperRoutes } from "@/utils/ApiRoutes";
import { HtmlElementToJsonType, WebPageData } from "@/utils/InterfaceType";
import axios from "axios";
import { parse } from "himalaya";
import React from "react";
// import https from "https";

async function getData(webUrl: string): Promise<WebPageData[]> {
  // const response = await fetch("api/webscraper" + `/?url=${webUrl}`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // return (await response.json()).val;

  const encodedPath: string = encodeURIComponent(webUrl);

  const response = await axios.get(webScraperRoutes, {
    params: {
      path: encodedPath,
      domainName: process.env.DOMAIN_NAME,
    },
    // httpsAgent: new https.Agent({
    //   rejectUnauthorized: false,
    // }),
  });
  return response.data.val;
}

export async function Home(url: string = ""): Promise<React.JSX.Element> {
  if (url == undefined) {
    return <div>Invalid url</div>;
  }

  const response: WebPageData[] = await getData(url);

  if (response.length === 0) {
    return <div> No data found </div>;
  }

  const htmlResponseItem: WebPageData[] = response.filter(
    (item: WebPageData) =>
      item.resourceType === "document" && item.responseText !== ""
  );

  const cssResponseItem: WebPageData[] = response.filter(
    (item: WebPageData) => item.resourceType === "stylesheet"
  );

  const jsResponseItem: WebPageData[] = response.filter(
    (item: WebPageData) => item.resourceType === "script"
  );

  return (
    <>
      {htmlResponseItem.map((webPage: WebPageData, index: number) => {
        const htmlBodyJson: HtmlElementToJsonType[] = parse(
          webPage.responseText
        ) as unknown as HtmlElementToJsonType[];

        const documentJson = htmlBodyJson.filter(
          (item) => item?.tagName === "html"
        )[0];

        const headJson = documentJson?.children?.filter(
          (item) => item?.tagName === "head"
        )[0];

        const bodyJson = documentJson?.children?.filter(
          (item) => item?.tagName === "body"
        )[0];

        return (
          <React.Fragment key={index}>
            <CustomHead headJson={headJson} />
            <CustomBody bodyJson={bodyJson} />
          </React.Fragment>
        );
      })}

      {/* {jsResponseItem?.map((jsItem: WebPageData, index: number) => {
        return <script key={index}> {jsItem.responseText} </script>;
      })} */}
      {/* {cssResponseItem?.map((cssItem: WebPageData, index: number) => {
        return <style key={index}> {cssItem.responseText} </style>;
      })} */}
    </>
  );
}

export default async function Page({
  params,
}: {
  params: { url: string[] };
}): Promise<string | JSX.Element | null> {
  const URL: string = params.url.join("/");
  return await Home(URL);
}
