/**
 * MedusaJS connection config.
 *
 * The storefront runs fully on local mock data out of the box. When you deploy
 * a Medusa v2 backend, set the env vars below and the data layer in
 * `lib/medusa/index.ts` will fetch from the real Store API instead.
 *
 *   NEXT_PUBLIC_MEDUSA_BACKEND_URL   e.g. https://api.lookkool.com
 *   NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY   pk_... from the Medusa admin
 *   NEXT_PUBLIC_MEDUSA_REGION_ID     (optional) the US sales region
 */
export const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "";

export const MEDUSA_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? "";

export const MEDUSA_REGION_ID =
  process.env.NEXT_PUBLIC_MEDUSA_REGION_ID ?? "";

/** True once a backend URL + publishable key are configured. */
export function isMedusaConfigured(): boolean {
  return Boolean(MEDUSA_BACKEND_URL && MEDUSA_PUBLISHABLE_KEY);
}
