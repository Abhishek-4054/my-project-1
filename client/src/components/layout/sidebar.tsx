import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Home, Calendar, Upload, Settings, LogOut, Camera, Book, Baby, Heart } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'home', label: 'Dashboard', path: '/', icon: Home, color: 'text-purple-500' },
  { id: 'milestones', label: 'Scans and Reports', path: '/milestones', icon: Heart, color: 'text-pink-500' },
  { id: 'memories', label: 'Chat Room', path: '/memories', icon: Book, color: 'text-emerald-500' },
  { id: 'timeline', label: 'Timeline', path: '/timeline', icon: Calendar, color: 'text-blue-500' },
  { id: 'upload', label: 'Add Moments', path: '/upload', icon: Camera, color: 'text-amber-500' },
 { id: 'settings', label: 'Settings', path: '/settings', icon: Settings, color: 'text-slate-500' },
];

export function Sidebar() {
  const [location] = useLocation();
  const { logoutMutation } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar toggle button */}
      <button
        className="fixed top-20 left-4 md:hidden z-50 bg-primary text-white p-2 rounded-full shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 transform md:translate-x-0 pt-16 bg-white border-r border-primary/5 shadow-lg transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } md:w-64 w-72`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 pt-5 pb-4 overflow-y-auto">
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
                <Link to="/parenting-tips" className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-neutral-500 hover:bg-neutral-50 hover:text-primary">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full mr-3 bg-blue-50 text-blue-500">
                    <Book className="h-4 w-4" />
                  </div>
                  <span>Parenting Tips</span>
                </Link>
                <Link to="/development-guide" className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-neutral-500 hover:bg-neutral-50 hover:text-primary">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full mr-3 bg-green-50 text-green-500">
                    <Baby className="h-4 w-4" />
                  </div>
                  <span>Development Guide</span>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0 border-t border-neutral-200 p-3">
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
      </div>
    </>
  );
}
