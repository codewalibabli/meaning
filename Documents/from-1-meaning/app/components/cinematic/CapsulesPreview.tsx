"use client";

import Link from "next/link";
import { capsulesCopy } from "@/app/lib/cinematic/copy";
import { formatDate } from "@/app/lib/cinematic/media";
import type { CapsulePreview } from "@/app/lib/cinematic/types";

function LockMark({ locked }: { locked: boolean }) {
  return (
    <span className="cine-capsule-lock" aria-hidden="true">
      {locked ? (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
          <rect
            x="6"
            y="11"
            width="12"
            height="9"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M8.5 11V8.4a3.5 3.5 0 0 1 7 0V11"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
          <rect
            x="6"
            y="11"
            width="12"
            height="9"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M8.5 11V8.4a3.5 3.5 0 0 1 6.4-1.9"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      )}
    </span>
  );
}

export default function CapsulesPreview({
  capsules,
}: {
  capsules: CapsulePreview[];
}) {
  const preview = capsules.slice(0, 3);

  return (
    <section
      className="cine-capsules"
      aria-labelledby="capsules-heading"
      data-nav="light"
    >
      <div className="cine-quiet-copy">
        <p className="cine-kicker cine-kicker--light">Time capsules</p>
        <h2 id="capsules-heading">{capsulesCopy.heading}</h2>
        <p className="cine-lead cine-lead--light">{capsulesCopy.supporting}</p>
        <p className="cine-body cine-body--light">{capsulesCopy.body}</p>
      </div>

      {preview.length > 0 ? (
        <div className="cine-capsule-row">
          {preview.map((capsule) => (
            <Link
              key={capsule._id}
              href={`/vault/capsules/${capsule._id}`}
              className={`cine-capsule ${capsule.locked ? "is-locked" : "is-open"}`}
            >
              <LockMark locked={capsule.locked} />
              <h3>{capsule.title}</h3>
              <p>
                {capsule.locked ? "Unlocks" : "Opened"}{" "}
                {formatDate(capsule.unlockAt)}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="cine-empty-line cine-empty-line--light">
          Nothing is waiting yet. The future still has room.
        </p>
      )}

      <div className="cine-row-links">
        <Link href="/vault/capsules/new" className="cine-text-link">
          Create a Time Capsule +
        </Link>
        <Link href="/vault/capsules" className="cine-text-link">
          See All Capsules <span>→</span>
        </Link>
      </div>
    </section>
  );
}
