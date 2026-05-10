import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface MetaTagsProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  schema?: Record<string, unknown>;
}

const SITE_NAME = "UNSAgglo -- Libres Ensemble";
const BASE_URL = "https://unsagglo.fr";
// Replace /public/og-default.jpg with a real 1200x630px image before going live
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.jpg`;

const MetaTags = ({
  title,
  description,
  canonical,
  ogImage,
  noIndex = false,
  schema,
}: MetaTagsProps): JSX.Element => {
  const { pathname } = useLocation();
  const fullTitle = `${title} | ${SITE_NAME}`;
  const image = ogImage ?? DEFAULT_OG_IMAGE;
  const url = canonical ?? `${BASE_URL}${pathname}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="fr_FR" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
};

export default MetaTags;
