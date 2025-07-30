'use client';

import { usePathname } from 'next/navigation';
import HomeHero from '../HomeHero';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      {isHomePage && <HomeHero />}
      <main>{children}</main>
    </>
  );
}
