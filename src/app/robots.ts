import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cuenta", "/admin", "/login"],
    },
    sitemap: "https://azameliazarate.com/sitemap.xml",
  };
}
