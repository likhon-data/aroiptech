import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  image?: string;
  jsonLd?: Record<string, unknown>;
}

const SEO = ({
  title = "Aroip – Sustainable AI Hardware & Eco-Friendly Smart Devices",
  description = "Aroip designs eco-friendly AI hardware and sustainable smart devices built with natural materials for a greener tomorrow.",
  canonical = "https://aroiptech.lovable.app",
  type = "website",
  image = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4b921535-dcfa-45ae-b67c-7129799f06eb/id-preview-1dc193de--b4d234d5-8af0-4db8-8f59-b8eca62d6236.lovable.app-1772344587576.png",
  jsonLd,
}: SEOProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta property="og:type" content={type} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={canonical} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    {jsonLd && (
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    )}
  </Helmet>
);

export default SEO;
