export type Perspective = "babli" | "kajal";

export type MediaItem = {
  url: string;
  resourceType?: "image" | "video" | string;
  publicId?: string;
  format?: string;
};

export type MemoryPreview = {
  _id: string;
  title: string;
  date: string;
  story?: string;
  perspective?: Perspective;
  media?: MediaItem[] | MediaItem | string;
};

export type LetterPreview = {
  _id: string;
  title: string;
  date: string;
  author?: Perspective;
  recipient?: Perspective;
};

export type CapsulePreview = {
  _id: string;
  title: string;
  unlockAt: string;
  createdAt: string;
  locked: boolean;
};
