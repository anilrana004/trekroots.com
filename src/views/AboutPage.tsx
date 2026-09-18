"use client";

import Link from "next/link";
import { Award, Heart, Mountain, Shield, Star, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const STATS = [
  { value: "10,000+", label: "Happy Travellers", icon: Users },
  { value: "50+", label: "Curated Treks", icon: Mountain },
  { value: "12+", label: "Sacred Yatras", icon: Star },
  { value: "6", label: "Owned Properties", icon: Heart },
];

const VALUES = [
  {
    icon: Mountain,
    title: "Expert Guides",
    description:
      "Certified, local guides with 10+ years of high-altitude experience on every trek and yatra.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description:
      "First-aid trained staff, emergency protocols, oxygen cylinders, and satellite phones on all high-altitude expeditions.",
  },
  {
    icon: Heart,
    title: "Owned Accommodations",
    description:
      "We personally manage every homestay and boutique hotel — no middlemen, no compromises on quality.",
  },
  {
    icon: Award,
    title: "Verified Itineraries",
    description:
      "All routes based on official forest department and IMF data, updated every season for accuracy and safety.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We partner with local communities, employ village guides, and source food from local farmers across Uttarakhand.",
  },
  {
    icon: Star,
    title: "Responsible Travel",
    description:
      "Zero-waste pledge on all treks. We carry out what we carry in — and train every trekker to do the same.",
  },
];

const TEAM = [
  {
    name: "Priya Sharma",
    role: "Founder & Lead Guide",
    bio: "Born in Dehradun with the Himalayas as her backyard, Priya has led 500+ trek expeditions across Uttarakhand and Himachal Pradesh over 15 years.",
    emoji: "🧗‍♀️",
  },
  {
    name: "Vikram Rawat",
    role: "Head of Operations",
    bio: "Former GMVN trek leader turned entrepreneur, Vikram manages all logistics, permits, and on-ground operations with military precision.",
    emoji: "🧗‍♂️",
  },
  {
    name: "Ananya Bisht",
    role: "Yatra Specialist",
    bio: "A Char Dham veteran with deep knowledge of pilgrimage routes, temple timings, and the spiritual significance of every sacred site in Garhwal.",
    emoji: "🙏",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-sidebar py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Breadcrumbs
            tone="dark"
            className="mb-6 justify-center"
            items={[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]}
          />
          <span className="inline-block text-xs font-semibold font-body tracking-widest text-accent/80 uppercase mb-4">
            Est. 2010 · Dehradun, Uttarakhand
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold italic text-sidebar-foreground mb-6 leading-tight">
            Born in the Mountains,
            <br />
            Built for the Mountains
          </h1>
          <p className="text-sidebar-foreground/75 font-body text-lg leading-relaxed max-w-2xl mx-auto">
            TrekRoots is Uttarakhand's most trusted Himalayan travel
            company. We are the only operator with owned homestays and hotels in
            Uttarakhand — covering every major trek, yatra, and package with
            unmatched local expertise.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card border-b border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                  <Icon size={22} />
                </div>
                <p className="font-mono text-3xl font-bold text-primary mb-1">
                  {value}
                </p>
                <p className="text-sm text-muted-foreground font-body">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <span className="inline-block text-xs font-semibold tracking-widest text-accent uppercase font-body mb-3">
            Our Story
          </span>
          <h2 className="font-display text-4xl font-bold text-foreground mb-6">
            A Family's Passion, A Nation's Mountains
          </h2>
          <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
            <p>
              What started as Priya Sharma leading weekend treks for college
              friends in 2010 has grown into Uttarakhand's most trusted
              Himalayan travel company. Over 15 years, we've guided 10,000+
              travellers to some of the world's most spectacular high-altitude
              terrain.
            </p>
            <p>
              Unlike tour operators who outsource everything, we built our own
              homestays in Sankri, Chopta, Munsiyari, Auli, Lohajung, and
              Rishikesh — because we believe where you sleep shapes the entire
              journey. Our properties are run by local families who've lived in
              these mountains for generations.
            </p>
            <p>
              Every itinerary we publish is walked by our own guides. Every
              altitude figure is cross-checked against IMF data. Every campsite
              is scouted in advance. We don't sell trips — we craft experiences
              that stay with you forever.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30 py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-foreground">
              What We Stand For
            </h2>
            <p className="text-muted-foreground font-body mt-3 max-w-xl mx-auto">
              Six principles that guide every trek, every yatra, and every stay
              we offer.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-card rounded-lg p-6 border border-border hover:border-primary/40 hover:shadow-md transition-smooth"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 text-primary mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-foreground">
              Meet the TrekRoots Team
            </h2>
            <p className="text-muted-foreground font-body mt-3">
              Local experts. Mountain lovers. Your hosts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {TEAM.map(({ name, role, bio, emoji }) => (
              <div key={name} className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 text-4xl flex items-center justify-center mx-auto mb-4">
                  {emoji}
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {name}
                </h3>
                <p className="text-sm text-accent font-body font-medium mb-3">
                  {role}
                </p>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: "🏔️", label: "Uttarakhand Tourism Registered" },
              { emoji: "⛰️", label: "IMF Affiliated" },
              { emoji: "⭐", label: "Google Rating 4.9 / 5" },
              { emoji: "🛡️", label: "Trusted Himalayan Experts" },
            ].map(({ emoji, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 py-4 px-3 rounded-lg bg-muted/50 text-center"
              >
                <span className="text-2xl">{emoji}</span>
                <span className="text-xs font-body text-muted-foreground leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold italic text-primary-foreground mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-primary-foreground/80 font-body mb-8">
            Talk to our team. We'll help you find the perfect trek, yatra, or
            package for your goals.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/treks"
              data-ocid="about.explore_treks_button"
              className="px-6 py-3 rounded-md font-semibold font-body text-sm bg-white text-primary hover:bg-white/90 transition-colors"
            >
              Explore Treks
            </Link>
            <Link
              href="/contact"
              data-ocid="about.contact_button"
              className="px-6 py-3 rounded-md font-semibold font-body text-sm border border-white/50 text-white hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
