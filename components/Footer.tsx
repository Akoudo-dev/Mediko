import Link from "next/link";
import type { SVGProps } from "react";
import { footerAbout, footerExplore } from "@/lib/data";

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 9H15V6.5h-1.75C11.32 6.5 10 7.79 10 9.75V11H8.5v2.5H10V21h2.5v-7.5h1.9l.35-2.5h-2.25v-.98c0-.68.32-1.02 1-1.02Z" />
    </svg>
  );
}

function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 5.9c-.6.27-1.24.45-1.9.53a3.3 3.3 0 0 0 1.46-1.83 6.6 6.6 0 0 1-2.1.8 3.3 3.3 0 0 0-5.62 3 9.36 9.36 0 0 1-6.8-3.45 3.3 3.3 0 0 0 1.02 4.4 3.27 3.27 0 0 1-1.5-.4v.04a3.3 3.3 0 0 0 2.64 3.24 3.3 3.3 0 0 1-1.49.06 3.3 3.3 0 0 0 3.08 2.29A6.62 6.62 0 0 1 4 15.9a9.33 9.33 0 0 0 5.05 1.48c6.06 0 9.38-5.02 9.38-9.38l-.01-.43A6.7 6.7 0 0 0 20 5.9Z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.7" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socials = [
  { icon: FacebookIcon, label: "Facebook", href: "#" },
  { icon: TwitterIcon, label: "Twitter", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-footer text-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-16 px-6 pt-16 sm:px-10 lg:flex-row lg:gap-[83px] lg:px-[127px] lg:pt-[85px] lg:pb-[80px]">
        <div className="flex w-full max-w-[183px] flex-col items-start gap-12">
          <div className="flex flex-col gap-2">
            <p className="font-[family-name:var(--font-display)] text-2xl font-bold">
              MuhirisDoctor
            </p>
            <p className="text-sm leading-normal text-footer-muted">
              The ultimate destination for all of your medical needs
            </p>
          </div>
          <div className="flex items-center gap-4">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex size-[30px] items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-blue"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col gap-12 sm:flex-row sm:justify-between lg:max-w-[829px]">
          <div className="flex flex-col gap-[26px]">
            <p className="font-[family-name:var(--font-display)] text-2xl font-bold">
              Explore
            </p>
            <ul className="flex flex-col gap-[13px] text-sm text-footer-muted">
              {footerExplore.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-[26px]">
            <p className="font-[family-name:var(--font-display)] text-2xl font-bold">
              About Us
            </p>
            <ul className="flex flex-col gap-[13px] text-sm text-footer-muted">
              {footerAbout.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-[25px]">
            <p className="font-[family-name:var(--font-display)] text-2xl font-bold">
              Contact
            </p>
            <ul className="flex flex-col gap-[13px] text-sm text-footer-muted">
              <li>+923041234567</li>
              <li>favorite@doctor.com</li>
              <li>Glassplace, Near Cool Avenue, Boson</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-brand-footer-bottom">
        <p className="mx-auto max-w-[1440px] px-6 py-6 text-center text-base text-white">
          Copyright 2024 Favorite Doctor, All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
