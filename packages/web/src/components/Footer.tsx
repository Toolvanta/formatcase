import React from 'react';
import Link from 'next/link';
import { ArrowRightLeft, ShieldCheck, ExternalLink, Chrome } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/90 dark:border-zinc-800/90 pt-12 sm:pt-16 pb-10 mt-16 sm:mt-24 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-sm transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* 4-Column Responsive Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Col 1: Brand & Privacy Guarantee */}
          <div className="space-y-3.5">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-bold text-base text-slate-800 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center text-xs shadow-xs shrink-0">
                aA
              </div>
              <span className="text-lg">FormatCase</span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              High-performance, zero-latency, 100% in-browser text transformation engine and developer utility. Zero data leaves your browser memory.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% Client-Side Privacy Guarantee</span>
            </div>
          </div>

          {/* Col 2: Code & Variable Converters */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-zinc-100">
              Code Converters
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-zinc-400">
              <li>
                <Link href="/tools/camel-case" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  camelCase Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/snake-case" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  snake_case Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/pascal-case" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  PascalCase Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/kebab-case" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  kebab-case Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/screaming-snake-case" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  SCREAMING_SNAKE_CASE
                </Link>
              </li>
              <li>
                <Link href="/tools/dot-case" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  dot.case Converter
                </Link>
              </li>
              <li>
                <Link href="/category/developer" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                  All Code Formats (21) &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Text & Editorial Tools */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-zinc-100">
              Text &amp; Editorial Tools
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-zinc-400">
              <li>
                <Link href="/tools/title-case" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Title Case Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/sentence-case" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Sentence case Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/lowercase" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  lowercase Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/uppercase" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  UPPERCASE Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/capitalized-case" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Capitalized Case
                </Link>
              </li>
              <li>
                <Link href="/tools/slugify" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  URL Slugify Tool
                </Link>
              </li>
              <li>
                <Link href="/category/natural" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                  All Editorial Formats (7) &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Resources */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-zinc-100">
              Navigation &amp; Chrome
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-zinc-400">
              <li>
                <Link href="/tools" className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
                  Complete Tools Directory (29)
                </Link>
              </li>
              <li>
                <Link href="/category/developer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Code &amp; Variable Category
                </Link>
              </li>
              <li>
                <Link href="/category/natural" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Text &amp; Editorial Category
                </Link>
              </li>
              <li>
                <Link href="/category/utility" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Web &amp; URL Utilities
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="https://chromewebstore.google.com/detail/FormatCase%20-%20Case%20Converter%20%26%20Text%20Utility/dfpjcekelcakndmpffpiemmpjbgpnipp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  <Chrome className="w-3.5 h-3.5" />
                  <span>Chrome Extension</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Author */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-400">
          <div>
            &copy; {new Date().getFullYear()} FormatCase. Built for developers, technical writers, and creators.
          </div>

          <div className="flex items-center gap-3">
            <span>
              Created by <span className="font-semibold text-slate-800 dark:text-zinc-200">Shoaib M. Arif</span>
            </span>
            <span>&bull;</span>
            <a
              href="https://github.com/shoaibmarif"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span>&bull;</span>
            <a
              href="https://www.linkedin.com/in/shoaibmarif/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0a66c2] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
