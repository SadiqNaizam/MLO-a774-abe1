import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutGrid,
  UsersRound,
  UserCircle,
  FileText,
  FileSpreadsheet,
  ShoppingCart,
  Mail as MailIcon, // Aliased to avoid conflict if 'Mail' type/var exists
  Archive,
  CalendarDays,
  HelpCircle,
  Settings as SettingsIcon, // Aliased to avoid conflict
  Briefcase
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
}

const mainNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '#/dashboard', icon: LayoutGrid },
  { id: 'leads', label: 'Leads', href: '#/leads', icon: UsersRound },
  { id: 'customers', label: 'Customers', href: '#/customers', icon: UserCircle },
  { id: 'proposals', label: 'Proposals', href: '#/proposals', icon: FileText },
  { id: 'invoices', label: 'Invoices', href: '#/invoices', icon: FileSpreadsheet },
  { id: 'items', label: 'Items', href: '#/items', icon: ShoppingCart },
  { id: 'mail', label: 'Mail', href: '#/mail', icon: MailIcon },
  { id: 'shoebox', label: 'Shoebox', href: '#/shoebox', icon: Archive },
  { id: 'calendar', label: 'Calendar', href: '#/calendar', icon: CalendarDays },
];

const bottomNavItems: NavItem[] = [
  { id: 'help', label: 'Help', href: '#/help', icon: HelpCircle },
  { id: 'settings', label: 'Settings', href: '#/settings', icon: SettingsIcon },
];

const SidebarNav: React.FC = () => {
  const [activeItemId, setActiveItemId] = useState<string>('dashboard');

  const handleLinkClick = useCallback((itemId: string) => {
    setActiveItemId(itemId);
    // In a real app, you'd navigate here, e.g., using react-router-dom
  }, []);

  const navLinkClasses = (itemId: string) =>
    cn(
      "flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-150",
      "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-ring",
      activeItemId === itemId
        ? "bg-sidebar-primary text-sidebar-primary-foreground"
        : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    );

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col h-screen fixed top-0 left-0 z-20">
      <div className="h-[70px] flex items-center shrink-0 px-6 border-b border-sidebar-border">
        <Briefcase className="h-8 w-8 mr-3 text-sidebar-foreground" />
        <h1 className="text-xl font-semibold text-sidebar-foreground">Sales Inc.</h1>
      </div>

      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-1.5">
          {mainNavItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={navLinkClasses(item.id)}
              onClick={(e) => {
                e.preventDefault(); // Prevent actual hash navigation for this demo
                handleLinkClick(item.id);
              }}
              aria-current={activeItemId === item.id ? 'page' : undefined}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.label}
            </a>
          ))}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t border-sidebar-border shrink-0">
        <nav className="space-y-1.5">
          {bottomNavItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={navLinkClasses(item.id)}
              onClick={(e) => {
                e.preventDefault(); // Prevent actual hash navigation for this demo
                handleLinkClick(item.id);
              }}
              aria-current={activeItemId === item.id ? 'page' : undefined}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default SidebarNav;
