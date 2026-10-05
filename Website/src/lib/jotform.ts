/** A field answer: a plain value, or sub-fields such as a date's month/day/year. */
export type JotformAnswer = string | Record<string, string>

/**
 * Create a submission on a Jotform form through the REST API. `answers` is
 * keyed by question id (the number in the builder's "qN" field names).
 *
 * The API key never reaches the browser: forms post to a Server Action, which
 * calls this.
 */
export async function submitToJotform(
  formId: string,
  answers: Record<string, JotformAnswer>
) {
  const apiKey = process.env.JOTFORM_API_KEY
  if (!apiKey) throw new Error('JOTFORM_API_KEY is not set')

  const base = process.env.JOTFORM_API_BASE ?? 'https://api.jotform.com'

  const body = new URLSearchParams()
  for (const [qid, answer] of Object.entries(answers)) {
    if (typeof answer === 'string') {
      if (answer) body.append(`submission[${qid}]`, answer)
    } else {
      for (const [key, value] of Object.entries(answer)) {
        if (value) body.append(`submission[${qid}][${key}]`, value)
      }
    }
  }

  const res = await fetch(`${base}/form/${formId}/submissions`, {
    method: 'POST',
    headers: { APIKEY: apiKey },
    body,
    cache: 'no-store',
  })
  const json = (await res.json().catch(() => null)) as {
    responseCode?: number
    message?: string
  } | null

  if (!res.ok || json?.responseCode !== 200) {
    throw new Error(
      `Jotform rejected the submission (${res.status}): ${json?.message ?? 'no message'}`
    )
  }
}
