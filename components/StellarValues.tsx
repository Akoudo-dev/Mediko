import Link from "next/link";
import ImageWithFallback from "@/components/ImageWithFallback";
import {
  galleryPhotoA,
  galleryPhotoB,
  galleryPhotoC,
  galleryPhotoD,
} from "@/lib/assets";

export default function StellarValues() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-16 px-6 py-20 sm:px-10 lg:flex-row lg:gap-[112px] lg:px-[116px] lg:py-[100px]">
        <div className="grid w-full max-w-[551px] shrink-0 grid-cols-2 gap-4 sm:gap-6">
          <div className="flex flex-col gap-4 pt-0 sm:gap-6">
            <div className="relative aspect-[262/308] w-full overflow-hidden rounded-[32px] sm:rounded-[44px]">
              <ImageWithFallback
                src={galleryPhotoA}
                alt="Clinic staff attending to a patient"
                fill
                sizes="(min-width: 1024px) 262px, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[262/308] w-full overflow-hidden rounded-[32px] sm:rounded-[44px]">
              <ImageWithFallback
                src={galleryPhotoB}
                alt="Doctor consulting a patient"
                fill
                sizes="(min-width: 1024px) 262px, 45vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-8 sm:gap-6 sm:pt-16">
            <div className="relative aspect-[262/308] w-full overflow-hidden rounded-[32px] sm:rounded-[44px]">
              <ImageWithFallback
                src={galleryPhotoD}
                alt="Medical team collaborating"
                fill
                sizes="(min-width: 1024px) 262px, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[262/308] w-full overflow-hidden rounded-[32px] sm:rounded-[44px]">
              <ImageWithFallback
                src={galleryPhotoC}
                alt="Patient receiving care"
                fill
                sizes="(min-width: 1024px) 262px, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-[490px] flex-col items-start gap-[26px]">
          <div className="flex flex-col gap-[26px]">
            <p className="font-[family-name:var(--font-body)] text-base font-semibold text-brand-blue">
              Integrity
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[32px] font-bold text-brand-navy sm:text-[40px]">
              Our Stellar Values
            </h2>
          </div>
          <p className="text-base leading-normal text-text-muted">
            The cornerstone of our establishment is &lsquo;Making the
            benefits of exceptional medical services reach the people without
            Discrimination.&rsquo; We strive to live up to this philosophy
            through our stellar values, that are the pillars of every service
            that we offer under the banner of our prestigious hospital.
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
