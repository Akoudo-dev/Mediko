import { MapPin, Search } from "lucide-react";
import ImageWithFallback from "@/components/ImageWithFallback";
import { heroDoctorPhoto } from "@/lib/assets";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-bg-tint">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-16 px-6 py-16 sm:px-10 md:py-24 lg:grid-cols-2 lg:gap-[134px] lg:px-[73px] lg:py-[92px]">
        {/* Left column: copy + search bar */}
        <div className="flex max-w-[528px] flex-col gap-9">
          <div className="flex flex-col gap-5">
            <h1 className="font-[family-name:var(--font-display)] text-[40px] leading-[1.1] font-bold sm:text-[48px] lg:text-[56.8px]">
              <span className="text-brand-navy">Get Expert </span>
              <span className="text-brand-blue">
                Medical
                <br />
                Consultation!
              </span>
            </h1>
            <p className="max-w-[390px] text-base leading-normal text-text-muted">
              Our doctors provide expert medical advice and consultation. Get
              in touch with our team to discuss.
            </p>
          </div>

          <form className="relative flex h-[60px] w-full max-w-[528px] items-center rounded-xl bg-white shadow-[0px_10px_42.6px_1px_rgba(183,223,255,0.5)]">
            <MapPin className="ml-[26px] size-6 shrink-0 text-brand-blue" />
            <input
              type="text"
              placeholder="Search Doctors in your location"
              className="ml-[13px] w-full bg-transparent text-sm text-[#1e1e1e] placeholder:text-[#1e1e1e] focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Search"
              className="mr-1.5 flex size-[50px] shrink-0 items-center justify-center rounded-[10px] bg-brand-blue transition-colors hover:bg-brand-blue-light"
            >
              <Search className="size-6 text-white" />
            </button>
          </form>
        </div>

        {/* Right column: decorative ring + doctor photo */}
        <div className="relative mx-auto aspect-square w-full max-w-[560px] lg:mx-0 lg:ml-auto">
          <div className="absolute inset-0 rounded-[48px] bg-[#dff0ff]" />
          <svg
            viewBox="0 0 560 560"
            className="absolute inset-0 h-full w-full text-white/70"
            aria-hidden
          >
            <circle
              cx="280"
              cy="280"
              r="230"
              fill="none"
              stroke="currentColor"
              strokeWidth="70"
            />
          </svg>
          <div className="absolute inset-[6%] overflow-hidden rounded-[40px]">
            <ImageWithFallback
              src={heroDoctorPhoto}
              alt="Beautiful young female doctor looking at camera in the office"
              fill
              sizes="(min-width: 1024px) 520px, 90vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
