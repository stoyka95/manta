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
          <svg width="96" height="96" viewBox="20 -10 600 370" fill="none">
            <circle cx="470" cy="160" r="125" fill="#F3A824" />
            <circle cx="503" cy="112" r="16" fill="#FFFFFF" fillOpacity={0.92} />
            <circle cx="548" cy="132" r="12.5" fill="#FFFFFF" fillOpacity={0.92} />
            <circle cx="516" cy="158" r="11" fill="#FFFFFF" fillOpacity={0.92} />
            <polygon points="255,50 230,8 276,46" fill="#7FCFE6" />
            <polygon points="299,40 320,4 336,46" fill="#7FCFE6" />
            <polygon
              points="30,190 170,80 270,50 310,35 355,95 520,200 615,330 430,290 330,270 150,300 60,345"
              fill="#B9E7F2"
            />
          </svg>
          <span style={{ fontSize: 64, color: "white", fontWeight: 800 }}>
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
        { name: "Inter", data: fontInter, weight: 400, style: "normal" },
        { name: "InterExt", data: fontInterExt, weight: 400, style: "normal" },
      ],
    }
  );
}
