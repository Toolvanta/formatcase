import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InputWorkbench } from './components/InputWorkbench';
import { PreviewGrid } from './components/PreviewGrid';
import { UtilityPanel } from './components/UtilityPanel';
import { CommandPalette } from './components/CommandPalette';
import { SeoContent } from './components/SeoContent';
import { Toast, ToastMessage } from './components/Toast';
import { NotFound } from './components/NotFound';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { useCaseConverter } from './hooks/useCaseConverter';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { SamplePreset } from './utils/textUtils';

export default function App() {
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

  const { theme, isDark, toggleTheme } = useTheme();
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
      // Filter out duplicate active toasts with the exact same message to avoid stacking
      const deduplicated = prev.filter((t) => t.message !== message);
      // Keep only the most recent 2, then append the new one (maximum 3 total)
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

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isPrivacyRoute =
    pathname === '/privacy' ||
    pathname === '/privacy/' ||
    pathname === '/privacy.html';

  const isKnownRoute =
    pathname === '/' ||
    pathname === '' ||
    isPrivacyRoute;

  if (!isKnownRoute) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200 selection:bg-indigo-500 selection:text-white">
        <Header
          theme={theme}
          isDark={isDark}
          onThemeToggle={toggleTheme}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
          <NotFound />
        </main>
      </div>
    );
  }

  if (isPrivacyRoute) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200 selection:bg-indigo-500 selection:text-white">
        <Header
          theme={theme}
          isDark={isDark}
          onThemeToggle={toggleTheme}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full">
          <PrivacyPolicy />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200 selection:bg-indigo-500 selection:text-white">
      {/* Navbar Header */}
      <Header
        theme={theme}
        isDark={isDark}
        onThemeToggle={toggleTheme}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Container with Generous Breathing Space */}
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

      {/* Footer with Breathing Space */}
      <footer className="border-t border-slate-200/90 dark:border-zinc-800/90 py-10 sm:py-16 mt-20 sm:mt-28 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-sm transition-colors overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 w-full md:w-auto">
            <a
              href="https://formatcase.netlify.app/"
              className="flex items-center gap-2.5 font-bold text-base text-slate-800 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center text-xs shadow-xs shrink-0">
                aA
              </div>
              <span>FormatCase</span>
            </a>
            <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm">
              Free, instant, 100% private in-browser case formatter &amp; text utility. Zero data leaves your device.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3 sm:gap-4 text-xs text-slate-600 dark:text-zinc-400 w-full md:w-auto">
            <span className="font-medium text-slate-700 dark:text-zinc-300 text-center">
              Created by <span className="font-semibold text-slate-900 dark:text-zinc-100">Shoaib M. Arif</span>
            </span>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-full">
              <a
                href="https://github.com/shoaibmarif"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-2xs shrink-0"
                title="Shoaib M. Arif on GitHub"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/shoaibmarif/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-[#0a66c2] dark:hover:text-[#0a66c2] transition-all shadow-2xs shrink-0"
                title="Shoaib M. Arif on LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.66 1.66 0 0 0-1.67 1.66 1.67 1.67 0 0 0 1.67 1.68 1.67 1.67 0 0 0 1.68-1.68c0-.92-.76-1.66-1.68-1.66Z" />
                </svg>
                <span>LinkedIn</span>
              </a>

              <a
                href="https://chromewebstore.google.com/detail/FormatCase%20-%20Case%20Converter%20%26%20Text%20Utility/dfpjcekelcakndmpffpiemmpjbgpnipp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-all font-medium shadow-2xs shrink-0"
                title="FormatCase on Chrome Web Store"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="21.17" y1="8" x2="12" y2="8" />
                  <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
                  <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
                </svg>
                <span>Extension</span>
              </a>

              <a
                href="/privacy"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-2xs shrink-0"
                title="Privacy Policy"
              >
                <span>Privacy</span>
              </a>

            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
