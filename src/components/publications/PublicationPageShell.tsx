import React from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default function PublicationPageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface-base text-light min-h-screen">
      <Navbar hamburgerOnly />
      <div className="px-6 sm:px-8 md:px-12 lg:px-16 pt-28 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-5xl mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
