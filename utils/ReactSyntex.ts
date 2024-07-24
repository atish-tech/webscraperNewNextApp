import { HtmlElementToJsonType } from "./InterfaceType";

export function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
}

export function convertStyleKeysToCamelCase(
  styleObject: Record<string, string>
): Record<string, string> {
  const newStyleObject: Record<string, string> = {};

  Object.keys(styleObject).forEach((key: string) => {
    const camelCaseKey = toCamelCase(key);

    newStyleObject[camelCaseKey] = styleObject[key];
  });

  return newStyleObject;
}

export function createAttribute(element: HtmlElementToJsonType) {
  return element.attributes.reduce(
    (acc: Record<string, any>, attr: Record<string, string>) => {
      let key = attr.key;

      if (key === "class") {
        key = "className";
      } else if (key == "fill-rule") {
        key = "fillRule";
      } else if (key == "clip-rule") {
        key = "clipRule";
      } else if (key == "tabindex") {
        key = "tabIndex";
      } else if (key == "stroke-linecap") {
        key = "strokeLinecap";
      } else if (key == "data-ctaText") {
        key = "data-ctatext";
      } else if (key == "data-destinationLink") {
        key = "data-destinationlink";
      } else if (key == "stroke-width") {
        key = "strokeWidth";
      } else if (key == "for") {
        key = "htmlFor";
      } else if (key == "stroke-linejoin") {
        key = "strokeLinejoin";
      } else if (key == "xlink:href") {
        key = "xlinkHref";
      } else if (key == "xml:space") {
        key = "xmlSpace";
      } else if (key == "xmlns:xlink") {
        key = "xmlnsXlink";
      } else if (key == "crossorigin") {
        key = "crossOrigin";
      } else if (key == "onclick") {
        key = "onClick";
      } else if (key == "allowfullscreen") {
        key = "allowFullScreen";
      } else if (key == "srcset") {
        key = "srcSet";
      } else if (key == "itemscope") {
        key = "itemScope";
      } else if (key == "datetime") {
        key = "dateTime";
      } else if (key == "accept-charset") {
        key = "acceptCharset";
      }

      if (key === "style") {
        const styleObject: Record<string, string> = attr.value
          .split(";")
          .reduce(
            (styleAcc, styleProp) => {
              const [property, value] = styleProp.split(":");
              if (property && value) {
                styleAcc[property.trim()] = value.trim();
              }
              return styleAcc;
            },
            {} as Record<string, string>
          );

        acc[key] = styleObject;
      } else {
        acc[key] = attr.value;
      }
      return acc;
    },
    ({} as Record<string, any>) ?? {}
  );
}
