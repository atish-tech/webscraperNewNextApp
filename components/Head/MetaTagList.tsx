import { HtmlElementToJsonType } from "@/utils/InterfaceType";

export const MetaTagList = ({
  metaElements,
}: {
  metaElements: HtmlElementToJsonType[];
}) => {
  return (
    <>
      {metaElements?.map((meta, index) => {
        const attributes: Record<string, string> = meta.attributes.reduce(
          (acc: Record<string, string>, attr: Record<string, string>) => {
            // acc[attr.key === "http-equiv" ? "httpEquiv" : attr.key] =
            //   attr.value;
            const key: string = attr.key;
            if (key === "http-equiv") {
              acc["httpEquiv"] = attr.value;
            } else if (key === "charset") {
              acc["charSet"] = attr.value;
            } else {
              acc[attr.key] = attr.value;
            }

            return acc;
          },
          {} as Record<string, string>
        );

        return <meta key={index} {...attributes} />;
      })}
    </>
  );
};
