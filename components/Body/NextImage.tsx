import Image from "next/image";
import https from "https";
import { ClientRequest, IncomingMessage } from "http";
import { ISizeCalculationResult } from "image-size/dist/types/interface";
import imageSize from "image-size";

interface NextImageProps {
  attributes: Record<string, any>;
}

async function fetchImageDimensions(
  url: string
): Promise<ISizeCalculationResult> {
  return new Promise((resolve, reject) => {
    https.get(url, (res: IncomingMessage) => {
      const chunks: Uint8Array[] = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const buffer: Buffer = Buffer.concat(chunks);
        const dimensions: ISizeCalculationResult = imageSize(buffer);
        resolve(dimensions);
      });
      res.on("error", reject);
    });
  });
}

export const NextImage = async ({ attributes }: NextImageProps) => {
  // return <img {...attributes} />;

  let Priority: boolean = false;

  // ensure the src has a protocol
  if (attributes?.src?.startsWith("//")) {
    attributes.src = "https:" + attributes.src;
  }

  // decode image url if it's coming from next/image
  if (attributes?.src?.startsWith("/_next")) {
    const params: URLSearchParams = await new URLSearchParams(
      attributes?.src.split("?")[1]
    );

    const imageUrl: string = await decodeURIComponent(
      params.get("url") as string
    );

    attributes.src = imageUrl;
  }

  if (attributes?.src && attributes.src.startsWith("http")) {
    const imageUrl: URL = new URL(attributes.src);

    const options: object = {
      method: "HEAD",
      host: imageUrl.hostname,
      path: imageUrl.pathname,
    };

    const req: ClientRequest = https.request(
      options,
      (res: IncomingMessage) => {
        if (res && res.statusCode && res?.statusCode >= 400) {
          return null;
        }
        if (
          res.headers["content-length"] !== undefined &&
          parseInt(res.headers["content-length"]) >= 100000
        ) {
          Priority = true;
        }
      }
    );
    req.end();
  }

  // set default alt text
  if (!attributes.hasOwnProperty("alt") && attributes?.alt?.length > 1) {
    attributes.alt = "Image description";
  }

  // set image dimensions
  if (
    (!attributes.hasOwnProperty("width") ||
      !attributes.hasOwnProperty("height") ||
      attributes.width == "inherit") &&
    attributes?.src &&
    attributes.src.startsWith("https")
  ) {
    const dimensions: ISizeCalculationResult = (await fetchImageDimensions(
      attributes.src
    )) as ISizeCalculationResult;
    attributes.width = parseInt(dimensions.width as any);
    attributes.height = parseInt(dimensions.height as any);
  }

  delete attributes.loading;

  return (
    <Image
      loading="eager"
      src={attributes.src}
      alt={attributes.alt}
      {...attributes}
      width={parseInt(attributes.width) || 100}
      height={parseInt(attributes.height) || 100}
      // placeholder="blur"
      // blurDataURL={attributes.src}
      priority={Priority}
    />
  );
};
