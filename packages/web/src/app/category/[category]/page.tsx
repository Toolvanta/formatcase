import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  CATEGORIES,
  getToolsByCategory,
  CategoryInfo,
} from '../../../utils/toolRegistry';
import { CategoryPageClient } from './CategoryPageClient';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return [
    { category: 'developer' },
    { category: 'natural' },
    { category: 'utility' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: catParam } = await params;
  const category = (CATEGORIES as Record<string, CategoryInfo>)[catParam];

  if (!category) {
    return {
      title: 'Category Not Found — FormatCase',
    };
  }

  const canonicalUrl = `https://formatcase.netlify.app/category/${category.slug}`;

  return {
    title: `${category.title} | FormatCase`,
    description: category.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: `${category.title} | FormatCase`,
      description: category.description,
      images: ['https://formatcase.netlify.app/og-image.png'],
      siteName: 'FormatCase',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.title} | FormatCase`,
      description: category.description,
      images: ['https://formatcase.netlify.app/og-image.png'],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: catParam } = await params;
  const category = (CATEGORIES as Record<string, CategoryInfo>)[catParam];

  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(category.id);

  const categoryJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `https://formatcase.netlify.app/category/${category.slug}#category`,
        url: `https://formatcase.netlify.app/category/${category.slug}`,
        name: category.name,
        description: category.description,
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
            name: 'Tools',
            item: 'https://formatcase.netlify.app/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: category.name,
            item: `https://formatcase.netlify.app/category/${category.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
      />
      <CategoryPageClient category={category} tools={tools} />
    </>
  );
}
