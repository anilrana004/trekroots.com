export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "w00xdoog";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
/** Keep hard-coded — bump intentionally when changing query shapes. */
export const apiVersion = "2025-09-18";

export function assertSanityConfig() {
  if (!projectId || !dataset) {
    throw new Error("Missing Sanity projectId or dataset configuration");
  }
}
