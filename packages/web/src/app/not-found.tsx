'use client';

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { NotFound } from '../components/NotFound';
import { Footer } from '../components/Footer';
import { CommandPalette } from '../components/CommandPalette';
import { Toast, ToastMessage } from '../components/Toast';
import { useTheme } from '../hooks/useTheme';

export default function NotFoundPage() {
  const { theme, isDark, toggleTheme, mounted } = useTheme();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <NotFound />
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
}
