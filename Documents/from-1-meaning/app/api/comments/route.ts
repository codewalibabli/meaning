import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isSessionValid } from "@/app/lib/server/auth";
import {
  createComment,
  decryptCommentContent,
  findComment,
  listCommentsForTarget,
  normalizeCommentAuthor,
  normalizeCommentTargetType,
  parseCommentInput,
  serializeComment,
} from "@/app/lib/server/comments";

async function requireAuth() {
  const cookieStore = await cookies();
  if (!(await isSessionValid(cookieStore.get("vault_session")?.value))) {
    return null;
  }
  return true;
}

export async function GET(request: Request) {
  const auth = await requireAuth();
  if (!auth) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(request.url);
  const targetId = searchParams.get("targetId")?.trim();
  const targetType = normalizeCommentTargetType(searchParams.get("targetType"));

  if (!targetId || !targetType) {
    return NextResponse.json(
      { error: "Target ID and target type are required." },
      { status: 400 },
    );
  }

  const comments = await listCommentsForTarget(targetId, targetType);
  return NextResponse.json({
    comments: comments.map((comment) => serializeComment(comment)),
  });
}

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (!auth) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 },
    );
  }

  const body = await request.json().catch(() => null);
  const input = parseCommentInput(body);
  if (!input) {
    return NextResponse.json({ error: "Invalid comment." }, { status: 400 });
  }

  const comment = await createComment(input);
  return NextResponse.json(
    { comment: serializeComment(comment) },
    { status: 201 },
  );
}

export async function DELETE(request: Request) {
  const auth = await requireAuth();
  if (!auth) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 },
    );
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const record = body as Record<string, unknown>;
  const id = typeof record.id === "string" ? record.id.trim() : "";
  const author = normalizeCommentAuthor(record.author);

  if (!id || !author) {
    return NextResponse.json(
      { error: "Comment id and author are required." },
      { status: 400 },
    );
  }

  const comment = await findComment(id);
  if (!comment) {
    return NextResponse.json({ error: "Comment not found." }, { status: 404 });
  }

  if (comment.author !== author) {
    return NextResponse.json(
      { error: "You can only delete your own comments." },
      { status: 403 },
    );
  }

  const deleted = await (
    await import("@/app/lib/server/comments")
  ).deleteComment(id);
  if (!deleted.deletedCount) {
    return NextResponse.json({ error: "Comment not found." }, { status: 404 });
  }

  return NextResponse.json({ deleted: true });
}
