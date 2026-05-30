import { ImageResponse } from "next/og";

export const alt = "AZ · Amelia Zárate — Atelier de alta costura";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAF7F0",
          color: "#2B2823",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", border: "4px solid #E7352C", padding: "26px 54px" }}>
          <span style={{ fontSize: 150, fontWeight: 700 }}>A</span>
          <div style={{ width: 5, height: 124, backgroundColor: "#E7352C", margin: "0 22px" }} />
          <span style={{ fontSize: 150, fontWeight: 700 }}>Z</span>
        </div>
        <div style={{ fontSize: 44, letterSpacing: 22, marginTop: 34 }}>AMELIA ZÁRATE</div>
        <div style={{ fontSize: 27, letterSpacing: 4, color: "#857E6E", marginTop: 18 }}>
          Alta costura · Confección a medida
        </div>
      </div>
    ),
    { ...size }
  );
}
