'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Sparkles, ArrowRight, Layers, Code, FileText, Globe } from 'lucide-react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CommandPalette } from '../../components/CommandPalette';
import { Toast, ToastMessage } from '../../components/Toast';
import { useTheme } from '../../hooks/useTheme';
import { getAllTools, getAllCategories, ToolDefinition } from '../../utils/toolRegistry';

export const ToolsDirectoryClient: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'developer' | 'natural' | 'utility'>('all');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const { theme, isDark, toggleTheme, mounted } = useTheme();
  const allTools = useMemo(() => getAllTools(), []);
  const categories = useMemo(() => getAllCategories(), []);

  const filteredTools = useMemo(() => {
    return allTools.filter((tool) => {
      if (activeCategory !== 'all' && tool.category !== activeCategory) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          tool.name.toLowerCase().includes(q) ||
          tool.summary.toLowerCase().includes(q) ||
          tool.primaryKeyword.toLowerCase().includes(q) ||
          tool.secondaryKeywords.some((k) => k.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [allTools, activeCategory, search]);

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
        <Breadcrumbs items={[{ label: 'Tools Directory', current: true }]} />

        {/* Directory Header */}
        <header className="space-y-3 pt-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <Layers className="w-3.5 h-3.5" />
            <span>29 Specialized Text Converters</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50 leading-tight">
            All Case Converters &amp; Developer String Utilities
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            Browse our complete directory of developer and editorial text transformation tools. Each converter operates 100% in-browser with zero latency, complete privacy, and dedicated documentation.
          </p>
        </header>

        {/* Category Spotlight Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="p-5 rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all group flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                    {cat.id === 'developer' ? (
                      <Code className="w-4 h-4" />
                    ) : cat.id === 'natural' ? (
                      <FileText className="w-4 h-4" />
                    ) : (
                      <Globe className="w-4 h-4" />
                    )}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
                    {cat.toolCount} Tools
                  </span>
                </div>
                <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {cat.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                <span>View Category</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </section>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-zinc-800/80">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800'
              }`}
            >
              All Tools (29)
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('developer')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeCategory === 'developer'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800'
              }`}
            >
              Code &amp; Variables (21)
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('natural')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeCategory === 'natural'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800'
              }`}
            >
              Text &amp; Titles (7)
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('utility')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeCategory === 'utility'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800'
              }`}
            >
              Web &amp; URLs (1)
            </button>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or keyword..."
              aria-label="Filter case converters"
              className="w-full pl-10 pr-8 py-2 rounded-2xl text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Tools Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="p-6 rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-mono text-base font-bold text-slate-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                    {tool.name}
                  </h2>
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
        </section>

        {filteredTools.length === 0 && (
          <div className="text-center py-16 space-y-2">
            <p className="text-base font-bold text-slate-700 dark:text-zinc-300">
              No matching tools found for &quot;{search}&quot;
            </p>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Try searching for &quot;camel&quot;, &quot;snake&quot;, &quot;title&quot;, or &quot;slug&quot;.
            </p>
          </div>
        )}
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
