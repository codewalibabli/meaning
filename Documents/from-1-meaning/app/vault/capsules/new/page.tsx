import { requireVaultSession } from "@/app/vault/vault-access";
import CapsuleForm from "@/app/vault/capsules/capsule-form";

export default async function NewCapsulePage() {
  await requireVaultSession();

  return (
    <main className="capsule-editor-page">
      <CapsuleForm />
    </main>
  );
}
