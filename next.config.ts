import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_ROOT: "http://104.199.199.216:8080",
    NEXT_PUBLIC_API_URL: "http://104.199.199.216:8080/api",
    NEXT_PUBLIC_GOOGLE_REDIRECT_URI:
      "http://104.199.199.216:8080/signin/google-callback",
  },
};

export default nextConfig;
