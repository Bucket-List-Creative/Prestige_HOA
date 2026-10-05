'use server'

import { verifyCaptcha } from '@/lib/captcha'
import { HONEYPOT, type FormState } from '@/lib/form-state'
import { submitToJotform, type JotformAnswer } from '@/lib/jotform'

/** "Prestige HOA – Title Company Request" in Jotform. */
const TITLE_FORM_ID = '262775563074061'

/** Website field id (from Sanity) → Jotform question id. */
const TITLE_FIELDS: Record<string, string> = {
  'tc-company': '2',
  'tc-file': '3',
  'tc-contact': '4',
  'tc-email': '5',
  'tc-phone': '6',
  'tc-address': '7',
  'tc-owner': '8',
  'tc-buyer': '9',
  'tc-closing': '10',
  'tc-request': '11',
  'tc-notes': '12',
}
const TITLE_REQUIRED = ['tc-company', 'tc-contact', 'tc-email', 'tc-address']

/** "Prestige HOA – Concierge Contact" in Jotform. */
const CONTACT_FORM_ID = '262775174789072'

/** Radio values on the site → the option labels in Jotform. */
const AUDIENCE_LABELS: Record<string, string> = {
  homeowner: 'Homeowner',
  title: 'Title Company',
  general: 'General Inquiry',
}

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
    return { status: 'error', message: 'Please complete the CAPTCHA and try again.' }
  }
  return null
}

const failed: FormState = {
  status: 'error',
  message:
    'Something went wrong sending your request. Please try again, or call us directly.',
}

export async function submitTitleRequest(
  _prev: FormState,
  data: FormData
): Promise<FormState> {
  const blocked = await screen(data)
  if (blocked) return blocked

  if (TITLE_REQUIRED.some((key) => !text(data, key))) {
    return { status: 'error', message: 'Please fill in all required fields.' }
  }
  if (!isEmail(text(data, 'tc-email'))) {
    return { status: 'error', message: 'Please enter a valid email address.' }
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
    return failed
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
    return { status: 'error', message: 'Please fill in all required fields.' }
  }
  if (!isEmail(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
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
    return failed
  }
}
