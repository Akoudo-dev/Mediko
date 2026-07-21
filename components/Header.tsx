"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, LayoutDashboard, ShieldCheck, LogOut } from "lucide-react";
import { navLinks } from "@/lib/data";

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  // Hide the static "Login" link once we know the auth state, and add the
  // dashboard/admin/logout controls instead.
  const links = navLinks.filter((link) => link.href !== "/login");

  return (
    <header className="sticky top-0 z-50 w-full bg-bg-tint">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-[92px]">
        <Link
          href="/"
          className="shrink-0 font-[family-name:var(--font-logo)] text-xl font-bold tracking-tight whitespace-nowrap sm:text-2xl"
          onClick={() => setOpen(false)}
        >
          <span className="text-brand-blue">Muhiris </span>
          <span className="text-black">Doctor</span>
        </Link>

        <nav className="hidden items-center gap-6 text-base lg:flex xl:gap-[24px]">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={
                  isActive
                    ? "font-medium text-brand-blue"
                    : "text-black transition-colors hover:text-brand-blue"
                }
              >
                {link.label}
              </Link>
            );
          })}

          {status === "authenticated" && (
            <>
              {session.user.role === "admin" ? (
                <Link
                  href="/admin"
                  className={`flex items-center gap-1.5 ${
                    pathname.startsWith("/admin")
                      ? "font-medium text-brand-blue"
                      : "text-black transition-colors hover:text-brand-blue"
                  }`}
                >
                  <ShieldCheck className="size-4" />
                  Admin
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-1.5 ${
                    pathname.startsWith("/dashboard")
                      ? "font-medium text-brand-blue"
                      : "text-black transition-colors hover:text-brand-blue"
                  }`}
                >
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </Link>
              )}
            </>
          )}

          {status === "unauthenticated" && (
            <Link
              href="/login"
              className={
                pathname.startsWith("/login")
                  ? "font-medium text-brand-blue"
                  : "text-black transition-colors hover:text-brand-blue"
              }
            >
              Login
            </Link>
          )}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          {status === "authenticated" && (
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-1.5 rounded-xl border border-black/10 px-3 py-2 text-sm text-black transition-colors hover:bg-black/5"
              title={session.user.email ?? undefined}
            >
              <LogOut className="size-4" />
              Déconnexion
            </button>
          )}
          <Link
            href="/book"
            className="rounded-xl bg-brand-blue px-[21px] py-[10px] text-base text-white transition-colors hover:bg-brand-blue-light"
          >
            Book Now
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 items-center justify-center rounded-lg text-black lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-black/5 bg-bg-tint lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4 sm:px-8">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-3 text-base ${
                    isActive
                      ? "bg-white font-medium text-brand-blue"
                      : "text-black hover:bg-white/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {status === "authenticated" ? (
              <>
                <Link
                  href={session.user.role === "admin" ? "/admin" : "/dashboard"}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base text-black hover:bg-white/60"
                >
                  {session.user.role === "admin" ? "Admin" : "Dashboard"}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="rounded-lg px-3 py-3 text-left text-base text-black hover:bg-white/60"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-black hover:bg-white/60"
              >
                Login
              </Link>
            )}

            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-brand-blue px-4 py-3 text-center text-base text-white transition-colors hover:bg-brand-blue-light"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
