import type { VercelRequest, VercelResponse } from "@vercel/node";
import { put, del } from "@vercel/blob";

export const config = {
  api: {
    bodyParser: false,
  },
};

const MAX_BYTES = 25 * 1024 * 1024;

const ALLOWED = /^(image\/(jpeg|jpg|png|webp|gif|avif|svg\+xml)|video\/(mp4|webm|quicktime|ogg))$/;

function sanitize(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-80) || "file";
}

async function readRawBody(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buf.length;
    if (size > MAX_BYTES) throw new Error("File too large (max 25MB)");
    chunks.push(buf);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(500).json({ error: "Blob storage is not configured (BLOB_READ_WRITE_TOKEN missing)" });
  }

  try {
    // ---- DELETE: remove one or more blobs ----
    if (req.method === "DELETE" || (req.method === "POST" && req.query.action === "delete")) {
      let urls: string[] = [];
      const raw = (await readRawBody(req)).toString("utf8");
      let body: { url?: string; urls?: string[] } = {};
      try {
        body = raw ? JSON.parse(raw) : {};
      } catch {
        body = {};
      }
      if (Array.isArray(body.urls)) urls = body.urls;
      else if (typeof body.url === "string") urls = [body.url];
      else if (typeof req.query.url === "string") urls = [req.query.url];

      urls = urls.filter((u) => typeof u === "string" && /^https?:\/\/[^/]*\.(vercel-storage\.com|blob\.vercel-storage\.com)\//.test(u));
      if (urls.length === 0) return res.status(200).json({ deleted: 0 });

      await del(urls);
      return res.status(200).json({ deleted: urls.length });
    }

    // ---- POST: upload a file (raw binary body) ----
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST, DELETE");
      return res.status(405).json({ error: "Method not allowed" });
    }

    const filename = sanitize(String(req.query.filename || "upload"));
    const folder = String(req.query.folder || "").replace(/[^a-zA-Z0-9/_-]/g, "");
    const contentType = String(req.headers["content-type"] || "application/octet-stream").split(";")[0];

    if (!ALLOWED.test(contentType)) {
      return res.status(400).json({ error: `Unsupported file type: ${contentType}` });
    }

    const body = await readRawBody(req);
    if (body.length === 0) return res.status(400).json({ error: "Empty file" });

    const key = `${folder ? folder + "/" : ""}${Date.now()}-${filename}`;
    const blob = await put(key, body, {
      access: "public",
      contentType,
      addRandomSuffix: true,
      cacheControlMaxAge: 31536000,
    });

    return res.status(200).json({ url: blob.url, pathname: blob.pathname });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return res.status(500).json({ error: message });
  }
}
