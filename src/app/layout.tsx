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
  title: "Majid Vezvaee",
  description: "Majid vezvaee portfolio frontend developer",
  other: { 'X-UA-Compatible': 'IE=edge', 'x-i18n-title-key': 'RootLayout.title' },
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
