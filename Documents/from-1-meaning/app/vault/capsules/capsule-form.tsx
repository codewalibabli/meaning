"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import "./capsule.css";

type CapsuleFormProps = {
  capsuleId?: string;
  initial?: {
    title: string;
    content: string;
    unlockAt: string;
  };
};

function toInputDate(value?: string) {
  if (!value) return "";

  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60_000;

  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export default function CapsuleForm({ capsuleId, initial }: CapsuleFormProps) {
  const router = useRouter();

  const [value, setValue] = useState({
    title: initial?.title ?? "",
    content: initial?.content ?? "",
    unlockAt: toInputDate(initial?.unlockAt),
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (
      !value.title.trim() ||
      (!capsuleId && !value.content.trim()) ||
      !value.unlockAt ||
      new Date(value.unlockAt).getTime() <= Date.now()
    ) {
      setError("A title, message, and future unlock date are needed.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        capsuleId ? `/api/capsules/${capsuleId}` : "/api/capsules",
        {
          method: capsuleId ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(value),
        },
      );

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error ?? "Unable to save this capsule.");
      }

      router.push(`/vault/capsules/${body.capsule._id}`);
      router.refresh();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to save this capsule.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="capsule-editor" onSubmit={submit}>
      <div className="capsule-editor__top">
        <div>
          <p className="capsule-editor__kicker">
            {capsuleId
              ? "editing a future thought"
              : "a message for another day"}
          </p>

          <h1>
            {capsuleId ? (
              <>
                Rewrite
                <br />
                <em>the future.</em>
              </>
            ) : (
              <>
                Write it
                <br />
                <em>for later.</em>
              </>
            )}
          </h1>
        </div>

        <span className="capsule-editor__heart" aria-hidden="true">
          ♡
        </span>
      </div>

      <div className="capsule-editor__paper">
        <div className="capsule-editor__paper-number">
          {capsuleId ? "EDIT" : "01"}
        </div>

        <div className="capsule-editor__field">
          <label htmlFor="capsule-title">Title</label>

          <input
            id="capsule-title"
            value={value.title}
            onChange={(event) =>
              setValue({
                ...value,
                title: event.target.value,
              })
            }
            placeholder="For another day"
            maxLength={140}
            required
          />
        </div>

        <div className="capsule-editor__rule">
          <span />
          <span>♡</span>
          <span />
        </div>

        <div className="capsule-editor__field">
          <label htmlFor="capsule-unlock">Unlock date & time</label>

          <input
            id="capsule-unlock"
            type="datetime-local"
            value={value.unlockAt}
            onChange={(event) =>
              setValue({
                ...value,
                unlockAt: event.target.value,
              })
            }
            required
          />

          <p className="capsule-editor__hint">
            Choose a moment in the future when this message should become
            readable.
          </p>
        </div>

        <div className="capsule-editor__field capsule-editor__field--message">
          <label htmlFor="capsule-message">
            {capsuleId ? "Replace message" : "Your message"}
          </label>

          <textarea
            id="capsule-message"
            value={value.content}
            onChange={(event) =>
              setValue({
                ...value,
                content: event.target.value,
              })
            }
            placeholder={
              capsuleId
                ? "Leave blank to keep the sealed message unchanged."
                : "Write something for the future..."
            }
            maxLength={20000}
            required={!capsuleId}
          />

          {capsuleId && (
            <p className="capsule-editor__hint">
              Leave this blank if you only want to change the title or opening
              date.
            </p>
          )}
        </div>

        {error && (
          <div className="capsule-editor__error" role="alert">
            <span>♡</span>
            <p>{error}</p>
          </div>
        )}

        <div className="capsule-editor__footer">
          <p>
            {capsuleId
              ? "This capsule will remain private."
              : "Once sealed, it waits quietly until its date."}
          </p>

          <button
            type="submit"
            disabled={saving}
            className="capsule-editor__submit"
          >
            {saving
              ? "Sealing..."
              : capsuleId
                ? "Save changes"
                : "Seal this capsule"}

            <span>↗</span>
          </button>
        </div>
      </div>
    </form>
  );
}
