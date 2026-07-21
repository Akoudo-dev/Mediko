"use client";

import { useState, type FormEvent } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.92l-3.88-3c-1.08.72-2.46 1.15-4.06 1.15-3.12 0-5.77-2.11-6.72-4.94H1.27v3.1C3.24 21.3 7.29 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.29A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.38-2.29v-3.1H1.27A11.98 11.98 0 0 0 0 12c0 1.94.46 3.77 1.27 5.39l4.01-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.35.61 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.29 0 3.24 2.7 1.27 6.61l4.01 3.1C6.23 6.88 8.88 4.77 12 4.77Z"
      />
    </svg>
  );
}

export default function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleEmailLogin(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setLoading(false);
      setError(
        "Identifiants invalides. Vérifiez votre email et votre mot de passe.",
      );
      return;
    }

    const session = await getSession();
    setLoading(false);

    const destination =
      callbackUrl || (session?.user?.role === "admin" ? "/admin" : "/dashboard");
    router.push(destination);
    router.refresh();
  }

  async function handleGoogleLogin() {
    await signIn("google", { callbackUrl: callbackUrl || "/dashboard" });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-tint px-6 py-16">
      <div className="w-full max-w-[420px] rounded-3xl bg-white p-8 shadow-[0px_10px_42.6px_1px_rgba(183,223,255,0.5)] sm:p-10">
        <Link
          href="/"
          className="mb-8 inline-block font-[family-name:var(--font-logo)] text-2xl font-bold"
        >
          <span className="text-brand-blue">Muhiris </span>
          <span className="text-black">Doctor</span>
        </Link>

        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-brand-navy">
          Connectez-vous
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          Accédez à votre espace patient pour prendre rendez-vous et suivre
          vos consultations.
        </p>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-black/5"
        >
          <GoogleIcon />
          Continuer avec Google
        </button>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-black/10" />
          <span className="text-xs text-text-muted">ou avec votre email</span>
          <div className="h-px flex-1 bg-black/10" />
        </div>

        <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-black">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
              className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-blue"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-black"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-blue"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-light disabled:opacity-60"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-text-muted">
          Pas encore de compte ?{" "}
          <Link href="/register" className="text-brand-blue hover:underline">
            Créer un compte
          </Link>
        </p>

        {/* <div className="mt-4 rounded-xl bg-bg-tint-soft p-4 text-xs text-text-muted">
          <p className="font-medium text-black">Compte de démonstration</p>
          <p>Admin : admin@muhirisdoctor.com / admin1234</p>
        </div> */}

        <Link
          href="/"
          className="mt-6 block text-center text-sm text-brand-blue hover:underline"
        >
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
