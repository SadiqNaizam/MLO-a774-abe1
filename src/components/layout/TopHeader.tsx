import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Plus,
  ChevronDown,
  User,
  FileText,
  ShoppingCart,
  Settings
} from 'lucide-react';

interface TopHeaderProps {
  title: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ title }) => {
  return (
    <header
      className={cn(
        "fixed top-0 left-64 right-0 h-[70px] z-10",
        "flex items-center justify-between px-6",
        "bg-app-surface border-b border-app-border"
      )}
    >
      <h1 className="text-2xl font-semibold text-primary-text">{title}</h1>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="default" 
              className="bg-accent-blue hover:bg-accent-blue/90 text-primary-foreground focus:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>New Lead</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>New Proposal</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ShoppingCart className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>New Item</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Manage Templates</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
