import type { NextConfig } from "next";

import { BUILDIUM_PORTAL_URL, LEGACY_HOMEOWNER_PATH } from "./src/lib/buildium";

const nextConfig: NextConfig = {
  // Photography uploaded in the Studio is served from Sanity's image CDN.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
  },
  // The on-site homeowner payment page was replaced by Buildium. Old links,
  // including hrefs still saved in Sanity, land on the Resident Center.
  async redirects() {
    return [
      {
        source: LEGACY_HOMEOWNER_PATH,
        destination: BUILDIUM_PORTAL_URL,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
