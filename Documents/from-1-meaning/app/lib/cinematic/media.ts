import { homepageFallbacks } from "./copy";
import type { MediaItem, MemoryPreview, Perspective } from "./types";

export const HOMEPAGE_MEMORY_LIMIT = 12;

export function formatDate(date?: string | null) {
  if (!date) return "A cherished day";

  const normalizedValue = date.includes("T") ? date : `${date}T12:00:00`;
  const parsed = new Date(normalizedValue);

  if (Number.isNaN(parsed.getTime())) {
    return "A cherished day";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export function formatPerspective(value?: Perspective) {
  return value === "kajal" ? "Kajal" : "Babli";
}

export function getMediaList(media: MemoryPreview["media"]): MediaItem[] {
  if (!media) return [];
  if (typeof media === "string") {
    return [{ url: media, resourceType: "image" }];
  }
  return Array.isArray(media) ? media.filter((item) => item?.url) : [media];
}

export function optimizeCloudinaryUrl(url: string, width = 1400) {
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }
  if (/\/upload\/(?:[^/]+,)*w_\d+/.test(url)) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,c_limit,w_${width}/`);
}

export function videoPosterUrl(url: string) {
  if (!url.includes("res.cloudinary.com")) return undefined;
  return url
    .replace("/video/upload/", "/video/upload/so_0,f_jpg,q_auto,w_1400/")
    .replace("/image/upload/", "/image/upload/f_jpg,q_auto,w_1400/")
    .replace(/\.(mp4|webm|mov)(\?.*)?$/i, ".jpg");
}

export function getPrimaryVisual(memory: MemoryPreview) {
  const uniqueMedia = getMediaList(memory.media);
  const image = uniqueMedia.find((item) => item.resourceType !== "video");
  return image ?? uniqueMedia[0] ?? null;
}

export function visualSrc(item: MediaItem | null, width = 1400) {
  if (!item?.url) return "";
  if (item.resourceType === "video") {
    return videoPosterUrl(item.url) ?? "";
  }
  if (/\.(mp4|webm|mov)(\?.*)?$/i.test(item.url)) return "";
  return optimizeCloudinaryUrl(item.url, width);
}

export function collectMemoryImages(
  memories: MemoryPreview[],
  limit = 6,
  fallbacks: string[] = homepageFallbacks,
) {
  const fromMemories = memories
    .map((memory) => getPrimaryVisual(memory))
    .filter((media): media is MediaItem => Boolean(media?.url))
    .filter((media) => media.resourceType !== "video")
    .map((media) => optimizeCloudinaryUrl(media.url, 900));

  const unique = [...new Set(fromMemories)];
  if (unique.length >= limit) return unique.slice(0, limit);

  for (const fallback of fallbacks) {
    if (!unique.includes(fallback)) unique.push(fallback);
    if (unique.length >= limit) break;
  }

  return unique;
}

export function homepageMemories(memories: MemoryPreview[]) {
  return memories.slice(0, HOMEPAGE_MEMORY_LIMIT);
}
