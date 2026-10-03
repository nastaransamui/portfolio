import type { Metadata } from "next";
import localFont from "next/font/local";
const Roboto_Condensed_font = localFont({
  src: './fonts/RobotoCondensed-Variable.woff2',
  variable: '--font-roboto-condensed',
  display: 'swap',
  weight: '100 900',
})
import 'src/styles/bootstrap.min.css'
import 'src/styles/modal.css'
import 'src/styles/globals.css'
import 'src/styles/blue.css'
import { UIProvider } from "src/hooks/UIProvider";



export const metadata: Metadata = {
  metadataBase: new URL('https://mj-portfolio.duckdns.org'),
  title: {
    default: 'Majid Vezvaee | Frontend Engineer',
    template: '%s | Majid Vezvaee',
  },
  description: 'Portfolio of Majid Vezvaee, a frontend engineer building React, Next.js, TypeScript, Meteor, and Flutter applications.',
  applicationName: 'Majid Vezvaee Portfolio',
  authors: [{ name: 'Majid Vezvaee' }],
  creator: 'Majid Vezvaee',
  keywords: ['Majid Vezvaee', 'frontend engineer', 'React', 'Next.js', 'TypeScript', 'Meteor', 'Flutter'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Majid Vezvaee Portfolio',
    title: 'Majid Vezvaee | Frontend Engineer',
    description: 'Real healthcare, admin-platform, foundation, and monitoring projects built with modern web technologies.',
    images: [{
      url: '/img/projects/mj-portfolio.png',
      width: 1440,
      height: 900,
      alt: 'Majid Vezvaee portfolio preview',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Majid Vezvaee | Frontend Engineer',
    description: 'Real healthcare, admin-platform, foundation, and monitoring projects built with modern web technologies.',
    images: ['/img/projects/mj-portfolio.png'],
  },
  robots: { index: true, follow: true },
  other: { 'x-i18n-title-key': 'RootLayout.title' },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${Roboto_Condensed_font.variable}`} data-scroll-behavior="smooth"
    >
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </head>
      <body className={`dark bgimage ${Roboto_Condensed_font.className}`} style={{ margin: 0, minHeight: '100vh', width: '100%', overflow: 'hidden' }}>
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
