"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";
import { CloudinaryImage } from "@/components/CloudinaryImage";

type PromiseSectionProps = {
  ocid: string;
  label: string;
  heading: string;
  body: string;
  points: string[];
  image: string;
  imageAlt: string;
  /** Puts the image on the left so two stacked promises alternate. */
  reverse?: boolean;
  /** Keeps the page alternating when a promise follows another pale section. */
  tone?: "white" | "muted";
};

export function PromiseSection({
  ocid,
  label,
  heading,
  body,
  points,
  image,
  imageAlt,
  reverse = false,
  tone = "white",
}: PromiseSectionProps) {
  return (
    <section
      data-ocid={ocid}
      className={tone === "muted" ? "lux-section-muted" : "lux-section-white"}
    >
      <div className="lux-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`relative aspect-[4/3] overflow-hidden ${
              reverse ? "lg:order-last" : ""
            }`}
          >
            <CloudinaryImage
              src={image}
              alt={imageAlt}
              width={900}
              height={675}
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="w-full h-full object-cover"
              transform={{
                width: 900,
                height: 675,
                crop: "fill",
                gravity: "auto",
                quality: "auto:good",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="lux-label mb-4">{label}</p>
            <h2 className="lux-heading-lg mb-5 text-[#1A1A1A]">{heading}</h2>
            <p className="lux-body text-base mb-7">{body}</p>
            <ul className="space-y-3.5">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 shrink-0 w-5 h-5 flex items-center justify-center rounded-full"
                    style={{ backgroundColor: "#FFE082" }}
                  >
                    <Check size={12} className="text-[#1A1A1A]" />
                  </span>
                  <span className="lux-body text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
