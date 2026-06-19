import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Dev-only middleware so /api/* routes work on localhost (Vite doesn't run Vercel functions).
// In production, Vercel serves the same handler from api/contact.ts directly.
const devApiPlugin = () => ({
  name: "dev-api-middleware",
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (!req.url || !req.url.startsWith("/api/")) return next();
      try {
        const url = req.url.split("?")[0];
        if (url === "/api/contact") {
          if (req.method !== "POST") {
            res.statusCode = 405;
            res.setHeader("content-type", "application/json");
            return res.end(JSON.stringify({ error: "Method not allowed" }));
          }
          const chunks: Buffer[] = [];
          for await (const c of req) chunks.push(c as Buffer);
          const raw = Buffer.concat(chunks).toString("utf8");
          let body: any = {};
          try { body = raw ? JSON.parse(raw) : {}; } catch { body = {}; }

          // Lazy import so prod build never bundles nodemailer into the client.
          const mod = await server.ssrLoadModule("/api/contact.ts");
          const handler = mod.default;

          const shimReq: any = Object.assign(req, { body });
          const shimRes: any = {
            statusCode: 200,
            status(code: number) { this.statusCode = code; return this; },
            json(payload: any) {
              res.statusCode = this.statusCode;
              res.setHeader("content-type", "application/json");
              res.end(JSON.stringify(payload));
              return this;
            },
          };
          await handler(shimReq, shimRes);
          return;
        }
        next();
      } catch (err) {
        console.error("[dev-api] error:", err);
        res.statusCode = 500;
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify({ error: "Dev API middleware failure" }));
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env / .env.local into process.env for the dev API middleware
  // (Vite normally only exposes VITE_-prefixed vars to the client).
  const env = loadEnv(mode, process.cwd(), "");
  for (const k of ["GMAIL_USER", "GMAIL_APP_PASSWORD", "CONTACT_RECIPIENT"]) {
    if (env[k] && !process.env[k]) process.env[k] = env[k];
  }

  return {
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "development" && devApiPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
  optimizeDeps: {
    include: ["@tanstack/react-query"],
  },
  };
});
