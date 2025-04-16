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
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            className="h-10 w-auto mr-3" 
            src="https://cdn-icons-png.flaticon.com/512/2966/2966334.png" 
            alt="Baby Radiology Logo" 
          />
          <h1 className="text-xl font-bold font-heading text-primary">Baby Radiology Gallery</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button type="button" className="p-1 rounded-full text-primary hover:bg-neutral-100">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" />
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-2 text-sm font-medium text-neutral-400 hover:text-primary outline-none">
              <span>{fullName}</span>
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://api.dicebear.com/7.x/personas/svg?seed=Emily" />
                <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLocation('/settings')}>
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
