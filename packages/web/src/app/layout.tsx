import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import '../styles/app.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#4f46e5' },
    { media: '(prefers-color-scheme: dark)', color: '#090d16' },
  ],
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
};

export const metadata: Metadata = {
  title: 'FormatCase — Online Case Converter & Developer Text Utilities',
  description:
    'Free, instant, 100% private in-browser case formatter. Convert strings between camelCase, snake_case, kebab-case, PascalCase, Title Case, and 25+ formats with zero latency.',
  keywords: [
    'formatcase',
    'camelcase converter',
    'snake case online',
    'string case changer',
    'kebab case generator',
    'pascalcase converter',
    'text case tool',
    'screaming snake case',
    'developer utilities',
  ],
  authors: [{ name: 'Shoaib M. Arif' }],
  creator: 'Shoaib M. Arif',
  metadataBase: new URL('https://formatcase.netlify.app'),
  alternates: {
    canonical: 'https://formatcase.netlify.app/',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    url: 'https://formatcase.netlify.app/',
    siteName: 'FormatCase',
    locale: 'en_US',
    title: 'FormatCase — Online Case Converter & Developer Text Utilities',
    description:
      'Free, instant, 100% private in-browser case formatter. Convert strings between camelCase, snake_case, kebab-case, PascalCase, Title Case, and 25+ formats with zero latency.',
    images: [
      {
        url: 'https://formatcase.netlify.app/og-image.png',
        width: 1400,
        height: 560,
        alt: 'FormatCase - Instant Case Converter and Text Utility',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FormatCase — Online Case Converter & Developer Text Utilities',
    description:
      'Free, instant, 100% private in-browser case formatter. Convert strings between camelCase, snake_case, kebab-case, PascalCase, Title Case, and 25+ formats with zero latency.',
    images: ['https://formatcase.netlify.app/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://formatcase.netlify.app/#webapp',
      name: 'FormatCase',
      url: 'https://formatcase.netlify.app/',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Runs 100% offline in-browser.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description:
        'Instant online text and code case formatter. Convert text between camelCase, snake_case, kebab-case, PascalCase, Title Case, and 25+ formats entirely client-side with zero latency.',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://formatcase.netlify.app/#website',
      name: 'FormatCase',
      alternateName: [
        'Format Case',
        'FormatCase App',
        'FormatCase Online',
        'formatcase.netlify.app',
      ],
      url: 'https://formatcase.netlify.app/',
      inLanguage: 'en-US',
      description:
        'Free, instant, 100% private in-browser case formatter and string conversion utility for developers and writers.',
    },
    {
      '@type': 'Organization',
      '@id': 'https://formatcase.netlify.app/#organization',
      name: 'FormatCase',
      url: 'https://formatcase.netlify.app/',
      logo: 'https://formatcase.netlify.app/favicon-48x48.png',
      sameAs: [
        'https://github.com/shoaibmarif',
        'https://www.linkedin.com/in/shoaibmarif/',
        'https://chromewebstore.google.com/detail/FormatCase%20-%20Case%20Converter%20%26%20Text%20Utility/dfpjcekelcakndmpffpiemmpjbgpnipp',
      ],
    },
  ],
};

const themeInitScript = `
  (function() {
    try {
      var stored = localStorage.getItem('omnicase_theme');
      var theme = stored ? JSON.parse(stored) : 'system';
      var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200 selection:bg-indigo-500 selection:text-white">
        {children}

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-064DDMYD9P"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-064DDMYD9P');
          `}
        </Script>
      </body>
    </html>
  );
}
