import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Graph } from "schema-dts";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateStructuredData = (customData: Graph) => {
  const defaultStructuredData: Graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${process.env.BASE_URL}/#organization`,
        name: process.env.APP_NAME,
      },
      {
        "@type": "WebSite",
        "@id": `${process.env.BASE_URL}/#website`,
        url: `${process.env.BASE_URL}`,
        publisher: { "@id": `${process.env.BASE_URL}/#organization` },
        inLanguage: "en-GB",
      },
    ],
  };
  return {
    ...defaultStructuredData,
    ...customData,
  };
};
