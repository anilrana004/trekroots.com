import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { useState } from "react";

const EXPLORE_LINKS = [
  { label: "Treks", to: "/treks" },
  { label: "Yatra", to: "/yatra" },
  { label: "Packages", to: "/packages" },
  { label: "Stays", to: "/stays" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

const TOP_TREKS = [
  { label: "Kedarkantha Trek", to: "/treks/kedarkantha" },
  { label: "Valley of Flowers", to: "/treks/valley-of-flowers" },
  { label: "Roopkund Trek", to: "/treks/roopkund" },
  { label: "Hampta Pass", to: "/treks/hampta-pass" },
  { label: "Har Ki Dun", to: "/treks/har-ki-dun" },
  { label: "Sar Pass Trek", to: "/treks/sar-pass" },
] as const;

const TRUST_BADGES = [
  { icon: "🏔", label: "GMVN Approved Operator" },
  { icon: "🇮🇳", label: "Ministry of Tourism Certified" },
  { icon: "🔒", label: "Secure Payments via Razorpay" },
  { icon: "🌿", label: "Eco-Tourism Committed" },
] as const;

function FooterLink({ label, to }: { label: string; to: string }) {
  return (
    <li>
      <Link
        to={to}
        className="text-[13px] font-body transition-colors hover:text-[#C04000]"
        style={{ color: "#4A4A4A" }}
      >
        {label}
      </Link>
    </li>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? window.location.hostname
      : "manya-destination";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer data-ocid="footer" style={{ backgroundColor: "#2A0A0A" }}>
      {/* Newsletter banner */}
      <div style={{ backgroundColor: "#C04000" }} className="py-8">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="font-display text-[22px] font-bold text-white mb-1">
              Journey Inspirations, Delivered
            </h3>
            <p className="text-[13px] font-body text-white/75">
              Trek routes, yatra guides, seasonal travel tips — straight to your
              inbox.
            </p>
          </div>
          {subscribed ? (
            <div className="flex items-center gap-2 px-5 py-2.5 rounded bg-white/20 text-white text-[14px] font-medium font-body">
              ✓ You're subscribed! Namaste 🙏
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex gap-2 w-full md:w-auto"
              data-ocid="footer.newsletter_form"
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-ocid="footer.newsletter_input"
                className="flex-1 md:w-64 px-4 py-2.5 rounded text-[13px] font-body bg-white/15 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white/60"
              />
              <button
                type="submit"
                data-ocid="footer.newsletter_submit"
                className="px-5 py-2.5 rounded text-[13px] font-semibold font-body bg-white text-[#C04000] hover:bg-white/90 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[1400px] mx-auto px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Brand + Social */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 mb-4"
              data-ocid="footer.logo"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 28 28"
                fill="none"
                aria-hidden="true"
              >
                <polygon
                  points="14,2 27,25 1,25"
                  fill="none"
                  stroke="#E6BE8A"
                  strokeWidth="2"
                />
                <polygon
                  points="14,9 21,22 7,22"
                  fill="#E6BE8A"
                  opacity="0.3"
                />
              </svg>
              <span className="font-display text-[17px] font-bold tracking-tight text-white">
                Manya Destination
              </span>
            </Link>
            <p
              className="text-[13px] font-body leading-relaxed mb-6"
              style={{ color: "#A89080" }}
            >
              Where the Himalayas begin and souls find peace. Curated journeys
              across Uttarakhand &amp; Himachal Pradesh since 2012.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mb-6">
              {[
                {
                  href: "https://instagram.com",
                  icon: <Instagram size={17} />,
                  label: "Instagram",
                },
                {
                  href: "https://facebook.com",
                  icon: <Facebook size={17} />,
                  label: "Facebook",
                },
                {
                  href: "https://twitter.com",
                  icon: <Twitter size={17} />,
                  label: "Twitter / X",
                },
                {
                  href: "https://youtube.com",
                  icon: <Youtube size={17} />,
                  label: "YouTube",
                },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-ocid={`footer.social.${label.toLowerCase().replace(/[^a-z]/g, "")}`}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-white/15 text-white/50 hover:text-[#E6BE8A] hover:border-[#E6BE8A]/40 transition-colors"
                >
                  {icon}
                </a>
              ))}
              {/* WhatsApp */}
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                data-ocid="footer.social.whatsapp"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/15 text-white/50 hover:text-green-400 hover:border-green-400/40 transition-colors"
              >
                <span className="sr-only">Chat on WhatsApp</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
            <div className="text-[12px] font-body" style={{ color: "#A89080" }}>
              <div className="flex items-center gap-1.5 mb-1">
                <span>⭐</span>
                <span>4.9/5 on Google (800+ reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>📅</span>
                <span>Operating since 2012</span>
              </div>
            </div>
          </div>

          {/* Col 2: Explore */}
          <div>
            <h4
              className="font-body text-[11px] font-semibold uppercase tracking-widest mb-5"
              style={{ color: "#E6BE8A" }}
            >
              Explore
            </h4>
            <ul className="space-y-3">
              {EXPLORE_LINKS.map(({ label, to }) => (
                <FooterLink key={to} label={label} to={to} />
              ))}
            </ul>
            <h4
              className="font-body text-[11px] font-semibold uppercase tracking-widest mt-7 mb-5"
              style={{ color: "#E6BE8A" }}
            >
              Popular Treks
            </h4>
            <ul className="space-y-3">
              {TOP_TREKS.map(({ label, to }) => (
                <FooterLink key={to} label={label} to={to} />
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4
              className="font-body text-[11px] font-semibold uppercase tracking-widest mb-5"
              style={{ color: "#E6BE8A" }}
            >
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone
                  size={14}
                  className="mt-0.5 shrink-0"
                  style={{ color: "#C04000" }}
                />
                <div>
                  <p
                    className="text-[11px] font-body font-semibold uppercase tracking-wider mb-0.5"
                    style={{ color: "#A89080" }}
                  >
                    Phone / WhatsApp
                  </p>
                  <a
                    href="tel:+919876543210"
                    className="text-[13px] font-body text-white hover:text-[#E6BE8A] transition-colors"
                  >
                    +91 98765 43210
                  </a>
                  <br />
                  <a
                    href="tel:+911352345678"
                    className="text-[13px] font-body text-white/60 hover:text-[#E6BE8A] transition-colors"
                  >
                    +91 1352 345678
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  size={14}
                  className="mt-0.5 shrink-0"
                  style={{ color: "#C04000" }}
                />
                <div>
                  <p
                    className="text-[11px] font-body font-semibold uppercase tracking-wider mb-0.5"
                    style={{ color: "#A89080" }}
                  >
                    Email
                  </p>
                  <a
                    href="mailto:info@manyadestination.com"
                    className="text-[13px] font-body text-white hover:text-[#E6BE8A] transition-colors"
                  >
                    info@manyadestination.com
                  </a>
                  <br />
                  <a
                    href="mailto:bookings@manyadestination.com"
                    className="text-[13px] font-body text-white/60 hover:text-[#E6BE8A] transition-colors"
                  >
                    bookings@manyadestination.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  size={14}
                  className="mt-0.5 shrink-0"
                  style={{ color: "#C04000" }}
                />
                <div>
                  <p
                    className="text-[11px] font-body font-semibold uppercase tracking-wider mb-0.5"
                    style={{ color: "#A89080" }}
                  >
                    Office
                  </p>
                  <span
                    className="text-[13px] font-body"
                    style={{ color: "#CCBCB0" }}
                  >
                    17, Rajpur Road, Near ONGC Chowk,
                    <br />
                    Dehradun, Uttarakhand 248001
                  </span>
                </div>
              </li>
            </ul>
            <div
              className="mt-6 p-3 rounded-lg border border-white/10"
              style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              <p
                className="text-[11px] font-body font-semibold uppercase tracking-wider mb-2"
                style={{ color: "#A89080" }}
              >
                Office Hours
              </p>
              <p className="text-[12px] font-body" style={{ color: "#CCBCB0" }}>
                Mon–Sat: 9:00 AM – 7:00 PM IST
              </p>
              <p className="text-[12px] font-body" style={{ color: "#CCBCB0" }}>
                Sun: 10:00 AM – 4:00 PM IST
              </p>
            </div>
          </div>

          {/* Col 4: Trust & Certifications */}
          <div>
            <h4
              className="font-body text-[11px] font-semibold uppercase tracking-widest mb-5"
              style={{ color: "#E6BE8A" }}
            >
              Trust & Certifications
            </h4>
            <div className="space-y-3">
              {TRUST_BADGES.map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 px-3.5 py-3 rounded-lg border border-white/10"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                >
                  <span className="text-[18px] shrink-0">{icon}</span>
                  <span
                    className="text-[12px] font-body font-medium"
                    style={{ color: "#CCBCB0" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h4
                className="font-body text-[11px] font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#E6BE8A" }}
              >
                Payment Methods
              </h4>
              <div className="flex flex-wrap gap-2">
                {["UPI", "VISA", "Mastercard", "Net Banking", "EMI"].map(
                  (method) => (
                    <span
                      key={method}
                      className="px-2.5 py-1 rounded text-[11px] font-body font-medium border border-white/15"
                      style={{ color: "#A89080" }}
                    >
                      {method}
                    </span>
                  ),
                )}
              </div>
              <p
                className="mt-3 text-[11px] font-body"
                style={{ color: "#6A5A50" }}
              >
                🔒 100% secure payments via Razorpay. All transactions are
                encrypted &amp; protected.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-[1400px] mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[12px] font-body" style={{ color: "#6A5A50" }}>
            © {year} Manya Destination. All rights reserved. Built with love
            using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-70 transition-opacity"
              style={{ color: "#C04000" }}
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: "Privacy Policy", to: "/contact" },
              { label: "Terms of Service", to: "/contact" },
              { label: "Cancellation Policy", to: "/contact" },
              { label: "Sitemap", to: "/" },
            ].map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="text-[12px] font-body transition-opacity hover:opacity-70"
                style={{ color: "#6A5A50" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
