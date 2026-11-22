import type { Metadata } from 'next';
import { ToolsDirectoryClient } from './ToolsDirectoryClient';

export const metadata: Metadata = {
  title: 'All Case Converters & String Utilities — FormatCase Tools Directory',
  description:
    'Complete directory of all 29+ free online case converters and text utilities. Transform strings between camelCase, snake_case, PascalCase, kebab-case, Title Case, and more.',
  keywords: [
    'case converter directory',
    'all case tools',
    'camelcase converter',
    'snake case tool',
    'pascal case online',
    'kebab case generator',
    'string utilities directory',
  ],
  alternates: {
    canonical: 'https://formatcase.netlify.app/tools',
  },
  openGraph: {
    type: 'website',
    url: 'https://formatcase.netlify.app/tools',
    title: 'All Case Converters & String Utilities — FormatCase Tools Directory',
    description:
      'Complete directory of all 29+ free online case converters and text utilities. Transform strings between camelCase, snake_case, PascalCase, kebab-case, Title Case, and more.',
    images: ['https://formatcase.netlify.app/og-image.png'],
    siteName: 'FormatCase',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Case Converters & String Utilities — FormatCase Tools Directory',
    description:
      'Complete directory of all 29+ free online case converters and text utilities. Transform strings between camelCase, snake_case, PascalCase, kebab-case, Title Case, and more.',
    images: ['https://formatcase.netlify.app/og-image.png'],
  },
};

const directoryStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://formatcase.netlify.app/tools#directory',
      url: 'https://formatcase.netlify.app/tools',
      name: 'All Case Converters & String Utilities',
      description:
        'Complete directory of all 29+ free online case converters and text utilities. Transform strings between camelCase, snake_case, PascalCase, kebab-case, Title Case, and more.',
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
          name: 'Tools Directory',
          item: 'https://formatcase.netlify.app/tools',
        },
      ],
    },
  ],
};

export default function ToolsDirectoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(directoryStructuredData) }}
      />
      <ToolsDirectoryClient />
    </>
  );
}
