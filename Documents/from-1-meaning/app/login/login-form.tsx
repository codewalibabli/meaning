"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { authApi } from "@/app/lib/api";

export default function LoginForm() {
  const router = useRouter();
  const shellRef = useRef<HTMLDivElement | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!shellRef.current) return;

    const context = gsap.context(() => {
      gsap.from(".love-login-content", {
        opacity: 0,
        y: 24,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".love-heart", {
        opacity: 0,
        scale: 0.6,
        duration: 1,
        delay: 0.3,
        ease: "back.out(1.7)",
      });
    }, shellRef);

    return () => context.revert();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter both your email and password.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email.trim())) {
        throw new Error("Invalid email");
      }

      await authApi.login(email.trim(), password);

      router.push("/vault");
      router.refresh();
    } catch {
      setError("Hmm... na munna na galat jaa rhe ho . ♡");
      setPassword("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main
      ref={shellRef}
      className="love-login-shell"
      aria-label="Private login page"
    >
      {/* Soft decorative background */}
      <div className="love-glow love-glow--one" />
      <div className="love-glow love-glow--two" />

      {/* Floating decorative hearts */}
      <span className="love-heart love-heart--one">♡</span>
      <span className="love-heart love-heart--two">♡</span>
      <span className="love-heart love-heart--three">♡</span>

      <div className="love-login-content">
        <div className="love-login-card">
          <div className="love-card-top">
            <span className="love-mini-line" />
            <span className="love-card-label">Just a small space</span>
            <span className="love-mini-line" />
          </div>

          <div className="love-symbol">♡</div>

          <form className="love-login-form" onSubmit={handleSubmit} noValidate>
            <div className="love-field">
              <label htmlFor="login-email">Email</label>

              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                inputMode="email"
                placeholder="your email"
                aria-invalid={Boolean(error)}
              />
            </div>

            <div className="love-field">
              <label htmlFor="login-password">Password</label>

              <div className="love-password-wrap">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  placeholder="your secret"
                  aria-invalid={Boolean(error)}
                />

                <button
                  type="button"
                  className="love-password-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="love-enter-button"
              disabled={isSubmitting || !email.trim() || !password.trim()}
            >
              <span>
                {isSubmitting ? "Opening..." : "Open our little world"}
              </span>

              <span className="love-button-heart">♡</span>
            </button>

            <p className="love-login-message" role="alert" aria-live="polite">
              {error || "just between you & me ♡"}
            </p>
          </form>

          <div className="love-card-footer">
            <span>made with love</span>
            <span>·</span>
            <span>just for us</span>
          </div>
        </div>
      </div>
    </main>
  );
}
