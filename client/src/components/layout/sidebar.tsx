import React from 'react';
import { Link, useLocation } from 'wouter';
import { Home, Calendar, Upload, Settings, LogOut, Camera, Book, Baby, Heart } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'home', label: 'Dashboard', path: '/', icon: Home, color: 'text-purple-500' },
  { id: 'timeline', label: 'Timeline', path: '/timeline', icon: Calendar, color: 'text-blue-500' },
  { id: 'memories', label: 'Memory Book', path: '/memories', icon: Book, color: 'text-emerald-500' },
  { id: 'upload', label: 'Add Moments', path: '/upload', icon: Camera, color: 'text-amber-500' },
  { id: 'milestones', label: 'Milestones', path: '/milestones', icon: Heart, color: 'text-pink-500' },
  { id: 'settings', label: 'Settings', path: '/settings', icon: Settings, color: 'text-slate-500' },
];

export function Sidebar() {
  const [location] = useLocation();
  const { logoutMutation } = useAuth();
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 md:pt-16 bg-white border-r border-neutral-200">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = (location === item.path) || 
              (item.path !== '/' && location.startsWith(item.path));
            
            return (
              <Link 
                key={item.id}
                href={item.path}
                className={cn(
                  "group flex items-center px-2 py-2 text-base font-medium rounded-md",
                  isActive 
                    ? "bg-primary bg-opacity-10 text-primary" 
                    : "text-neutral-400 hover:bg-neutral-100 hover:text-primary"
                )}
              >
                <Icon className="mr-4 h-6 w-6" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="flex-shrink-0 flex border-t border-neutral-200 p-4">
        <button
          onClick={handleLogout}
          className="flex-shrink-0 group block w-full"
        >
          <div className="flex items-center">
            <div>
              <LogOut className="h-6 w-6 text-neutral-400 group-hover:text-primary" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-neutral-400 group-hover:text-primary">
                Logout
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
