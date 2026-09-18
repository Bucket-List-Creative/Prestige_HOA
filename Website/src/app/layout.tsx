import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'

import { Motion } from '@/components/Motion'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { getSiteContent } from '@/sanity/lib/content'
import { SanityLive } from '@/sanity/lib/live'

import './globals.css'

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['300', '400', '600', '800'],
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteContent()
  const name = `${settings.brandPrimary} ${settings.brandSecondary}`
  return {
    title: { default: name, template: `%s | ${name}` },
    description: settings.tagline,
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { settings } = await getSiteContent()

  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <SiteHeader settings={settings} />
          {children}
          <SiteFooter settings={settings} />
        </div>
        <Motion />
        <SanityLive />
      </body>
    </html>
  )
}
