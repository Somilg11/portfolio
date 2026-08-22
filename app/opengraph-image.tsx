import { ImageResponse } from "next/og";

export const alt = "Somil Gupta — full-stack engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const lights = ["#ff5f57", "#febc2e", "#28c840"];

/** Social card styled as a flat macOS window. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0d",
          padding: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            borderRadius: 20,
            border: "1px solid #2a2a2e",
            background: "#161618",
            overflow: "hidden",
          }}
        >
          {/* title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              height: 52,
              padding: "0 20px",
              background: "#1e1e21",
              borderBottom: "1px solid #2a2a2e",
            }}
          >
            {lights.map((color) => (
              <div key={color} style={{ width: 14, height: 14, borderRadius: 999, background: color }} />
            ))}
            <div style={{ flex: 1, display: "flex", justifyContent: "center", color: "#8e8e93", fontSize: 20 }}>
              somil — portfolio
            </div>
          </div>

          {/* body */}
          <div style={{ display: "flex", flexDirection: "column", padding: "56px 60px", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: 18,
                  background: "#0a84ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 40,
                  fontWeight: 600,
                }}
              >
                s
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ color: "#f5f5f7", fontSize: 58, fontWeight: 600, letterSpacing: -2 }}>Somil Gupta</div>
                <div style={{ color: "#8e8e93", fontSize: 26 }}>@gsomil · full-stack engineer</div>
              </div>
            </div>

            <div style={{ color: "#d1d1d6", fontSize: 30, lineHeight: 1.4, maxWidth: 820 }}>
              Backends, systems and product UI. NestJS · Next.js · Postgres · Docker.
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              {["Projects", "Experience", "Achievements", "Blog"].map((tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 999,
                    border: "1px solid #2f2f34",
                    color: "#aeaeb2",
                    fontSize: 22,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
