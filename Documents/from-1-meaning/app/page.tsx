import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isSessionValid } from "@/app/lib/server/auth";

export default async function Home() {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get("vault_session")?.value;

  redirect((await isSessionValid(rawToken)) ? "/vault" : "/login");
}
