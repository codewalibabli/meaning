import { requireVaultSession } from "@/app/vault/vault-access";
import MemoryForm from "@/app/vault/memories/memory-form";

export default async function NewMemoryPage() {
  await requireVaultSession();

  return <MemoryForm />;
}
