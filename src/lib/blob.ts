const BLOB_HOST_RE = /^https?:\/\/[^/]*vercel-storage\.com\//;

export const isBlobUrl = (url?: string | null): boolean => !!url && BLOB_HOST_RE.test(url);

/** Upload a file to Vercel Blob storage. Returns the public URL. */
export async function uploadToBlob(file: File, folder = ""): Promise<string> {
  const params = new URLSearchParams({ filename: file.name });
  if (folder) params.set("folder", folder);

  const res = await fetch(`/api/blob?${params.toString()}`, {
    method: "POST",
    headers: { "Content-Type": file.type || "application/octet-stream" },
    body: file,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data?.url) throw new Error(data?.error || `Upload failed (${res.status})`);
  return data.url as string;
}

/**
 * Delete one or more files from Vercel Blob storage.
 * Silently ignores non-blob URLs (bundled assets, external links, old storage).
 */
export async function deleteFromBlob(urls: string | string[] | null | undefined): Promise<void> {
  const list = (Array.isArray(urls) ? urls : [urls]).filter(isBlobUrl) as string[];
  if (list.length === 0) return;
  try {
    await fetch("/api/blob", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls: list }),
    });
  } catch {
    // Deletion is best-effort — never block the user's save/delete action.
  }
}

/** Replace an image: delete the old blob if it changed and was blob-hosted. */
export async function replaceBlob(oldUrl?: string | null, newUrl?: string | null): Promise<void> {
  if (oldUrl && oldUrl !== newUrl) await deleteFromBlob(oldUrl);
}
