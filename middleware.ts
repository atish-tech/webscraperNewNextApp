import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (
    req.url.endsWith("svg") ||
    req.url.endsWith("ico") ||
    (req.url.endsWith("js") && !req.url.includes("_next"))
  ) {
    const url: URL = new URL(req.url);
    url.hostname = process.env.DOMAIN_NAME as string;
    url.protocol = "http";
    url.port = "";
    const newReq: Request = new Request(url.toString(), {
      headers: req.headers,
      method: req.method,
      body: req.body,
      redirect: req.redirect,
    });

    return NextResponse.rewrite(newReq.url);
  } else if (req.url.endsWith("woff") || req.url.endsWith("woff2")) {
    const url: URL = new URL(req.url);
    url.hostname = process.env.DOMAIN_NAME as string;
    url.protocol = "http";
    url.port = "";
    const newReq: Request = new Request(url.toString(), {
      headers: req.headers,
      method: req.method,
      body: req.body,
      redirect: req.redirect,
    });

    return NextResponse.rewrite(newReq.url);
  }
}
