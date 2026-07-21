"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { ImageOff } from "lucide-react";

type Props = Omit<ImageProps, "onError"> & {
  wrapperClassName?: string;
};

export default function ImageWithFallback({
  wrapperClassName,
  className,
  alt,
  ...props
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-bg-tint to-bg-tint-soft text-brand-blue-light ${wrapperClassName ?? ""}`}
      >
        <ImageOff className="size-8" />
        <span className="px-4 text-center text-xs text-brand-blue">
          {alt || "Image indisponible"}
        </span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
