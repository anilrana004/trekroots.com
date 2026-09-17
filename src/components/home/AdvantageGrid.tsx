"use client";

import {
  Home,
  Leaf,
  Mountain,
  Sparkles,
  Users,
  Users2,
} from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { SectionHead } from "@/components/home/SectionHead";

type Advantage = {
  title: string;
  body: string;
  icon: ReactNode;
  tint: string;
};

const ADVANTAGES: Advantage[] = [
  {
    title: "50+ Himalayan treks on the catalogue",
    body: "Winter summits, monsoon meadows and high passes across Uttarakhand and Himachal — enough range that there is a right trek for you in almost any month.",
    icon: <Mountain size={16} />,
    tint: "#FFE082",
  },
  {
    title: "12+ sacred yatras, run every season",
    body: "Char Dham, Do Dham, Kedarnath and Adi Kailash with Om Parvat, including helicopter transfers where the window allows it.",
    icon: <Sparkles size={16} />,
    tint: "#FFE7B3",
  },
  {
    title: "10,000+ travellers since 2012",
    body: "More than a decade of departures across 30+ Himalayan routes, which is why our itineraries read like they were written by someone who has walked them.",
    icon: <Users size={16} />,
    tint: "#FFE082",
  },
  {
    title: "Six homestays we own and run",
    body: "Basecamp nights in our own properties across Uttarakhand, so the night before your trek is not left to whoever had a room free.",
    icon: <Home size={16} />,
    tint: "#DCEBD8",
  },
  {
    title: "We carry our trash back down",
    body: "Every group brings down its own waste plus whatever earlier groups left behind, and there is no single-use plastic on the trail — refillable bottles are handed out at basecamp.",
    icon: <Leaf size={16} />,
    tint: "#DCEBD8",
  },
  {
    title: "Hired from the villages at the trailhead",
    body: "Guides, cooks and porters come from the villages where the trek starts, and camps are pitched on designated ground and rotated to let the meadows recover.",
    icon: <Users2 size={16} />,
    tint: "#E3E0F3",
  },
];

export function AdvantageGrid() {
  return (
    <section data-ocid="advantage.section" className="py-12 md:py-16 bg-white">
      <div className="lux-container">
        <SectionHead title="The TrekRoots Advantage." className="mb-8 md:mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADVANTAGES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              data-ocid={`advantage.item.${i + 1}`}
              className="border bg-white p-5 md:p-6"
              style={{ borderColor: "#E8E8E8" }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-body text-[13px] font-bold text-[#1A1A1A] leading-snug">
                  {item.title}
                </h3>
                <span
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[#1A1A1A]"
                  style={{ backgroundColor: item.tint }}
                  aria-hidden
                >
                  {item.icon}
                </span>
              </div>
              <p className="lux-body text-[12.5px] leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
