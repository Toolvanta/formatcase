'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { InputWorkbench } from '../components/InputWorkbench';
import { PreviewGrid } from '../components/PreviewGrid';
import { UtilityPanel } from '../components/UtilityPanel';
import { CommandPalette } from '../components/CommandPalette';
import { SeoContent } from '../components/SeoContent';
import { Toast, ToastMessage } from '../components/Toast';
import { Footer } from '../components/Footer';
import { useCaseConverter } from '../hooks/useCaseConverter';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTheme } from '../hooks/useTheme';
import { SamplePreset } from '../utils/textUtils';

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://formatcase.netlify.app/#faq',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why are there so many different casing styles anyway?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Most programming languages and computer systems don't allow spaces in variable names, database columns, or URLs. To keep multi-word names readable without spaces, different communities settled on their own conventions. Web developers went with camelCase, Python programmers chose snake_case, and URLs adopted kebab-case.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between camelCase and PascalCase?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "It all comes down to the very first letter. With camelCase, you start with a lowercase letter (e.g. userProfile). With PascalCase, you capitalize from the very beginning (e.g. UserProfile). If you're building a React app, you use camelCase for your functions and variables, but PascalCase for your component names.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is my text private? Does anything get sent over the internet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Zero. Nothing leaves your device. FormatCase runs 100% inside your web browser's memory. You could disconnect your internet right now, and the tool will continue working with zero issues. We don't save your text, we don't have a backend server reading your data, and we don't track what you paste.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does this tool handle tricky acronyms like XML or HTTP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Simple converters break words on every single capital letter, which turns HTTP into h_t_t_p. We built smart word-boundary detection that recognizes when uppercase letters belong together as an acronym. So parseHTTPResponse becomes parse_http_response like you would expect in clean code.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does Batch Mode do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If you have a whole list of items (like 20 database columns, a list of filenames, or environment variables), turn Batch Mode on. It converts each line on its own rather than mashing the whole block into a single sentence.',
      },
    },
  ],
};

export default function HomePage() {
  const [input, setInput] = useState<string>(
    'welcome to formatcase\nuser account settings\nthe quick brown fox jumps'
  );
  const [previousInput, setPreviousInput] = useState<string | null>(null);
  const [batchMode, setBatchMode] = useLocalStorage<boolean>('formatcase_batch_mode', true);
  const [favorites, setFavorites] = useLocalStorage<string[]>('formatcase_favorites', [
    'camel',
    'pascal',
    'snake',
    'screaming_snake',
    'kebab',
  ]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const { theme, isDark, toggleTheme, mounted } = useTheme();
  const { transform } = useCaseConverter(input, batchMode);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => {
      const deduplicated = prev.filter((t) => t.message !== message);
      const trimmed = deduplicated.slice(-2);
      return [...trimmed, { id, message, type }];
    });
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2400);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateInput = (newVal: string, actionName?: string) => {
    setPreviousInput(input);
    setInput(newVal);
    if (actionName) {
      addToast(actionName, 'info');
    }
  };

  const handleApplyFormat = (formatter: (val: string) => string, name: string) => {
    if (!input) return;
    setPreviousInput(input);
    if (batchMode) {
      const transformed = input
        .split('\n')
        .map((line) => (line.length > 0 ? formatter(line) : ''))
        .join('\n');
      setInput(transformed);
    } else {
      setInput(formatter(input));
    }
    addToast(`Applied ${name} in-place`, 'success');
  };

  const handleReplaceInput = (val: string, formatName: string) => {
    setPreviousInput(input);
    setInput(val);
    addToast(`Replaced workbench with ${formatName} output`, 'info');
  };

  const handleRestorePrevious = () => {
    if (previousInput !== null) {
      const temp = input;
      setInput(previousInput);
      setPreviousInput(temp);
      addToast('Reverted input to previous state', 'info');
    }
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const handleLoadPreset = (preset: SamplePreset) => {
    setPreviousInput(input);
    setInput(preset.text);
    addToast(`Loaded ${preset.label} sample`, 'info');
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <Header
        theme={theme}
        isDark={isDark}
        mounted={mounted}
        onThemeToggle={toggleTheme}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 flex-1 w-full space-y-8 sm:space-y-12 md:space-y-16 overflow-hidden">
        {/* Primary Semantic H1 & Value Proposition */}
        <section className="text-center md:text-left space-y-2 pt-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50 leading-tight">
            Online Case Converter &amp; Developer Text Utilities
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            Instantly convert strings between camelCase, snake_case, PascalCase, kebab-case, and 25+ formats in real time. 100% private, client-side, and running entirely inside your web browser.
          </p>
        </section>

        {/* Chrome Extension Live Announcement Banner */}
        <div className="rounded-2xl border border-indigo-200/80 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/70 via-white to-purple-50/70 dark:from-indigo-950/40 dark:via-zinc-900/60 dark:to-purple-950/30 p-3 sm:p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
                <line x1="21.17" y1="8" x2="12" y2="8" />
                <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
                <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-zinc-100">
                  FormatCase Chrome Extension is Live!
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Chrome Web Store
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-zinc-400">
                Transform text anywhere on the web instantly with the right-click context menu.
              </p>
            </div>
          </div>

          <a
            href="https://chromewebstore.google.com/detail/FormatCase%20-%20Case%20Converter%20%26%20Text%20Utility/dfpjcekelcakndmpffpiemmpjbgpnipp"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition-all shadow-xs hover:shadow-sm"
          >
            <span>Add to Chrome</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        {/* Input Workbench */}
        <InputWorkbench
          input={input}
          onChangeInput={setInput}
          batchMode={batchMode}
          onToggleBatchMode={() => setBatchMode(!batchMode)}
          onApplyFormat={handleApplyFormat}
          onLoadPreset={handleLoadPreset}
          onNotifyCopy={addToast}
          previousInput={previousInput}
          onRestorePrevious={handleRestorePrevious}
        />

        {/* Advanced Delimiter & Utilities Panel */}
        <UtilityPanel input={input} onUpdateInput={handleUpdateInput} />

        {/* Real-time Formats Preview Grid */}
        <PreviewGrid
          transform={transform}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onReplaceInput={handleReplaceInput}
          onNotifyCopy={addToast}
        />

        {/* SEO Semantic Cheatsheet & Conventions Guide */}
        <SeoContent onNotifyCopy={addToast} />
      </main>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        input={input}
        onApplyFormat={handleApplyFormat}
        onNotifyCopy={addToast}
      />

      {/* Toast Feedback System */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Global Footer */}
      <Footer />
    </>
  );
}
