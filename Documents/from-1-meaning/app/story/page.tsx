import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import StoryExperience from "@/app/components/story/StoryExperience";
import { isSessionValid } from "@/app/lib/server/auth";
import { listMemories, serializeMemory } from "@/app/lib/server/memories";

export default async function StoryPage() {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get("vault_session")?.value;

  if (!(await isSessionValid(rawToken))) {
    redirect("/login");
  }

  return <StoryExperience />;
}
