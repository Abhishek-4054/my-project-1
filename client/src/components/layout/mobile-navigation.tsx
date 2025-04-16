import React from 'react';
import { Link, useLocation } from 'wouter';
import { Home, Calendar, Camera, Settings, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'home', label: 'Home', path: '/', icon: Home, color: 'text-purple-500', bgColor: 'bg-purple-50' },
  { id: 'timeline', label: 'Timeline', path: '/timeline', icon: Calendar, color: 'text-blue-500', bgColor: 'bg-blue-50' },
  { id: 'upload', label: 'Add', path: '/upload', icon: Camera, color: 'text-amber-500', bgColor: 'bg-amber-50' },
  { id: 'milestones', label: 'Milestones', path: '/milestones', icon: Heart, color: 'text-pink-500', bgColor: 'bg-pink-50' },
  { id: 'settings', label: 'More', path: '/settings', icon: Settings, color: 'text-slate-500', bgColor: 'bg-slate-50' },
];

export function MobileNavigation() {
  const [location] = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-primary/10 flex z-10 px-1 py-2 shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = (location === item.path) || 
          (item.path !== '/' && location.startsWith(item.path));
        
        return (
          <Link 
            key={item.id}
            href={item.path}
            className={cn(
              "flex-1 flex flex-col items-center py-2",
              isActive 
                ? "text-primary" 
                : `${item.color} hover:text-primary`
            )}
          >
            <div className={cn(
              "flex items-center justify-center h-10 w-10 rounded-full mb-1",
              isActive 
                ? "bg-primary/10" 
                : `${item.bgColor}`
            )}>
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
