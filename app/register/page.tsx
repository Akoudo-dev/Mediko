"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setLoading(false);
      setError(data.error ?? "Une erreur est survenue.");
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Compte créé, mais la connexion automatique a échoué. Essayez de vous connecter.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
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
          Créer un compte
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          Créez votre espace patient pour prendre rendez-vous et suivre vos
          consultations.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-black">
              Nom complet
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom"
              className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-blue"
            />
          </div>

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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6 caractères minimum"
              className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-blue"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-light disabled:opacity-60"
          >
            {loading ? "Création..." : "Créer mon compte"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-brand-blue hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </main>
  );
}
