/** Single source of truth for the ways customers reach us. */

/** Where every enquiry form lands, and the address shown across the site. */
export const CONTACT_EMAIL = "info@trekroots.com";
export const CONTACT_EMAIL_HREF = `mailto:${CONTACT_EMAIL}`;


/** Digits only with country code — the format wa.me expects in its path. */
export const WHATSAPP_NUMBER = "916398286006";

/** E.164, for tel: links. */
export const PHONE_NUMBER = "+919193028668";

export const WHATSAPP_DISPLAY = "+91 63982 86006";
export const PHONE_DISPLAY = "+91 91930 28668";

export const PHONE_HREF = `tel:${PHONE_NUMBER}`;

/** Brand social profiles (canonical URLs — no share/tracking params). */
export const SOCIAL_INSTAGRAM = "https://www.instagram.com/trekroots.in";
export const SOCIAL_FACEBOOK = "https://www.facebook.com/share/1FSaNgaJZk/";
export const SOCIAL_YOUTUBE = "https://www.youtube.com/@trekroots";

/** Profiles used in Organization sameAs JSON-LD. */
export const SOCIAL_SAME_AS = [
  SOCIAL_INSTAGRAM,
  SOCIAL_FACEBOOK,
  SOCIAL_YOUTUBE,
] as const;

/** Builds a wa.me link with the enquiry message pre-filled. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
