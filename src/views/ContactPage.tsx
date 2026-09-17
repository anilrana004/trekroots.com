"use client";

import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  PHONE_DISPLAY,
  PHONE_HREF,
  whatsappLink,
} from "@/data/contact";
import { sendEnquiry } from "@/lib/enquiry";

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Phone",
    value: PHONE_DISPLAY,
    href: PHONE_HREF,
  },
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_EMAIL,
    href: CONTACT_EMAIL_HREF,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with an Expert",
    href: whatsappLink(
      "Hi TrekRoots! I am interested in planning a Himalayan journey.",
    ),
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Rajpur Road, Dehradun, Uttarakhand 248001",
    href: "https://maps.google.com/?q=Dehradun,Uttarakhand",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);
    const result = await sendEnquiry({ kind: "contact", ...form });
    setSending(false);
    if (result.ok) setSubmitted(true);
    else setError(result.error);
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <div className="bg-sidebar py-14 px-4 border-b border-sidebar-border">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="font-display text-5xl font-bold italic text-sidebar-foreground mb-3">
            Plan Your Himalayan Journey
          </h1>
          <p className="text-sidebar-foreground/75 font-body text-lg">
            Our expert team is ready to craft the perfect Himalayan experience
            for you.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                Get in Touch
              </h2>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                Whether you're planning your first trek or your tenth yatra —
                we'll help you make it extraordinary.
              </p>
            </div>
            <div className="space-y-4">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/40 hover:bg-primary/5 transition-smooth group"
                  data-ocid={`contact.${label.toLowerCase()}_link`}
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-body">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-foreground font-body truncate">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground font-body leading-relaxed">
                <strong className="text-foreground">Office hours:</strong>
                <br />
                Monday – Saturday, 9:00 AM – 7:00 PM IST
                <br />
                WhatsApp available 7 days a week
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div
                data-ocid="contact.success_state"
                className="flex flex-col items-center justify-center h-full py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-3xl">🏔️</span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                  We'll be in touch!
                </h3>
                <p className="text-muted-foreground font-body text-sm max-w-sm">
                  Thank you for reaching out. Our team will contact you within
                  24 hours to plan your perfect Himalayan journey.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-xl border border-border p-6 space-y-5"
                data-ocid="contact.form"
              >
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Send Us a Message
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium text-muted-foreground font-body mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Rahul Sharma"
                      data-ocid="contact.name_input"
                      className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-muted-foreground font-body mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="rahul@example.com"
                      data-ocid="contact.email_input"
                      className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-medium text-muted-foreground font-body mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      data-ocid="contact.phone_input"
                      className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="interest"
                      className="block text-xs font-medium text-muted-foreground font-body mb-1.5"
                    >
                      I'm Interested In
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                      data-ocid="contact.interest_select"
                      className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                    >
                      <option value="">Select an option</option>
                      <option value="trek">A Trek</option>
                      <option value="yatra">A Yatra / Pilgrimage</option>
                      <option value="package">A Holiday Package</option>
                      <option value="stay">Accommodation Only</option>
                      <option value="custom">Custom / Group Trip</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium text-muted-foreground font-body mb-1.5"
                  >
                    Tell Us More *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How many people? Preferred dates? Any specific preferences or requirements?"
                    data-ocid="contact.message_textarea"
                    className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
                  />
                </div>
                {error ? (
                  <p className="text-xs font-body text-destructive">
                    {error} You can also reach us on{" "}
                    <a
                      href={whatsappLink(
                        "Hi TrekRoots! I'd like to plan a Himalayan journey.",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      WhatsApp
                    </a>{" "}
                    or at{" "}
                    <a href={CONTACT_EMAIL_HREF} className="underline">
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={sending}
                  data-ocid="contact.submit_button"
                  className="w-full py-3 px-4 rounded-md font-semibold font-body text-sm text-primary-foreground bg-primary hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {sending ? "Sending…" : "Send Message"}
                </button>
                <p className="text-xs text-muted-foreground font-body text-center">
                  Typically replies within 24 hours · Enquire securely via
                  WhatsApp
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
