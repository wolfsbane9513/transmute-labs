import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Transmute Labs - AI-Powered Business Transformation',
  description: 'Enterprise AI consulting delivering measurable results. 12+ years experience, $180K+ savings delivered. Intelligent automation, predictive analytics, full-stack AI platforms.',
  openGraph: {
    title: 'Transmute Labs - AI-Powered Business Transformation',
    description: 'Enterprise AI consulting delivering measurable results.',
    url: 'https://www.transmutelabs.in',
    siteName: 'Transmute Labs',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transmute Labs - AI-Powered Business Transformation',
    description: 'Enterprise AI consulting delivering measurable results.',
  },
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent-amber focus:text-deep focus:rounded-lg focus:font-medium"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
