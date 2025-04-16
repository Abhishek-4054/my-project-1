import React from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLocation } from 'wouter';

export function Header() {
  const { user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setLocation('/auth');
      }
    });
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const fullName = user?.fullName || user?.username || 'User';

  return (
    <header className="bg-white shadow-md border-b border-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary/20 bg-primary/5 mr-3 flex items-center justify-center">
            <img 
              className="h-7 w-auto" 
              src="https://cdn-icons-png.flaticon.com/512/3281/3281361.png" 
              alt="The First Journey Logo" 
            />
          </div>
          <div>
            <h1 className="text-xl font-bold font-heading text-primary leading-none">The First Journey</h1>
            <p className="text-xs text-primary/60">Celebrate Every Moment</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-1">
            <button 
              onClick={() => setLocation('/')}
              className="px-3 py-2 text-sm font-medium rounded-md text-neutral-600 hover:bg-primary/5 hover:text-primary transition-colors"
            >
              Dashboard
            </button>
            <button 
              onClick={() => setLocation('/timeline')}
              className="px-3 py-2 text-sm font-medium rounded-md text-neutral-600 hover:bg-primary/5 hover:text-primary transition-colors"
            >
              Timeline
            </button>
            <button 
              onClick={() => setLocation('/upload')}
              className="px-3 py-2 text-sm font-medium rounded-md text-neutral-600 hover:bg-primary/5 hover:text-primary transition-colors"
            >
              Upload
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button type="button" className="p-2 rounded-full text-primary/80 hover:bg-primary/5 hover:text-primary transition-colors">
              <span className="sr-only">View notifications</span>
              <Bell className="h-5 w-5" />
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 text-sm font-medium outline-none">
                <Avatar className="h-9 w-9 border-2 border-primary/20">
                  <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${fullName}`} />
                  <AvatarFallback className="bg-primary/10 text-primary">{getInitials(fullName)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-neutral-800">{fullName}</p>
                  <p className="text-xs text-neutral-500 truncate">{user?.email || 'No email'}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setLocation('/')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation('/settings')}>
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
