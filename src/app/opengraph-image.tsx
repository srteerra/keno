import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Keno — Daily AI Tips for Developers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#0f0f0f",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        padding: "60px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            background: "rgba(255,198,142,0.15)",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
          }}
        >
          ✦
        </div>
        <span style={{ fontSize: "72px", fontWeight: 800, color: "#ffffff" }}>
          Keno
        </span>
      </div>

      <div
        style={{
          fontSize: "28px",
          color: "#a1a1aa",
          textAlign: "center",
          maxWidth: "720px",
          lineHeight: 1.4,
          marginBottom: "48px",
        }}
      >
        Daily AI-generated productivity tips for developers
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {[
          { label: "Git", color: "#ffc68e", bg: "rgba(190,103,34,0.22)" },
          { label: "React", color: "#61dafb", bg: "rgba(97,218,251,0.18)" },
          {
            label: "TypeScript",
            color: "#3178c6",
            bg: "rgba(49,120,198,0.22)",
          },
          {
            label: "JavaScript",
            color: "#f7df1e",
            bg: "rgba(247,223,30,0.18)",
          },
          { label: "CSS", color: "#8b9ef5", bg: "rgba(38,77,228,0.22)" },
          { label: "Docker", color: "#1e88e5", bg: "rgba(30,136,229,0.2)" },
          { label: "DevTools", color: "#42b785", bg: "rgba(66,183,133,0.18)" },
        ].map(({ label, color, bg }) => (
          <div
            key={label}
            style={{
              background: bg,
              color,
              padding: "8px 20px",
              borderRadius: "999px",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>,
    { ...size }
  );
}
