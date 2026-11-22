'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRightLeft, Sun, Moon, Search, Menu, X, ChevronRight, Chrome, Layers, Code, FileText, Globe } from 'lucide-react';
import { ThemeMode } from '../hooks/useTheme';

interface HeaderProps {
  theme?: ThemeMode;
  isDark: boolean;
  mounted?: boolean;
  onThemeToggle: () => void;
  onOpenCommandPalette: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  mounted = true,
  onThemeToggle,
  onOpenCommandPalette,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="border-b border-slate-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[4rem] sm:h-20 py-2 sm:py-0 flex items-center justify-between gap-3 sm:gap-6">
        {/* Left: Logo & Title */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 group hover:opacity-95 transition-opacity cursor-pointer min-h-[44px]"
          title="FormatCase Home"
        >
          <div className="p-2 sm:p-2.5 bg-gradient-to-tr from-indigo-600 to-violet-600 text-white rounded-xl shadow-md flex items-center justify-center ring-2 sm:ring-4 ring-indigo-500/10 shrink-0 group-hover:scale-105 transition-transform">
            <ArrowRightLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-zinc-100">
              FormatCase
            </span>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-zinc-400 -mt-0.5 hidden lg:block">
              Clean text and developer case formatting
            </p>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links (SEO & Crawlability) */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
          <Link
            href="/tools"
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors min-h-[44px] flex items-center"
          >
            All Tools (29)
          </Link>
          <Link
            href="/category/developer"
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors min-h-[44px] flex items-center"
          >
            Code &amp; Variables
          </Link>
          <Link
            href="/category/natural"
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors min-h-[44px] flex items-center"
          >
            Text &amp; Titles
          </Link>
          <Link
            href="/category/utility"
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors min-h-[44px] flex items-center"
          >
            Web &amp; URLs
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Chrome Extension Link */}
          <a
            href="https://chromewebstore.google.com/detail/FormatCase%20-%20Case%20Converter%20%26%20Text%20Utility/dfpjcekelcakndmpffpiemmpjbgpnipp"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/70 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all text-xs shadow-2xs group min-h-[44px]"
            title="Install FormatCase Chrome Extension"
            aria-label="Install FormatCase Chrome Extension"
          >
            <Chrome className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
            <span className="font-semibold">Extension</span>
          </a>

          {/* Quick Search Button */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/60 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:border-slate-300 dark:hover:border-zinc-700 transition-all text-xs group cursor-pointer shadow-2xs font-medium min-h-[44px]"
            title="Search casing formats (Cmd+K / Ctrl+K)"
            aria-label="Search casing formats"
          >
            <Search className="w-4 h-4 group-hover:text-indigo-500 transition-colors" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden lg:inline text-[10px] bg-slate-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-slate-500">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onThemeToggle}
            className="flex items-center justify-center gap-1.5 p-2.5 sm:px-3.5 sm:py-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 transition-all cursor-pointer shadow-2xs text-xs font-medium min-w-[44px] min-h-[44px]"
            title={mounted ? (isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode') : 'Toggle theme'}
            aria-label="Toggle theme"
          >
            {mounted ? (
              isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )
            ) : (
              <span className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 min-w-[44px] min-h-[44px] cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[4rem] sm:top-20 bottom-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm z-50 animate-in fade-in duration-200 flex flex-col justify-start">
          <div
            className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 p-5 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 px-3">
                Navigation
              </span>
              <nav className="space-y-1 pt-1">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-200 font-semibold text-sm min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5">
                    <ArrowRightLeft className="w-4 h-4 text-indigo-500" />
                    <span>Home Workbench</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/tools"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-200 font-semibold text-sm min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-indigo-500" />
                    <span>All 29 Converters</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/category/developer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-200 font-semibold text-sm min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5">
                    <Code className="w-4 h-4 text-indigo-500" />
                    <span>Code &amp; Variables (21)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/category/natural"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-200 font-semibold text-sm min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-indigo-500" />
                    <span>Text &amp; Titles (7)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/category/utility"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-200 font-semibold text-sm min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-indigo-500" />
                    <span>Web &amp; URLs (1)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </nav>
            </div>

            <hr className="border-slate-100 dark:border-zinc-800" />

            {/* Mobile Chrome Extension Link */}
            <a
              href="https://chromewebstore.google.com/detail/FormatCase%20-%20Case%20Converter%20%26%20Text%20Utility/dfpjcekelcakndmpffpiemmpjbgpnipp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold text-sm min-h-[44px]"
            >
              <div className="flex items-center gap-2.5">
                <Chrome className="w-4 h-4" />
                <span>FormatCase Chrome Extension</span>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200">
                Install
              </span>
            </a>
          </div>
          {/* Clickable backdrop area to dismiss */}
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
