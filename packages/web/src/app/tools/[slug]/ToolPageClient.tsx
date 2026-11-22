'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Copy,
  Check,
  Zap,
  Sparkles,
  Layers,
  ArrowRight,
  Code2,
  Terminal,
  BookOpen,
  ChevronDown,
  ChevronRight,
  ClipboardPaste,
  Trash2,
  Share2,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { CommandPalette } from '../../../components/CommandPalette';
import { Toast, ToastMessage } from '../../../components/Toast';
import { useTheme } from '../../../hooks/useTheme';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useCaseConverter } from '../../../hooks/useCaseConverter';
import { FORMAT_DEFINITIONS } from '../../../utils/formatters';
import { ToolDefinition, getToolBySlug } from '../../../utils/toolRegistry';
import { computeTextStats, formatBytes } from '../../../utils/textUtils';

interface ToolPageClientProps {
  tool: ToolDefinition;
}

export const ToolPageClient: React.FC<ToolPageClientProps> = ({ tool }) => {
  const [input, setInput] = useState<string>('user account settings\nfirst name\napi auth token');
  const [batchMode, setBatchMode] = useLocalStorage<boolean>('formatcase_batch_mode', true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [copiedMain, setCopiedMain] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showOtherFormats, setShowOtherFormats] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { theme, isDark, toggleTheme, mounted } = useTheme();

  // Find corresponding formatter function
  const formatDef = useMemo(() => {
    return FORMAT_DEFINITIONS.find((f) => f.id === tool.id) || FORMAT_DEFINITIONS[0];
  }, [tool.id]);

  const { transform } = useCaseConverter(input, batchMode);

  // Compute primary output for this tool
  const primaryOutput = useMemo(() => {
    return transform(formatDef.fn);
  }, [transform, formatDef]);

  const stats = useMemo(() => computeTextStats(input), [input]);
  const outputStats = useMemo(() => computeTextStats(primaryOutput), [primaryOutput]);

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

  const handleCopyMain = (e: React.MouseEvent) => {
    if (!primaryOutput) return;

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    try {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { x, y },
        colors: ['#6366f1', '#a855f7', '#10b981', '#3b82f6'],
        disableForReducedMotion: true,
      });
    } catch {
      // safe fallback
    }

    navigator.clipboard.writeText(primaryOutput);
    setCopiedMain(true);
    addToast(`Copied ${tool.name} output to clipboard!`, 'success');
    setTimeout(() => setCopiedMain(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(tool.codeSnippet.code);
    setCopiedCode(true);
    addToast('Copied code snippet to clipboard!', 'info');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInput(text);
        addToast('Pasted content from clipboard');
        textareaRef.current?.focus();
      }
    } catch {
      addToast('Unable to read clipboard, check permissions', 'error');
    }
  };

  const relatedTools = useMemo(() => {
    return tool.relatedSlugs
      .map((slug) => getToolBySlug(slug))
      .filter((t): t is ToolDefinition => Boolean(t));
  }, [tool.relatedSlugs]);

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
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: tool.categoryLabel, href: `/category/${tool.categorySlug}` },
            { label: `${tool.name} Converter`, current: true },
          ]}
        />

        {/* Hero Section */}
        <header className="space-y-3 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {tool.categoryLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              100% In-Browser Privacy
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800/80">
              RFC &amp; Language Compliant
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50 leading-tight">
            {tool.name} Converter
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            {tool.summary}
          </p>
        </header>

        {/* Dedicated Focused Interactive Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Input Box */}
          <section
            aria-labelledby="input-workbench-heading"
            className="rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 id="input-workbench-heading" className="text-sm font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                <span>Input String / Text</span>
                {batchMode && (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    Batch Mode Active
                  </span>
                )}
              </h2>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-zinc-800">
                  {stats.lines} {stats.lines === 1 ? 'line' : 'lines'}
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-zinc-800">
                  {stats.words} words
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-zinc-800">
                  {stats.chars} chars
                </span>
              </div>
            </div>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Enter text to convert to ${tool.name}...`}
              aria-label={`Input text to convert to ${tool.name}`}
              rows={6}
              className="w-full p-4 rounded-2xl bg-slate-50/80 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-600 font-mono text-xs sm:text-sm leading-relaxed focus:outline-hidden focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-y min-h-[160px]"
            />

            {/* Input Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setBatchMode(!batchMode)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                    batchMode
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300'
                  }`}
                  title="Transform each line independently"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Batch Mode: {batchMode ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInput(tool.example)}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="Load sample text for this tool"
                >
                  Sample
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePaste}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ClipboardPaste className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Paste</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInput('')}
                  disabled={!input}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 dark:hover:border-rose-900/60 flex items-center gap-1.5 transition-colors disabled:opacity-40 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            </div>
          </section>

          {/* Dedicated Primary Output Box */}
          <section
            aria-labelledby="output-workbench-heading"
            className="rounded-3xl border border-indigo-200/90 dark:border-indigo-900/80 bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/30 dark:from-indigo-950/30 dark:via-zinc-900 dark:to-purple-950/20 p-5 sm:p-6 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-600 text-white shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <h2 id="output-workbench-heading" className="text-sm font-bold text-slate-900 dark:text-zinc-100">
                  {tool.name} Output
                </h2>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                <span className="px-2 py-0.5 rounded-lg bg-white/80 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700">
                  {outputStats.chars} chars
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-white/80 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700">
                  {formatBytes(outputStats.bytes)}
                </span>
              </div>
            </div>

            {/* Output Display Area */}
            <div className="relative rounded-2xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-4 font-mono text-xs sm:text-sm text-slate-900 dark:text-zinc-100 min-h-[160px] max-h-[320px] overflow-y-auto whitespace-pre-wrap break-all select-all leading-relaxed shadow-inner">
              {primaryOutput ? (
                primaryOutput
              ) : (
                <span className="text-slate-400 dark:text-zinc-600 italic select-none">
                  Transformed {tool.name} string will appear here in real-time...
                </span>
              )}
            </div>

            {/* Output Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={handleCopyMain}
                disabled={!primaryOutput}
                className="flex-1 min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {copiedMain ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy {tool.name}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (primaryOutput) {
                    setInput(primaryOutput);
                    addToast(`Replaced workbench with ${tool.name} output`, 'info');
                  }
                }}
                disabled={!primaryOutput}
                className="min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-medium border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40 cursor-pointer"
                title="Use this output as new input"
              >
                Use as Input
              </button>
            </div>
          </section>
        </div>

        {/* Collapsible: Preview Other 28 Formats */}
        <section className="rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs">
          <button
            type="button"
            onClick={() => setShowOtherFormats(!showOtherFormats)}
            className="w-full px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer text-left"
            aria-expanded={showOtherFormats}
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-zinc-100">
                  Preview in Other Casing Formats (28 Available)
                </span>
                <span className="ml-2 text-xs text-slate-500 dark:text-zinc-400 hidden sm:inline">
                  (Compare your current input with snake_case, PascalCase, Title Case, etc.)
                </span>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showOtherFormats ? 'rotate-180 text-indigo-600' : ''}`} />
          </button>

          {showOtherFormats && (
            <div className="p-5 sm:p-8 border-t border-slate-200/80 dark:border-zinc-800/80 bg-slate-50/40 dark:bg-zinc-950/40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FORMAT_DEFINITIONS.filter((f) => f.id !== tool.id).map((otherFmt) => {
                const output = transform(otherFmt.fn);
                return (
                  <div
                    key={otherFmt.id}
                    className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex flex-col justify-between space-y-2 shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-slate-800 dark:text-zinc-100 truncate">
                        {otherFmt.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(output);
                          addToast(`Copied ${otherFmt.name}`, 'success');
                        }}
                        disabled={!output}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-30 cursor-pointer"
                        title={`Copy ${otherFmt.name}`}
                        aria-label={`Copy ${otherFmt.name}`}
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="font-mono text-xs text-slate-700 dark:text-zinc-300 bg-slate-50 dark:bg-zinc-950 p-2.5 rounded-xl border border-slate-100 dark:border-zinc-800/80 truncate select-all">
                      {output || otherFmt.example}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Technical & Educational Documentation (Phase 3 SEO Requirements) */}
        <div className="space-y-8 sm:space-y-12">
          {/* Section 1: Overview & What is {tool.name}? */}
          <section className="rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 p-6 sm:p-8 md:p-10 shadow-xs space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-zinc-800/80">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
                What is {tool.name}?
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed">
              {tool.description}
            </p>

            {/* Supported Stacks Badges */}
            <div className="pt-2 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                Primary Languages &amp; Environments:
              </h3>
              <div className="flex flex-wrap gap-2">
                {tool.stacks.map((stack) => (
                  <span
                    key={stack}
                    className="px-3 py-1 rounded-xl text-xs font-medium bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700"
                  >
                    {stack}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Exact Rules & Specifications */}
          <section className="rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 p-6 sm:p-8 md:p-10 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
              {tool.name} Formatting Rules &amp; Syntax Specification
            </h2>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-zinc-300">
              {tool.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3: Step-by-Step Guide */}
          <section className="rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 p-6 sm:p-8 md:p-10 shadow-xs space-y-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
              How to Use the Online {tool.name} Converter
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tool.howToUse.map((step) => (
                <div
                  key={step.step}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200/80 dark:border-zinc-800 space-y-2"
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                    {step.step}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Code Implementation Snippet */}
          <section className="rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 p-6 sm:p-8 md:p-10 shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-3 pb-2">
              <div className="flex items-center gap-2.5">
                <Code2 className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-50">
                  {tool.codeSnippet.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-xl text-xs font-medium border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="p-4 sm:p-5 rounded-2xl bg-slate-950 text-indigo-200 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              <code>{tool.codeSnippet.code}</code>
            </pre>
          </section>

          {/* Section 5: Real-World Conversion Examples Table */}
          <section className="rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 p-6 sm:p-8 md:p-10 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
              Common {tool.name} Conversion Examples
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-zinc-800 text-slate-400 dark:text-zinc-500">
                    <th className="py-3 px-4 font-semibold">Raw Input</th>
                    <th className="py-3 px-4 font-semibold">{tool.name} Result</th>
                    <th className="py-3 px-4 font-semibold">Typical Use Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60 font-mono">
                  {tool.conversionTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-zinc-800/40 transition-colors">
                      <td className="py-3 px-4 text-slate-600 dark:text-zinc-400">{row.input}</td>
                      <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-bold">{row.output}</td>
                      <td className="py-3 px-4 font-sans text-slate-500 dark:text-zinc-400">{row.context}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 6: Features & Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-xs space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-zinc-50">
                Key Features
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
                {tool.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-xs space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-zinc-50">
                Benefits for Developers
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
                {tool.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Section 7: Frequently Asked Questions */}
          <section className="rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 p-6 sm:p-8 md:p-10 shadow-xs space-y-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
              Frequently Asked Questions about {tool.name}
            </h2>
            <div className="space-y-3">
              {tool.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/40 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/50 dark:hover:bg-zinc-900/50 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm font-bold text-slate-900 dark:text-zinc-100 pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-indigo-600' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed border-t border-slate-200/50 dark:border-zinc-800/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 8: Related Tools Internal Linking Grid */}
          {relatedTools.length > 0 && (
            <section className="rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 p-6 sm:p-8 md:p-10 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-zinc-800/80">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
                    Related Casing &amp; String Tools
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
                    Explore companion formats commonly paired with {tool.name}
                  </p>
                </div>
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <span>View All 29 Tools</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedTools.map((relTool) => (
                  <Link
                    key={relTool.slug}
                    href={`/tools/${relTool.slug}`}
                    className="p-5 rounded-2xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/40 hover:bg-white dark:hover:bg-zinc-800/60 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group flex flex-col justify-between space-y-3 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono text-sm font-bold text-slate-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {relTool.name}
                        </span>
                        <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                          {relTool.category === 'developer' ? 'Code' : relTool.category === 'natural' ? 'Text' : 'Web'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2">
                        {relTool.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                      <span>Open Tool</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        input={input}
        onApplyFormat={(fn, name) => {
          setInput(fn(input));
          addToast(`Applied ${name} in-place`, 'success');
        }}
        onNotifyCopy={addToast}
      />

      {/* Toast Feedback System */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      <Footer />
    </>
  );
};
