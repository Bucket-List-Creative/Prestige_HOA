/**
 * Verify an hCaptcha token (the same provider Jotform uses). Jotform's own
 * CAPTCHA only renders on jotform.com, so the site runs its own widget and
 * checks it here before anything is forwarded.
 *
 * Without `HCAPTCHA_SECRET_KEY` the check is skipped, so local development
 * works before keys exist. The widget is hidden in that case too.
 */
export async function verifyCaptcha(token: FormDataEntryValue | null) {
  const secret = process.env.HCAPTCHA_SECRET_KEY
  if (!secret) return true
  if (typeof token !== 'string' || !token) return false

  const res = await fetch('https://api.hcaptcha.com/siteverify', {
    method: 'POST',
    body: new URLSearchParams({
      secret,
      response: token,
      ...(process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY
        ? { sitekey: process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY }
        : {}),
    }),
    cache: 'no-store',
  })
  const json = (await res.json().catch(() => null)) as { success?: boolean } | null
  return json?.success === true
}
