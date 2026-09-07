import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Fonty v /public nedostávají hash v názvu, takže by je Next
        // servíroval s krátkou cache. Obsah se mění jen ručním během
        // scripts/build-fonts.py, immutable je proto bezpečné.
        source: "/fonts/:file*.woff2",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
