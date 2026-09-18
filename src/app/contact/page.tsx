import type { Metadata } from "next";
import ContactPage from "@/views/ContactPage";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact TrekRoots",
  description:
    "Call, WhatsApp or email TrekRoots in Dehradun for trek bookings, yatra planning, packages and Himalayan stays.",
  path: "/contact",
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function Page() {
  return (
    <>
      <JsonLd id="schema-contact-breadcrumb" data={breadcrumbSchema(CRUMBS)} />
      <ContactPage />
    </>
  );
}
