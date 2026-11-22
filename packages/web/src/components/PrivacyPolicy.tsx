'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="space-y-8 pb-16">
      {/* Back Button & Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-medium transition-all shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-medium px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80">
          <Shield className="w-3.5 h-3.5" />
          <span>Official Policy</span>
        </div>
      </div>

      {/* Header */}
      <header className="space-y-2 border-b border-slate-200 dark:border-zinc-800 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
          Last updated: September 2026 • Applies to FormatCase Web &amp;{' '}
          <a
            href="https://chromewebstore.google.com/detail/FormatCase%20-%20Case%20Converter%20%26%20Text%20Utility/dfpjcekelcakndmpffpiemmpjbgpnipp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 underline hover:no-underline"
          >
            Chrome Extension
          </a>
        </p>
      </header>

      {/* Section 1 */}
      <section className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-6 sm:p-8 space-y-4 shadow-2xs">
        <div className="flex items-center gap-2.5 text-slate-900 dark:text-zinc-100 font-bold text-lg border-b border-slate-100 dark:border-zinc-800/80 pb-3">
          <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2>1. Overview &amp; Single Purpose</h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
          <strong>FormatCase</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;the extension&quot;) is a developer productivity utility designed to transform text strings between 25+ casing conventions (such as <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-xs font-mono text-indigo-600 dark:text-indigo-300">camelCase</code>, <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-xs font-mono text-indigo-600 dark:text-indigo-300">snake_case</code>, <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-xs font-mono text-indigo-600 dark:text-indigo-300">PascalCase</code>, <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-xs font-mono text-indigo-600 dark:text-indigo-300">kebab-case</code>, and <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-xs font-mono text-indigo-600 dark:text-indigo-300">Title Case</code>).
        </p>
        <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
          We are firmly committed to user privacy. We do not collect, store, transmit, process, or sell any personal data, keystrokes, or text inputs.
        </p>
      </section>

      {/* Section 2 */}
      <section className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-6 sm:p-8 space-y-4 shadow-2xs">
        <div className="flex items-center gap-2.5 text-slate-900 dark:text-zinc-100 font-bold text-lg border-b border-slate-100 dark:border-zinc-800/80 pb-3">
          <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2>2. Zero Data Collection Guarantee</h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
          FormatCase is built on a <strong>100% Client-Side Architecture</strong>:
        </p>
        <ul className="space-y-2.5 text-sm text-slate-600 dark:text-zinc-300">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span><strong>No Network Transmission:</strong> The text you format never leaves your web browser. All transformations are performed strictly in local memory using our in-browser algorithm.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span><strong>No Analytics or Tracking:</strong> The Chrome extension contains zero tracking pixels, telemetry, or third-party analytical scripts.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span><strong>No Personal Identifiers:</strong> We do not ask for or collect names, email addresses, IP addresses, browsing histories, or location data.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span><strong>No Remote Storage or Cloud Sync:</strong> We operate no remote databases or logging endpoints. Your inputs vanish when you close your browser tab or extension popup.</span>
          </li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-6 sm:p-8 space-y-4 shadow-2xs">
        <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-100 border-b border-slate-100 dark:border-zinc-800/80 pb-3">
          3. Browser Permissions &amp; Chrome Extension Justifications
        </h2>
        <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
          The FormatCase Chrome Extension requests only the minimum permissions required to perform its single purpose:
        </p>
        <div className="space-y-3 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/80 dark:border-zinc-800">
            <h3 className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
              contextMenus
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
              Enables right-click formatting shortcuts directly on highlighted text anywhere on the web (e.g., &quot;Convert to camelCase&quot; or &quot;Convert to snake_case&quot;).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/80 dark:border-zinc-800">
            <h3 className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
              clipboardWrite
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
              Allows the extension to write transformed text directly to your system clipboard when clicked, eliminating manual copy-pasting.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/80 dark:border-zinc-800">
            <h3 className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
              storage (Local Only)
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
              Saves user interface preferences locally on your machine (such as favorite pinned casing formats and batch mode state). This data never leaves your browser profile.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-6 sm:p-8 space-y-4 shadow-2xs">
        <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-100 border-b border-slate-100 dark:border-zinc-800/80 pb-3">
          4. Contact &amp; Developer Information
        </h2>
        <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
          If you have questions about this privacy policy or the internal architecture of FormatCase, contact the developer:
        </p>
        <div className="pt-2 text-xs text-slate-600 dark:text-zinc-300 space-y-1">
          <p><strong>Developer:</strong> Shoaib M. Arif</p>
          <p>
            <strong>GitHub:</strong>{' '}
            <a
              href="https://github.com/shoaibmarif"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 underline hover:no-underline"
            >
              https://github.com/shoaibmarif
            </a>
          </p>
          <p>
            <strong>LinkedIn:</strong>{' '}
            <a
              href="https://www.linkedin.com/in/shoaibmarif/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 underline hover:no-underline"
            >
              https://www.linkedin.com/in/shoaibmarif/
            </a>
          </p>
          <p>
            <strong>Website:</strong>{' '}
            <Link
              href="/"
              className="text-indigo-600 dark:text-indigo-400 underline hover:no-underline"
            >
              https://formatcase.netlify.app/
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};
