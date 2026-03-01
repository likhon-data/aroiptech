import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  image?: string;
  jsonLd?: Record<string, unknown>;
  keywords?: string;
}

const DOMAIN = "https://aroip.com";

const SEO = ({
  title = "Aroip – Sustainable AI Hardware & Eco-Friendly Smart Devices",
  description = "Aroip designs premium eco-friendly AI hardware and sustainable smart devices built with recycled materials. Limited edition tech for a greener tomorrow.",
  canonical = DOMAIN,
  type = "website",
  image = `${DOMAIN}/favicon.png`,
  jsonLd,
  keywords = "eco-friendly technology, sustainable smart devices, AI hardware, recycled silicon, green tech, limited edition electronics, Aroip",
}: SEOProps) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    // Standard meta
    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("robots", "index, follow");
    setMeta("author", "Aroip");

    // Open Graph
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", type, true);
    setMeta("og:url", canonical, true);
    setMeta("og:image", image, true);
    setMeta("og:site_name", "Aroip", true);
    setMeta("og:locale", "en_US", true);

    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
    setMeta("twitter:site", "@aroip");

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;

    // JSON-LD
    const existingScript = document.querySelector('script[data-seo-jsonld]');
    if (existingScript) existingScript.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, canonical, type, image, jsonLd, keywords]);

  return null;
};

export default SEO;
