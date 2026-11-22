import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllTools,
  getToolBySlug,
  generateToolMetadata,
  generateToolJsonLd,
} from '../../../utils/toolRegistry';
import { ToolPageClient } from './ToolPageClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool Not Found — FormatCase',
    };
  }

  return generateToolMetadata(tool);
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const jsonLd = generateToolJsonLd(tool);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolPageClient tool={tool} />
    </>
  );
}
