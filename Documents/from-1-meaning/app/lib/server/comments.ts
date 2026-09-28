import "server-only";
import { randomUUID } from "node:crypto";
import { getDb } from "./db";
import { decryptText, encryptText, type EncryptedValue } from "./encryption";

export const commentAuthors = ["babli", "kajal"] as const;
export type CommentAuthor = (typeof commentAuthors)[number];
export const commentTargetTypes = ["memory", "letter", "capsule"] as const;
export type CommentTargetType = (typeof commentTargetTypes)[number];

export type CommentDocument = {
  _id: string;
  targetId: string;
  targetType: CommentTargetType;
  author: CommentAuthor;
  encryptedContent: string;
  iv: string;
  authTag: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CommentInput = {
  targetId: string;
  targetType: CommentTargetType;
  author: CommentAuthor;
  content: string;
};

const collectionName = "comments";

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function normalizeCommentAuthor(value: unknown): CommentAuthor | null {
  return value === "babli" || value === "kajal" ? value : null;
}

export function normalizeCommentTargetType(
  value: unknown,
): CommentTargetType | null {
  return value === "memory" || value === "letter" || value === "capsule"
    ? value
    : null;
}

export function parseCommentInput(body: unknown): CommentInput | null {
  if (!body || typeof body !== "object") return null;
  const input = body as Record<string, unknown>;
  const targetId = cleanText(input.targetId, 200);
  const targetType = normalizeCommentTargetType(input.targetType);
  const author = normalizeCommentAuthor(input.author);
  const content = cleanText(input.content, 4000);

  if (!targetId || !content || !targetType || !author) return null;

  return {
    targetId,
    targetType,
    author,
    content,
  };
}

export async function listCommentsForTarget(
  targetId: string,
  targetType: CommentTargetType,
) {
  return (await getDb())
    .collection<CommentDocument>(collectionName)
    .find({ targetId, targetType })
    .sort({ createdAt: 1 })
    .toArray();
}

export async function findComment(id: string) {
  return (await getDb())
    .collection<CommentDocument>(collectionName)
    .findOne({ _id: id });
}

export function decryptCommentContent(comment: CommentDocument) {
  const encrypted: EncryptedValue = {
    ciphertext: comment.encryptedContent,
    iv: comment.iv,
    authTag: comment.authTag,
  };
  return decryptText(encrypted);
}

export async function createComment(input: CommentInput) {
  const encrypted = encryptText(input.content);
  const now = new Date();
  const comment: CommentDocument = {
    _id: randomUUID(),
    targetId: input.targetId,
    targetType: input.targetType,
    author: input.author,
    encryptedContent: encrypted.ciphertext,
    iv: encrypted.iv,
    authTag: encrypted.authTag,
    createdAt: now,
    updatedAt: now,
  };

  await (await getDb())
    .collection<CommentDocument>(collectionName)
    .insertOne(comment);

  return comment;
}

export function serializeComment(comment: CommentDocument) {
  return {
    _id: comment._id,
    targetId: comment.targetId,
    targetType: comment.targetType,
    author: comment.author,
    content: decryptCommentContent(comment),
    createdAt: comment.createdAt.toISOString(),
    updatedAt: comment.updatedAt.toISOString(),
  };
}

export async function deleteComment(id: string) {
  return (await getDb())
    .collection<CommentDocument>(collectionName)
    .deleteOne({ _id: id });
}
