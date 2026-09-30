"use client";

import { useEffect, useState } from "react";

export type CommentItem = {
  _id: string;
  targetId: string;
  targetType: "memory" | "letter" | "capsule";
  author: "babli" | "kajal";
  content: string;
  createdAt: string;
  updatedAt: string;
};

type CommentSectionProps = {
  targetId: string;
  targetType: CommentItem["targetType"];
  initialComments?: CommentItem[];
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function authorName(author: CommentItem["author"]) {
  return author === "babli" ? "Babli" : "Kajal";
}

export default function CommentSection({
  targetId,
  targetType,
  initialComments = [],
}: CommentSectionProps) {
  const [comments, setComments] = useState<CommentItem[]>(initialComments);

  const [draft, setDraft] = useState("");

  const [author, setAuthor] = useState<"babli" | "kajal">("babli");

  const [pending, setPending] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadComments() {
      try {
        const response = await fetch(
          `/api/comments?targetId=${encodeURIComponent(
            targetId,
          )}&targetType=${encodeURIComponent(targetType)}`,
          {
            credentials: "include",
          },
        );

        if (!response.ok) return;

        const body = await response.json();

        setComments(body.comments ?? []);
      } catch {
        setComments([]);
      }
    }

    loadComments();
  }, [targetId, targetType]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const content = draft.trim();

    if (!content) {
      setError("Write something before leaving your note.");
      return;
    }

    setPending(true);
    setError("");

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetId,
          targetType,
          author,
          content,
        }),
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(body.error ?? "Unable to leave this note.");
      }

      setComments((current) => [...current, body.comment]);

      setDraft("");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to leave this note.",
      );
    } finally {
      setPending(false);
    }
  }

  async function handleDelete(
    commentId: string,
    commentAuthor: "babli" | "kajal",
  ) {
    try {
      const response = await fetch("/api/comments", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: commentId,
          author: commentAuthor,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));

        setError(body.error ?? "Unable to remove this note.");

        return;
      }

      setComments((current) =>
        current.filter((comment) => comment._id !== commentId),
      );
    } catch {
      setError("Unable to remove this note.");
    }
  }

  return (
    <section className="memento-notes">
      {/* HEADER */}

      <header className="memento-notes__header">
        <div>
          <p className="memento-notes__eyebrow">You Can Comment on it</p>

          <h3>
            Aap ki kya raai hai?
            <br />
            <em>so write it down!!</em>
          </h3>
        </div>

        <span className="memento-notes__count">
          {comments.length === 0
            ? "No notes"
            : `${comments.length} ${comments.length === 1 ? "note" : "notes"}`}
        </span>
      </header>

      {/* EXISTING COMMENTS */}

      <div className="memento-notes__list">
        {comments.length === 0 ? (
          <div className="memento-notes__empty">
            <span className="memento-notes__empty-heart" aria-hidden="true">
              ♡
            </span>

            <p>Aapne kuch kaha hi nhi ?? Ya abhi padha hi nhi?.</p>

            <span>Ya shayad kuch kehna hi nhi chahte aap.. Koi baat nhi</span>
          </div>
        ) : (
          comments.map((comment, index) => (
            <article key={comment._id} className="memento-note">
              <div className="memento-note__top">
                <div className="memento-note__author">
                  <span className="memento-note__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <strong>{authorName(comment.author)}</strong>
                </div>

                <time dateTime={comment.createdAt}>
                  {formatDate(comment.createdAt)}
                </time>
              </div>

              <div className="memento-note__body">
                <p>“{comment.content}”</p>
              </div>

              <div className="memento-note__bottom">
                <span>left in this memory</span>

                <button
                  type="button"
                  onClick={() => handleDelete(comment._id, comment.author)}
                >
                  Remove note
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      {/* WRITE A NOTE */}

      <div className="memento-note-form">
        <div className="memento-note-form__intro">
          <p>Fikra mat kar jaana..</p>

          <h4>
            Tujhe bolna ka pura haq haiii...
            <br />
            <em>Jitni gaali dena hai de bas maaa pe nhi honi chahiye...😅</em>
          </h4>
        </div>
        <div className="memento-note-author">
          <span>Madam pehle apna naam select karlo..👉</span>

          <div
            className="memento-note-author__options"
            role="group"
            aria-label="Choose note author"
          >
            {(["babli", "kajal"] as const).map((option) => (
              <button
                key={option}
                type="button"
                className={author === option ? "is-active" : ""}
                onClick={() => setAuthor(option)}
              >
                {authorName(option)}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="memento-note-writing">
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Tera kya kehna hai is baare me apne man ki bhadas nikalde qki shayad mai muh pe nhi puch paungi....."
              rows={5}
              maxLength={4000}
              aria-label="Write a note"
            />

            <span className="memento-note-writing__count">
              {draft.length}/4000
            </span>
          </div>

          <div className="memento-note-form__footer">
            <button
              type="submit"
              className="memento-note-submit"
              disabled={pending || !draft.trim()}
            >
              <span>{pending ? "Leaving..." : "Leave a note"}</span>

              <span aria-hidden="true">→</span>
            </button>
          </div>

          {error && (
            <p className="memento-note-error" role="alert">
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
