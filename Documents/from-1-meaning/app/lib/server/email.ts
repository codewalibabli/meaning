import "server-only";
import { Resend } from "resend";

export async function sendLoginNotification(to: string) {
  console.info("[Vault] Login notification: starting");

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.SECURITY_EMAIL_FROM;

  if (!apiKey || !from) {
    console.error("[Vault] Login notification skipped: configuration missing", {
      apiKeyConfigured: Boolean(apiKey),
      fromConfigured: Boolean(from),
    });
    return;
  }

  try {
    const resend = new Resend(apiKey);
    console.info("[Vault] Login notification: sending");

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject: "New Memento Login",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2>New Memento Login</h2>

          <p>Your private Memento vault was just accessed.</p>

          <p>
            <strong>Time:</strong>
            ${new Date().toLocaleString("en-IN", {
              dateStyle: "full",
              timeStyle: "short",
            })}
          </p>

          <p>
            If this was you, no action is required.
          </p>

          <p>
            If you don't recognize this login, secure your vault immediately.
          </p>

          <p style="margin-top: 30px;">
            — Memento
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[Vault] Login notification failed:", error.message, {
        statusCode: error.statusCode,
        code: error.name,
      });
      return;
    }

    console.info("[Vault] Login notification accepted by Resend", {
      id: data?.id,
    });
  } catch (error) {
    console.error(
      "[Vault] Login notification failed:",
      error instanceof Error ? error.message : "Unknown error",
    );
  }
}
