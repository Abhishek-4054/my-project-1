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
    <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 md:pt-16 bg-white border-r border-primary/5 shadow-sm">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="px-4 mb-6">
          <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
            <h3 className="text-primary font-medium mb-1 text-sm">Your Baby's Journey</h3>
            <p className="text-xs text-neutral-500">Tracking precious moments through your pregnancy and beyond.</p>
          </div>
        </div>
        
        <nav className="px-3 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = (location === item.path) || 
              (item.path !== '/' && location.startsWith(item.path));
            
            return (
              <Link 
                key={item.id}
                href={item.path}
                className={cn(
                  "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-150",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-neutral-500 hover:bg-neutral-50 hover:text-primary"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center h-8 w-8 rounded-full mr-3",
                  isActive 
                    ? "bg-primary/20" 
                    : `bg-neutral-100 ${item.color} group-hover:bg-primary/10 transition-colors duration-150`
                )}>
                  <Icon className="h-4 w-4" />
                </div>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="px-3 mt-8">
          <h3 className="px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Resources
          </h3>
          <div className="mt-3 space-y-1.5">
            <a href="#" className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-neutral-500 hover:bg-neutral-50 hover:text-primary">
              <div className="flex items-center justify-center h-8 w-8 rounded-full mr-3 bg-blue-50 text-blue-500">
                <Book className="h-4 w-4" />
              </div>
              <span>Parenting Tips</span>
            </a>
            <a href="#" className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-neutral-500 hover:bg-neutral-50 hover:text-primary">
              <div className="flex items-center justify-center h-8 w-8 rounded-full mr-3 bg-green-50 text-green-500">
                <Baby className="h-4 w-4" />
              </div>
              <span>Development Guide</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="flex-shrink-0 flex border-t border-neutral-200 p-3">
        <button
          onClick={handleLogout}
          className="flex items-center px-3 py-2 w-full rounded-lg text-red-500 hover:bg-red-50 transition-colors"
        >
          <div className="flex items-center justify-center h-8 w-8 rounded-full mr-3 bg-red-50">
            <LogOut className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">Sign out</span>
        </button>
      </div>
    </div>
  );
}
