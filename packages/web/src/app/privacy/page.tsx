import type { Metadata } from 'next';
import { PrivacyContent } from './PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy — FormatCase',
  description:
    'Official FormatCase Privacy Policy. FormatCase operates 100% client-side in your web browser with zero tracking, zero telemetry, and zero remote data storage.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://formatcase.netlify.app/privacy',
  },
  openGraph: {
    type: 'article',
    url: 'https://formatcase.netlify.app/privacy',
    title: 'Privacy Policy — FormatCase',
    description:
      'Official FormatCase Privacy Policy. FormatCase operates 100% client-side in your web browser with zero tracking, zero telemetry, and zero remote data storage.',
    images: ['https://formatcase.netlify.app/og-image.png'],
    siteName: 'FormatCase',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — FormatCase',
    description:
      'Official FormatCase Privacy Policy. FormatCase operates 100% client-side in your web browser with zero tracking, zero telemetry, and zero remote data storage.',
    images: ['https://formatcase.netlify.app/og-image.png'],
  },
};

const privacyStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://formatcase.netlify.app/privacy',
      url: 'https://formatcase.netlify.app/privacy',
      name: 'Privacy Policy — FormatCase',
      description:
        'Official FormatCase Privacy Policy. FormatCase operates 100% client-side in your web browser with zero tracking, zero telemetry, and zero remote data storage.',
      isPartOf: {
        '@type': 'WebSite',
        name: 'FormatCase',
        url: 'https://formatcase.netlify.app/',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://formatcase.netlify.app/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Privacy Policy',
          item: 'https://formatcase.netlify.app/privacy',
        },
      ],
    },
  ],
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyStructuredData) }}
      />
      <PrivacyContent />
    </>
  );
}
