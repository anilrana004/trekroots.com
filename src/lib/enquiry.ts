/** Shape of every form on the site that reaches the team by email. */

export type EnquiryKind = "contact" | "booking" | "newsletter";

export type Enquiry = {
  kind: EnquiryKind;
  name?: string;
  email?: string;
  phone?: string;
  /** What the visitor picked on the contact form. */
  interest?: string;
  /** Trek/yatra/package the booking form was opened for. */
  trip?: string;
  travelDates?: string;
  groupSize?: string;
  message?: string;
};

export type EnquiryResult = { ok: true } | { ok: false; error: string };

/** Posts a form to the API route that sends the mail. */
export async function sendEnquiry(enquiry: Enquiry): Promise<EnquiryResult> {
  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry),
    });
    if (res.ok) return { ok: true };
    const body = (await res.json().catch(() => null)) as {
      error?: string;
    } | null;
    return { ok: false, error: body?.error ?? `Request failed (${res.status})` };
  } catch {
    return { ok: false, error: "Could not reach the server." };
  }
}
