import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import VaultHome from "@/app/vault/vault-home";
import { isSessionValid } from "@/app/lib/server/auth";
import { listCapsules, serializeCapsule } from "@/app/lib/server/capsules";
import { listLetters, serializeLetter } from "@/app/lib/server/letters";
import { listMemories, serializeMemory } from "@/app/lib/server/memories";

export default async function VaultPage() {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get("vault_session")?.value;

  if (!(await isSessionValid(rawToken))) {
    redirect("/login");
  }

  const [memories, letters, capsules] = await Promise.all([
    listMemories(),
    listLetters(),
    listCapsules(),
  ]);

  return (
    <VaultHome
      memories={memories.map(serializeMemory)}
      letters={letters.map(serializeLetter)}
      capsules={capsules.map((capsule) => serializeCapsule(capsule))}
    />
  );
}
