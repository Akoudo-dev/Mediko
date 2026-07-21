import { services } from "@/lib/data";

export default function Specialties() {
  return (
    <section id="specialties" className="bg-bg-tint-alt">
      <div className="mx-auto max-w-[1140px] px-6 py-20 sm:px-10 lg:px-0 lg:py-[136px]">
        <div className="mx-auto flex max-w-[347px] flex-col items-center gap-4 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-[36px] font-bold text-brand-navy sm:text-[50px]">
            Our Specialty
          </h2>
          <p className="text-base text-black">
            We provide the world class services with the best medical team!
          </p>
        </div>

        <div className="mt-[60px] grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[80px_80px]">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`flex w-full max-w-[286.63px] flex-col items-center justify-center gap-[26px] justify-self-center rounded-[26px] px-3 py-10 text-center shadow-[0px_6.5px_27.4px_rgba(0,134,255,0.1)] transition-all duration-300 hover:bg-brand-blue-light hover:text-white ${
                  service.highlighted
                    ? "bg-brand-blue-light text-white"
                    : "bg-white text-black"
                }`}
              >
                <div
                  className={`flex size-[113px] items-center justify-center rounded-[26px] ${
                    service.highlighted ? "bg-bg-tint" : "bg-bg-tint-soft"
                  }`}
                >
                  <Icon
                    className={`size-12 ${
                      service.highlighted ? "text-brand-blue-light" : "text-brand-blue"
                    }`}
                    strokeWidth={1.75}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <p className="font-[family-name:var(--font-display)] text-[26px] font-bold">
                    {service.title}
                  </p>
                  <p
                    className={`text-[19px] leading-normal ${
                      service.highlighted ? "text-white/90" : "text-text-muted"
                    }`}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
