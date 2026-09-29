import { notFound } from "next/navigation";
import { requireVaultSession } from "@/app/vault/vault-access";
import MemoryForm from "@/app/vault/memories/memory-form";
import { findMemory } from "@/app/lib/server/memories";

export default async function EditMemoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireVaultSession();

  const memory = await findMemory((await params).id);

  if (!memory) {
    notFound();
  }

  return (
    <MemoryForm
      memoryId={memory._id}
      initial={{
        title: memory.title,
        story: memory.story,
        date: memory.date,
        perspective: memory.perspective ?? "babli",
        media: memory.media,
      }}
    />
  );
}
