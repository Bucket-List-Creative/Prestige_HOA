'use server'

import { verifyCaptcha } from '@/lib/captcha'
import { HONEYPOT, type FormState } from '@/lib/form-state'
import { submitToJotform, type JotformAnswer } from '@/lib/jotform'
import { AUDIENCE_LABELS, TITLE_FIELDS, TITLE_REQUIRED } from '@/lib/jotform-fields'
import { getSiteContent } from '@/sanity/lib/content'

/** "Prestige HOA – Title Company Request" in Jotform. */
const TITLE_FORM_ID = '262775563074061'

/** "Prestige HOA – Concierge Contact" in Jotform. */
const CONTACT_FORM_ID = '262775174789072'

const MAX_LENGTH = 5000

/** Form fields that are plumbing rather than answers. */
const isInternal = (key: string) =>
  key.startsWith('$') ||
  key === HONEYPOT ||
  key === 'h-captcha-response' ||
  key === 'g-recaptcha-response'

const text = (data: FormData, key: string) => {
  const value = data.get(key)
  return typeof value === 'string' ? value.trim().slice(0, MAX_LENGTH) : ''
}

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

/** Shared guard: honeypot, then CAPTCHA. Returns a state to bail with, or null. */
async function screen(data: FormData): Promise<FormState | null> {
  // Pretend success so the bot learns nothing.
  if (text(data, HONEYPOT)) return { status: 'sent' }
  if (!(await verifyCaptcha(data.get('h-captcha-response')))) {
    return failure((await messages()).captcha)
  }
  return null
}

/** The editable error copy from Site settings → Form messages. */
const messages = async () => (await getSiteContent()).settings.formMessages

const failure = (message: string): FormState => ({ status: 'error', message })

export async function submitTitleRequest(
  _prev: FormState,
  data: FormData
): Promise<FormState> {
  const blocked = await screen(data)
  if (blocked) return blocked

  if (TITLE_REQUIRED.some((key) => !text(data, key))) {
    return failure((await messages()).required)
  }
  if (!isEmail(text(data, 'tc-email'))) {
    return failure((await messages()).invalidEmail)
  }

  const answers: Record<string, JotformAnswer> = {}
  // Fields added in the Studio have no Jotform question yet; keep them in Notes.
  const extras: string[] = []

  for (const key of new Set(data.keys())) {
    if (isInternal(key)) continue
    const value = text(data, key)
    if (!value) continue

    const qid = TITLE_FIELDS[key]
    if (!qid) {
      extras.push(`${key}: ${value}`)
    } else if (key === 'tc-closing') {
      const [year, month, day] = value.split('-')
      answers[qid] = { year, month, day }
    } else if (key === 'tc-phone') {
      answers[qid] = { full: value }
    } else {
      answers[qid] = value
    }
  }

  if (extras.length) {
    const notesQid = TITLE_FIELDS['tc-notes']
    const notes = typeof answers[notesQid] === 'string' ? answers[notesQid] : ''
    answers[notesQid] = [notes, ...extras].filter(Boolean).join('\n')
  }

  try {
    await submitToJotform(TITLE_FORM_ID, answers)
    return { status: 'sent' }
  } catch (error) {
    console.error('[forms] title request:', error)
    return failure((await messages()).failed)
  }
}

export async function submitContact(
  _prev: FormState,
  data: FormData
): Promise<FormState> {
  const blocked = await screen(data)
  if (blocked) return blocked

  const who = text(data, 'who')
  const name = text(data, 'name')
  const email = text(data, 'email')
  const message = text(data, 'message')

  if (!name || !email || !message) {
    return failure((await messages()).required)
  }
  if (!isEmail(email)) {
    return failure((await messages()).invalidEmail)
  }

  try {
    await submitToJotform(CONTACT_FORM_ID, {
      '2': AUDIENCE_LABELS[who] ?? who,
      '3': name,
      '4': email,
      '5': text(data, 'property'),
      '6': message,
    })
    return { status: 'sent' }
  } catch (error) {
    console.error('[forms] contact:', error)
    return failure((await messages()).failed)
  }
}
