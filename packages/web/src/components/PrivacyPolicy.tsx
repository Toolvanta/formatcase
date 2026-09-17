import React, { useEffect } from 'react';
import { Shield, ArrowLeft, ExternalLink, Lock, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    document.title = 'Privacy Policy — FormatCase';
    window.scrollTo(0, 0);

    // Set noindex, follow for privacy page
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const previousRobots = robotsMeta ? robotsMeta.content : 'index, follow';

    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = 'noindex, follow';

    return () => {
      document.title = 'FormatCase — Online Case Converter & Developer Text Utilities';
      if (robotsMeta) {
        robotsMeta.content = previousRobots;
      }
    };
  }, []);

  return (
    <div className="space-y-8 pb-16">
      {/* Back Button & Top Navigation */}
      <div className="flex items-center justify-between">
        <a
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-medium transition-all shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </a>

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
            <span><strong>No Keystroke Logging:</strong> FormatCase does not monitor or log keyboard activities.</span>
          </li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-6 sm:p-8 space-y-4 shadow-2xs">
        <div className="flex items-center gap-2.5 text-slate-900 dark:text-zinc-100 font-bold text-lg border-b border-slate-100 dark:border-zinc-800/80 pb-3">
          <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2>3. Chrome Extension Permissions Justification</h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
          In accordance with Google Chrome Web Store Developer Policies, here is why each permission is required:
        </p>
        <ul className="space-y-2.5 text-sm text-slate-600 dark:text-zinc-300">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2"></span>
            <span><code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-xs font-mono text-indigo-600 dark:text-indigo-300">activeTab</code> &amp; <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-xs font-mono text-indigo-600 dark:text-indigo-300">scripting</code>: Used solely to read user-selected text and write the formatted result into your clipboard when you trigger a right-click context menu transformation.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2"></span>
            <span><code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-xs font-mono text-indigo-600 dark:text-indigo-300">clipboardWrite</code>: Enables writing the converted text string directly to your clipboard upon clicking &quot;Copy&quot; or using context menus.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2"></span>
            <span><code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-xs font-mono text-indigo-600 dark:text-indigo-300">contextMenus</code>: Allows registering the &quot;FormatCase&quot; sub-menu options when you highlight text on any web page.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2"></span>
            <span><code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-xs font-mono text-indigo-600 dark:text-indigo-300">storage</code>: Used strictly on your local machine to save your UI preferences (such as favorite casing formats and active filters). No data is synced to external servers.</span>
          </li>
        </ul>
      </section>

      {/* Section 4 */}
      <section className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-6 sm:p-8 space-y-4 shadow-2xs">
        <div className="flex items-center gap-2.5 text-slate-900 dark:text-zinc-100 font-bold text-lg border-b border-slate-100 dark:border-zinc-800/80 pb-3">
          <h2>4. Third-Party Services</h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
          The FormatCase Chrome Extension operates completely offline and does not communicate with any third-party APIs or remote servers.
        </p>
      </section>

      {/* Section 5 */}
      <section className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-6 sm:p-8 space-y-4 shadow-2xs">
        <div className="flex items-center gap-2.5 text-slate-900 dark:text-zinc-100 font-bold text-lg border-b border-slate-100 dark:border-zinc-800/80 pb-3">
          <h2>5. Contact &amp; Support</h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
          If you have questions, feedback, or need support regarding this privacy policy or the FormatCase software:
        </p>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-zinc-300">
          <li><strong>Author:</strong> Shoaib M. Arif</li>
          <li>
            <strong>GitHub Issues / Support:</strong>{' '}
            <a
              href="https://github.com/shoaibmarif"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 underline hover:no-underline inline-flex items-center gap-1"
            >
              <span>https://github.com/shoaibmarif</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </li>
          <li>
            <strong>Live Web Application:</strong>{' '}
            <a
              href="https://formatcase.netlify.app/"
              className="text-indigo-600 dark:text-indigo-400 underline hover:no-underline"
            >
              https://formatcase.netlify.app/
            </a>
          </li>
          <li>
            <strong>LinkedIn:</strong>{' '}
            <a
              href="https://www.linkedin.com/in/shoaibmarif/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 underline hover:no-underline inline-flex items-center gap-1"
            >
              <span>https://www.linkedin.com/in/shoaibmarif/</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </li>
        </ul>
      </section>

      {/* Footer */}
      <div className="text-center text-xs text-slate-500 dark:text-zinc-500 pt-4">
        © 2026 FormatCase. Open-source software released under the MIT License.
      </div>
    </div>
  );
};
