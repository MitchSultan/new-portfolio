import { ImageResponse } from "next/og";

export const alt = "Made by Mitch — Nairobi web developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "72px",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f7f5",
          color: "#111111",
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, fontWeight: 700 }}>
          MADE BY MITCH
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 700 }}>
            Websites that
          </div>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 700 }}>
            help property brands grow.
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 30 }}>
            Nairobi web developer · Kenya
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24 }}>madebymitch.com</div>
      </div>
    ),
    size
  );
}
