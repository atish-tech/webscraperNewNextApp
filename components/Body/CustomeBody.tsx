import { HtmlElementToJsonType } from "@/utils/InterfaceType";
import React from "react";
import { NextImage } from "./NextImage";
import { headers } from "next/headers";
import {
  convertStyleKeysToCamelCase,
  createAttribute,
} from "@/utils/ReactSyntex";
import { decode } from "html-entities";

interface CustomHeadPropsType {
  bodyJson: HtmlElementToJsonType;
}

const Element = ({ element }: { element: HtmlElementToJsonType }) => {
  const attributes: Record<string, any> = createAttribute(element);

  if (element.hasOwnProperty("content")) {
    element.content = decode(element.content);
  } else if (element?.children[0]?.hasOwnProperty("content")) {
    element.children[0].content = decode(element.children[0].content);
  }

  // convert style keys to camel case
  if (attributes.hasOwnProperty("style")) {
    attributes.style = convertStyleKeysToCamelCase(attributes.style);
  }

  // add missing attribute
  if (element.tagName === "a") {
    if (!attributes.hasOwnProperty("href") || !attributes.href) {
      attributes.href = "#";
    }
    if (!attributes.hasOwnProperty("title") || !attributes.title) {
      attributes.title = process.env.DOMAIN_NAME;
    }
    const headerList = headers();

    let hrefUrl: string = attributes.href;

    if (
      attributes.hasOwnProperty("href") &&
      hrefUrl.includes(process.env.DOMAIN_NAME as string)
    ) {
      hrefUrl = hrefUrl.replace(
        process.env.DOMAIN_NAME as string,
        headerList.get("host") as string
      );
      hrefUrl = hrefUrl.replace(
        "https://",
        headerList.get("x-forwarded-proto") + "://"
      );
      attributes.href = hrefUrl;
    }

    delete attributes.target;
  }

  // add missing content in button
  else if (
    element.tagName === "button" &&
    !element.hasOwnProperty("content") &&
    element.children.length === 0
  ) {
    element.children = [
      {
        type: "text",
        content: ".",
        tagName: "span",
        attributes: [],
        children: [],
      },
    ];
  }

  // script tag
  if (element.tagName === "script") {
    // return null;
    return <script {...attributes} />;
  }

  // image tag
  else if (element.tagName === "img") {
    return <NextImage attributes={attributes} />;
  } else if (element.tagName === "input") {
    return <input readOnly {...attributes} />;
  }

  // meta and link tags
  else if (element.tagName === "meta" || element.tagName === "link") {
    if (element.tagName === "meta") {
      if (!attributes.hasOwnProperty("content")) {
        attributes.content = process.env.DOMAIN_NAME;
      } else if (!attributes.hasOwnProperty("name")) {
        attributes.name = process.env.DOMAIN_NAME;
      }

      return <meta {...attributes} />;
    } else {
      return <link {...attributes} />;
    }
  }

  // self closing tags
  else if (
    !element.hasOwnProperty("children") ||
    element.children.length === 0
  ) {
    return React.createElement(element.tagName, attributes);
  }

  // all other tags
  else {
    return React.createElement(
      element.tagName,
      attributes,
      element?.children
        ? element?.children?.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )
        : element?.content
          ? element.content
          : null
    );
  }
};

export function CustomBody({
  bodyJson,
}: CustomHeadPropsType): React.JSX.Element {
  return (
    <div>
      {bodyJson?.children?.map((child, index) =>
        child.type === "element" ? (
          <Element key={index} element={child} />
        ) : (
          child.content
        )
      )}
    </div>
  );
}
