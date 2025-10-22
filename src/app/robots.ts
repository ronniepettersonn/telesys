// app/robots.ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.NEXT_PUBLIC_ENV === "production";

  if (!isProd) {
    // Evita indexação em dev/staging
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      sitemap: `${SITE.url}/sitemap.xml`,
      host: SITE.url,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin", "/dashboard", "/_next/", "/private"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
