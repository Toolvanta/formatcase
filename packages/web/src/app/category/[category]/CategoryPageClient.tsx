'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Layers, Code, FileText, Globe } from 'lucide-react';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { CommandPalette } from '../../../components/CommandPalette';
import { Toast, ToastMessage } from '../../../components/Toast';
import { useTheme } from '../../../hooks/useTheme';
import { CategoryInfo, ToolDefinition, getAllCategories } from '../../../utils/toolRegistry';

interface CategoryPageClientProps {
  category: CategoryInfo;
  tools: ToolDefinition[];
}

export const CategoryPageClient: React.FC<CategoryPageClientProps> = ({ category, tools }) => {
  const { theme, isDark, toggleTheme, mounted } = useTheme();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const otherCategories = getAllCategories().filter((c) => c.id !== category.id);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev.slice(-2), { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2400);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      <Header
        theme={theme}
        isDark={isDark}
        mounted={mounted}
        onThemeToggle={toggleTheme}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-12 flex-1 w-full space-y-8 sm:space-y-12">
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: category.name, current: true },
          ]}
        />

        {/* Category Header */}
        <header className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              {category.id === 'developer' ? (
                <Code className="w-5 h-5" />
              ) : category.id === 'natural' ? (
                <FileText className="w-5 h-5" />
              ) : (
                <Globe className="w-5 h-5" />
              )}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {category.toolCount} Converters Available
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50 leading-tight">
            {category.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            {category.longDescription}
          </p>
        </header>

        {/* Tools in Category Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-zinc-800/80">
            <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
              {category.name} Tools ({tools.length})
            </h2>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>View All 29 Tools</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="p-6 rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all group flex flex-col justify-between space-y-4 shadow-2xs"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-mono text-base font-bold text-slate-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                      {tool.name}
                    </h3>
                    <span className="text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                      {tool.category === 'developer' ? 'Code' : tool.category === 'natural' ? 'Text' : 'Web'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {tool.summary}
                  </p>

                  <div className="font-mono text-xs text-slate-700 dark:text-zinc-300 bg-slate-50 dark:bg-zinc-950/80 p-2.5 rounded-xl border border-slate-100 dark:border-zinc-800 truncate">
                    <span className="text-slate-400 select-none">Ex: </span>
                    {tool.example}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-zinc-800/60 text-xs">
                  <span className="text-slate-400 dark:text-zinc-500">100% In-Browser</span>
                  <div className="flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                    <span>Open Converter</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Other Categories Links */}
        <section className="pt-6 border-t border-slate-200/80 dark:border-zinc-800/80 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
            Explore Other Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherCategories.map((otherCat) => (
              <Link
                key={otherCat.id}
                href={`/category/${otherCat.slug}`}
                className="p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex items-center justify-between group shadow-2xs"
              >
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {otherCat.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    {otherCat.toolCount} converters
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        input=""
        onApplyFormat={() => {}}
        onNotifyCopy={addToast}
      />

      <Toast toasts={toasts} onDismiss={dismissToast} />
      <Footer />
    </>
  );
};
