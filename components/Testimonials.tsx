"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing local state with the embla-carousel instance on init, the standard pattern for this library
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-bg-tint">
      <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 lg:px-[116px] lg:py-[160px]">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div className="flex max-w-[584px] flex-col gap-5">
            <h2 className="font-[family-name:var(--font-display)] text-[32px] leading-tight font-bold text-brand-navy sm:text-[40px]">
              Read feedback about our Services and wonderful team!
            </h2>
            <p className="text-base leading-normal text-text-muted">
              We take care of our patients just like a family member . Read
              the testimonials from our patients.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={scrollPrev}
              className="flex size-10 items-center justify-center rounded-full bg-white text-brand-navy transition-colors hover:bg-brand-blue hover:text-white"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              onClick={scrollNext}
              className="flex size-10 items-center justify-center rounded-full bg-brand-blue text-white transition-colors hover:bg-brand-blue-light"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-16 overflow-hidden" ref={emblaRef}>
          <div className="-ml-5 flex">
            {testimonials.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="min-w-0 shrink-0 grow-0 basis-full pl-5 sm:basis-1/2 lg:basis-1/4"
              >
                <div className="flex h-full w-full flex-col items-start gap-9 rounded-2xl bg-white px-[18px] py-[39px]">
                  <div className="flex flex-col items-start gap-3">
                    <Quote className="size-8 fill-brand-blue text-brand-blue" />
                    <p className="text-sm leading-normal text-text-muted">
                      {t.quote}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-bg-tint font-[family-name:var(--font-display)] font-bold text-brand-blue">
                      {t.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-black">
                        {t.name}
                      </span>
                      <span className="text-xs text-text-muted">
                        {t.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Aller au témoignage ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                index === selectedIndex
                  ? "w-6 bg-brand-blue"
                  : "w-2 bg-brand-blue/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
