import { HtmlElementToJsonType } from "@/utils/InterfaceType";
import Script from "next/script";

export const ScriptTagList = ({
  scriptElements,
}: {
  scriptElements: HtmlElementToJsonType[];
}) => {
  return (
    <>
      {scriptElements?.map((script, index) => {
        const attributes: Record<string, string> = script.attributes.reduce(
          (acc: Record<string, string>, attr: Record<string, string>) => {
            acc[attr.key] = attr.value;
            return acc;
          },
          {} as Record<string, string>
        );

        <Script key={index} defer={true} {...attributes}></Script>;
      })}
    </>
  );
};
