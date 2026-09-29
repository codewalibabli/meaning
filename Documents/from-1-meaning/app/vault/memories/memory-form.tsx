"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "./memory-form.css";

type Media = {
  url: string;
  publicId?: string;
  resourceType?: "image" | "video" | string;
};

type MemoryValue = {
  title: string;
  story: string;
  date: string;
  perspective?: "babli" | "kajal";
  media?: string | Media | Media[];
};

type NewMedia = {
  file: File;
  preview: string;
};

type MemoryFormProps = {
  initial?: MemoryValue;
  memoryId?: string;
};

const emptyValue: MemoryValue = {
  title: "",
  story: "",
  date: "",
  perspective: "babli",
};

const acceptedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

function initialMedia(value?: MemoryValue["media"]): Media[] {
  if (!value) return [];
  if (typeof value === "string") return [{ url: value }];
  return Array.isArray(value) ? value : [value];
}

function isVideo(media: Media | NewMedia) {
  return "file" in media
    ? media.file.type.startsWith("video/")
    : media.resourceType === "video";
}

export default function MemoryForm({
  initial = emptyValue,
  memoryId,
}: MemoryFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [value, setValue] = useState<MemoryValue>({
    ...emptyValue,
    ...initial,
    perspective: initial.perspective ?? "babli",
  });

  const [existingMedia, setExistingMedia] = useState<Media[]>(
    initialMedia(initial.media),
  );

  const [newMedia, setNewMedia] = useState<NewMedia[]>([]);
  const [removedMedia, setRemovedMedia] = useState<Media[]>([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update(field: keyof MemoryValue, next: string) {
    setValue((current) => ({
      ...current,
      [field]:
        field === "perspective" ? (next as MemoryValue["perspective"]) : next,
    }));
  }

  function handleMedia(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    const invalid = files.find(
      (file) => !acceptedTypes.includes(file.type) || file.size > 50_000_000,
    );

    if (invalid) {
      setError(
        "Choose JPG, PNG, WebP, MP4, WebM, or MOV files under 50 MB each.",
      );
      return;
    }

    setError("");

    setNewMedia((current) => [
      ...current,
      ...files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      })),
    ]);

    event.target.value = "";
  }

  function removeExisting(media: Media) {
    setExistingMedia((current) => current.filter((item) => item !== media));

    if (media.publicId) {
      setRemovedMedia((current) => [...current, media]);
    }
  }

  function removeNew(media: NewMedia) {
    URL.revokeObjectURL(media.preview);

    setNewMedia((current) => current.filter((item) => item !== media));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!value.title.trim() || !value.story.trim() || !value.date) {
      setError("A title, date, and story are needed.");
      return;
    }

    setSaving(true);

    try {
      const formData = new FormData();

      formData.set("title", value.title);
      formData.set("story", value.story);
      formData.set("date", value.date);
      formData.set("perspective", value.perspective ?? "babli");

      newMedia.forEach((media) => {
        formData.append("media", media.file);
      });

      if (memoryId) {
        formData.set(
          "removedMedia",
          JSON.stringify(
            removedMedia.map(({ publicId, resourceType }) => ({
              publicId,
              resourceType,
            })),
          ),
        );
      }

      const response = await fetch(
        memoryId ? `/api/memories/${memoryId}` : "/api/memories",
        {
          method: memoryId ? "PATCH" : "POST",
          credentials: "include",
          body: formData,
        },
      );

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error ?? "Unable to save this memory.");
      }

      router.push(`/vault/memories/${body.memory._id}`);
      router.refresh();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to save this memory.",
      );
    } finally {
      setSaving(false);
    }
  }

  const totalMedia = existingMedia.length + newMedia.length;

  return (
    <main className="memory-form-page">
      <div className="memory-form-hearts" aria-hidden="true">
        <span className="memory-form-heart memory-form-heart--one">♡</span>
        <span className="memory-form-heart memory-form-heart--two">♡</span>
        <span className="memory-form-heart memory-form-heart--three">♡</span>
        <span className="memory-form-heart memory-form-heart--four">♡</span>
      </div>

      <div className="memory-form-shell">
        <header className="memory-form-header">
          <div>
            <p className="memory-form-kicker">
              {memoryId ? "memory / edit" : "memory / new"}
            </p>

            <h1>{memoryId ? "Edit this memory." : "Keep a moment."}</h1>

            <p className="memory-form-intro">
              Some moments deserve a place to stay.
            </p>
          </div>

          <span className="memory-form-number">{memoryId ? "02" : "01"}</span>
        </header>

        <form className="memory-editor" onSubmit={handleSubmit}>
          {/* PERSPECTIVE */}
          <section className="memory-form-section memory-form-section--perspective">
            <div className="memory-form-section-label">
              <span>01</span>
              <p>whose memory?</p>
            </div>

            <div className="memory-perspective-content">
              <h2>
                Who remembers
                <br />
                this moment?
              </h2>

              <p>Choose the side of the story this memory belongs to.</p>

              <div className="memory-perspective-options">
                {(["babli", "kajal"] as const).map((option) => {
                  const active = value.perspective === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      className={`memory-perspective-option ${
                        active ? "is-active" : ""
                      }`}
                      onClick={() => update("perspective", option)}
                    >
                      <span className="memory-perspective-name">
                        {option === "babli" ? "Babli" : "Kajal"}
                      </span>

                      <span className="memory-perspective-side">
                        {option === "babli"
                          ? "her side of the story"
                          : "her side of the story"}
                      </span>

                      <span className="memory-perspective-mark">
                        {active ? "♡" : "○"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* TITLE + DATE */}
          <section className="memory-form-section">
            <div className="memory-form-section-label">
              <span>02</span>
              <p>the moment</p>
            </div>

            <div className="memory-form-fields">
              <div className="memory-editor-field memory-editor-field--title">
                <label htmlFor="memory-title">Memory title</label>

                <input
                  id="memory-title"
                  value={value.title}
                  onChange={(event) => update("title", event.target.value)}
                  placeholder="A day worth keeping"
                  maxLength={140}
                  required
                />

                <span className="memory-field-hint">
                  Give this moment a name.
                </span>
              </div>

              <div className="memory-editor-field memory-editor-field--date">
                <label htmlFor="memory-date">Date</label>

                <input
                  id="memory-date"
                  type="date"
                  value={value.date}
                  onChange={(event) => update("date", event.target.value)}
                  required
                />
              </div>
            </div>
          </section>

          {/* STORY */}
          <section className="memory-form-section memory-form-section--story">
            <div className="memory-form-section-label">
              <span>03</span>
              <p>the story</p>
            </div>

            <div className="memory-story-editor">
              <label htmlFor="memory-story">Tell what happened.</label>

              <textarea
                id="memory-story"
                value={value.story}
                onChange={(event) => update("story", event.target.value)}
                placeholder="Some moments are impossible to explain in a photo..."
                maxLength={5000}
                required
              />

              <div className="memory-story-footer">
                <span>Write it the way you remember it.</span>

                <span>{value.story.length} / 5000</span>
              </div>
            </div>
          </section>

          {/* MEDIA */}
          <section className="memory-form-section memory-form-section--media">
            <div className="memory-form-section-label">
              <span>04</span>
              <p>photographs & videos</p>
            </div>

            <div className="memory-media-content">
              <div className="memory-media-heading">
                <div>
                  <h2>
                    Keep the
                    <br />
                    little details.
                  </h2>

                  <p>Add photographs or videos that belong to this memory.</p>
                </div>

                <span className="memory-media-count">
                  {totalMedia.toString().padStart(2, "0")}
                </span>
              </div>

              <input
                ref={fileInputRef}
                id="memory-media"
                type="file"
                accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime"
                multiple
                onChange={handleMedia}
                className="memory-file-input"
              />

              <button
                type="button"
                className="memory-upload-trigger"
                onClick={() => fileInputRef.current?.click()}
              >
                <span className="memory-upload-symbol">+</span>

                <span>
                  <strong>Add photos & videos</strong>

                  <small>
                    JPG, PNG, WebP, MP4, WebM or MOV
                    <br />
                    up to 50 MB each
                  </small>
                </span>
              </button>

              {totalMedia > 0 && (
                <div className="memory-media-previews">
                  {existingMedia.map((media) => (
                    <div
                      className="memory-media-preview"
                      key={media.publicId ?? media.url}
                    >
                      <MediaPreview media={media} />

                      <span className="memory-media-type">
                        {isVideo(media) ? "VIDEO" : "PHOTO"}
                      </span>

                      <button
                        type="button"
                        className="memory-media-remove"
                        aria-label="Remove existing media"
                        onClick={() => removeExisting(media)}
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {newMedia.map((media) => (
                    <div className="memory-media-preview" key={media.preview}>
                      <MediaPreview media={media} />

                      <span className="memory-media-type">
                        {isVideo(media) ? "VIDEO" : "PHOTO"}
                      </span>

                      <button
                        type="button"
                        className="memory-media-remove"
                        aria-label="Remove selected media"
                        onClick={() => removeNew(media)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* SUBMIT */}
          <footer className="memory-form-footer">
            <div className="memory-form-footer-copy">
              <span className="memory-form-footer-heart">♡</span>

              <div>
                <p>
                  {memoryId ? "Keep the changes." : "Ready to keep this one?"}
                </p>

                <small>You can always edit this memory later.</small>
              </div>
            </div>

            <button className="memory-submit" type="submit" disabled={saving}>
              {saving
                ? "Saving memory..."
                : memoryId
                  ? "Save changes"
                  : "Keep this memory"}

              <span>↗</span>
            </button>
          </footer>

          {error && (
            <div className="memory-form-error" role="alert">
              <span>♡</span>
              {error}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}

function MediaPreview({ media }: { media: Media | NewMedia }) {
  return isVideo(media) ? (
    <video
      src={"file" in media ? media.preview : media.url}
      controls
      preload="metadata"
    />
  ) : (
    <img
      src={"file" in media ? media.preview : media.url}
      alt="Memory preview"
    />
  );
}
