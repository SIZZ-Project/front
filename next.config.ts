import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_ROOT: "http://43.203.157.26:8080",
    NEXT_PUBLIC_API_URL: "http://43.203.157.26:8080/api",
    NEXT_PUBLIC_GOOGLE_REDIRECT_URI:
      "http://43.203.157.26:8080/signin/google-callback",
  },
};

export default nextConfig;
