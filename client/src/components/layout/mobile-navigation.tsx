import React from 'react';
import { Link, useLocation } from 'wouter';
import { Home, Calendar, Upload, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'home', label: 'Home', path: '/', icon: Home },
  { id: 'timeline', label: 'Timeline', path: '/timeline', icon: Calendar },
  { id: 'upload', label: 'Upload', path: '/upload', icon: Upload },
  { id: 'settings', label: 'Settings', path: '/settings', icon: Settings },
];

export function MobileNavigation() {
  const [location] = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-neutral-200 flex z-10">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = (location === item.path) || 
          (item.path !== '/' && location.startsWith(item.path));
        
        return (
          <Link 
            key={item.id}
            href={item.path}
            className={cn(
              "flex-1 flex flex-col items-center py-3",
              isActive ? "text-primary" : "text-neutral-400"
            )}
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
