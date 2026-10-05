/** Shared by the form Server Actions and the client forms that call them. */
export type FormState = { status: 'idle' | 'sent' | 'error'; message?: string }

export const initialFormState: FormState = { status: 'idle' }

/** Hidden field real visitors never fill. A value means a bot. */
export const HONEYPOT = 'company_website'
