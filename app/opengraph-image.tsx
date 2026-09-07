import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const poppinsDir = join(process.cwd(), "node_modules/@fontsource/poppins/files");
  const interDir = join(process.cwd(), "node_modules/@fontsource/inter/files");
  const fontLatin = readFileSync(join(poppinsDir, "poppins-latin-800-normal.woff"));
  const fontLatinExt = readFileSync(join(poppinsDir, "poppins-latin-ext-800-normal.woff"));
  // wordmark loga se sází stejnou vahou jako v logo souboru (700), ne 800
  const fontLogo = readFileSync(join(poppinsDir, "poppins-latin-700-normal.woff"));
  const fontInter = readFileSync(join(interDir, "inter-latin-400-normal.woff"));
  const fontInterExt = readFileSync(join(interDir, "inter-latin-ext-400-normal.woff"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0d3a56 0%, #145c87 45%, #1c7bae 100%)",
          fontFamily: "Poppins, PoppinsExt",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width="96" height="96" viewBox="29 13 161 156">
            <circle cx="131" cy="63" r="46" fill="#F9D086" />
            <circle cx="133" cy="49" r="5" fill="#FFFFFF" />
            <circle cx="153" cy="46" r="4" fill="#FFFFFF" />
            <circle cx="147" cy="60" r="5" fill="#FFFFFF" />
            <polygon fill="#89C8E1" points="36,72 102,67 147,97 104,130 80,165 97,126 73,99" />
            <polygon fill="#55A3D0" points="129,79 132,108 108,133 152,134 186,148 174,119 149,75" />
            <polygon fill="#B8D8E1" points="33,73 87,66 73,100" />
            <polygon fill="#B8D8E1" points="123,60 103,67 98,130 128,78" />
          </svg>
          <span
            style={{
              fontSize: 64,
              color: "white",
              fontWeight: 700,
              fontFamily: "PoppinsLogo",
              letterSpacing: "-0.01em",
            }}
          >
            manta
          </span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 56,
            lineHeight: 1.15,
            color: "white",
            fontWeight: 800,
            maxWidth: 920,
          }}
        >
          Strike zážitek, ne jen hru.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 28,
            color: "rgba(255,255,255,0.75)",
            fontFamily: "Inter, InterExt",
          }}
        >
          {site.lanes} drah · GLOW bowling · restaurace & bar · Praha 6
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Poppins", data: fontLatin, weight: 800, style: "normal" },
        { name: "PoppinsExt", data: fontLatinExt, weight: 800, style: "normal" },
        { name: "PoppinsLogo", data: fontLogo, weight: 700, style: "normal" },
        { name: "Inter", data: fontInter, weight: 400, style: "normal" },
        { name: "InterExt", data: fontInterExt, weight: 400, style: "normal" },
      ],
    }
  );
}
