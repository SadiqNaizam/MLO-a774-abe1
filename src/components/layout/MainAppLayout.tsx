import React from 'react';
import { cn } from '@/lib/utils';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';

interface MainAppLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, pageTitle }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarNav />
      <TopHeader title={pageTitle} />
      <main
        className={cn(
          "ml-64 mt-[70px] p-6 min-w-0",
          "min-h-[calc(100vh-70px)] overflow-y-auto"
        )}
      >
        {/* This div applies the "container" styles from mainContent.container if needed by children context */}
        <div className="flex flex-col gap-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
