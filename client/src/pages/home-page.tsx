import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { MobileNavigation } from '@/components/layout/mobile-navigation';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { Media } from '@shared/schema';
import { MediaCard } from '@/components/ui/media-card';
import { Button } from '@/components/ui/button';
import { MediaViewer } from '@/components/media-viewer';
import { Info } from 'lucide-react';
import { Link } from 'wouter';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const { user } = useAuth();
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  
  const { data: recentMedia, isLoading: isLoadingMedia } = useQuery<Media[]>({
    queryKey: ['/api/media/recent'],
  });
  
  // Current gestational month based on due date
  const getCurrentMonth = () => {
    if (!user?.dueDate) return 1;
    
    const dueDate = new Date(user.dueDate);
    const today = new Date();
    
    // Calculate approx conception date (40 weeks before due date)
    const conceptionDate = new Date(dueDate);
    conceptionDate.setDate(conceptionDate.getDate() - 280);
    
    // Calculate months between conception and today
    const monthsDiff = (today.getFullYear() - conceptionDate.getFullYear()) * 12 + 
                       (today.getMonth() - conceptionDate.getMonth());
    
    return Math.min(Math.max(1, monthsDiff + 1), 9);
  };
  
  const currentMonth = getCurrentMonth();
  
  const getBabySize = (month: number) => {
    const sizes = [
      'a poppy seed',
      'a kidney bean',
      'a grape',
      'a lime',
      'a bell pepper',
      'an avocado',
      'a papaya',
      'a cabbage',
      'a watermelon'
    ];
    
    return sizes[Math.min(month - 1, sizes.length - 1)];
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar />
        
        <main className="flex-1 md:pl-64 pt-4 pb-20">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-500 font-heading">
                Welcome back, {user?.fullName || user?.username}!
              </h2>
              <div className="mt-3 sm:mt-0">
                <span className="bg-secondary text-white text-xs px-3 py-1 rounded-full font-medium">
                  Current Month: {currentMonth}
                </span>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-primary bg-opacity-10 rounded-md p-3">
                    <Info className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-neutral-500 font-heading">Baby's Growth Update</h3>
                    <p className="text-sm text-neutral-400">
                      Month {currentMonth}: Your baby is now approximately the size of {getBabySize(currentMonth)}.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-medium text-neutral-500 font-heading mb-4">Recent Uploads</h3>
            
            {isLoadingMedia ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentMedia && recentMedia.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {recentMedia.map((media) => (
                  <MediaCard 
                    key={media.id} 
                    media={media} 
                    onClick={() => setSelectedMedia(media)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg p-8 text-center mb-8">
                <div className="flex justify-center mb-4">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/3588/3588614.png" 
                    alt="No uploads yet" 
                    className="h-24 w-24 opacity-50"
                  />
                </div>
                <h3 className="text-lg font-medium text-neutral-500 mb-2">No media uploaded yet</h3>
                <p className="text-sm text-neutral-400 mb-6">
                  Start building your baby's gallery by uploading your first ultrasound image or video.
                </p>
                <Link href="/upload">
                  <Button>
                    Upload Your First Media
                  </Button>
                </Link>
              </div>
            )}

            {recentMedia && recentMedia.length > 0 && (
              <div className="flex justify-center">
                <Link href="/timeline">
                  <Button variant="outline">
                    View All Media
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </main>
        
        <MobileNavigation />
      </div>
      
      {selectedMedia && (
        <MediaViewer 
          media={selectedMedia} 
          onClose={() => setSelectedMedia(null)} 
        />
      )}
    </div>
  );
}
