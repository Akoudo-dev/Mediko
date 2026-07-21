import type { Metadata } from "next";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Muhiris Doctor | Get Expert Medical Consultation",
  description:
    "Our doctors provide expert medical advice and consultation. Get in touch with our team to discuss.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="antialiased"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className="overflow-x-hidden bg-white text-[#1e1e1e]"
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
