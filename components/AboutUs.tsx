import Link from "next/link";
import ImageWithFallback from "@/components/ImageWithFallback";
import { aboutUsPhoto } from "@/lib/assets";

export default function AboutUs() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-12 px-6 py-20 sm:px-10 lg:flex-row lg:gap-[150px] lg:px-[114px] lg:py-[100px]">
        <div className="relative h-[320px] w-full max-w-[547px] shrink-0 overflow-hidden rounded-[56px] sm:h-[380px] lg:h-[422px]">
          <ImageWithFallback
            src={aboutUsPhoto}
            alt="Doctors reviewing a patient case in a bright clinic"
            fill
            sizes="(min-width: 1024px) 547px, 90vw"
            className="object-cover"
          />
        </div>

        <div className="flex w-full max-w-[490px] flex-col items-start gap-[26px]">
          <div className="flex flex-col gap-[26px]">
            <p className="font-[family-name:var(--font-body)] text-base font-semibold text-brand-blue">
              About Us
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[32px] leading-tight font-bold text-brand-navy sm:text-[40px]">
              World-Class Preventive, Prescriptive &amp; Curative Medical
              Practices
            </h2>
          </div>
          <p className="text-base leading-normal text-text-muted">
            Being in the healthcare sector, we consider it our paradigm duty
            to ensure Safety of our patients, effectiveness of our treatments,
            transparency in our practices, and absolute timely care.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-lg bg-brand-blue px-[30px] py-[14px] text-base text-white transition-colors hover:bg-brand-blue-light"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
