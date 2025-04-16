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
import { Info, RefreshCw } from 'lucide-react';
import { Link } from 'wouter';
import { Skeleton } from '@/components/ui/skeleton';
import { ProgressTracker } from '@/components/progress-tracker';
import { ParentingTips } from '@/components/parenting-tips';
import { BabyGrowthVisual } from '@/components/baby-growth-visual';
import { PreparationChecklist } from '@/components/preparation-checklist';
import { InspirationalMessage } from '@/components/inspirational-message';

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
  
  // Baby development milestones and facts
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
  
  const getBabyFact = (month: number) => {
    const facts = [
      "Your baby's heart is beginning to form and will start beating this month!",
      "Tiny buds that will become arms and legs are forming. Facial features are also beginning to develop.",
      "Your baby's fingers and toes are becoming distinct and tiny fingernails are starting to form.",
      "Your baby's facial features are becoming more defined. They can now squint, frown, and make faces!",
      "Your baby is developing reflexes and may start sucking their thumb. They can hear your voice now!",
      "Your baby's skin is still thin and translucent, but will soon change. They're also growing hair!",
      "Your baby is practicing breathing movements and can now open and close their eyes.",
      "Your baby's brain is developing rapidly. They can now dream and have sleep cycles!",
      "Your baby is preparing for birth by positioning head-down and storing fat for after birth."
    ];
    
    return facts[Math.min(month - 1, facts.length - 1)];
  };
  
  const getDevelopmentMilestone = (month: number) => {
    const milestones = [
      "Heart and brain development",
      "Facial features forming",
      "Fingers and toes developing",
      "Movement and reflexes",
      "Hearing developing",
      "Skin and hair growth",
      "Breathing practice",
      "Brain and nervous system",
      "Final growth and positioning"
    ];
    
    return milestones[Math.min(month - 1, milestones.length - 1)];
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar />
        
        <main className="flex-1 md:pl-64 pt-4 pb-20">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-primary font-heading">
                  The First Journey
                </h1>
                <h2 className="text-xl font-medium text-neutral-600 mt-1">
                  Welcome back, {user?.fullName || user?.username}!
                </h2>
              </div>
              <div className="mt-3 sm:mt-0">
                <span className="bg-primary text-white text-sm px-4 py-2 rounded-full font-medium shadow-sm">
                  Month {currentMonth}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <InspirationalMessage />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white overflow-hidden shadow-md rounded-xl border border-primary/10">
                <div className="px-6 py-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 rounded-full p-3">
                      <img 
                        src={`https://cdn-icons-png.flaticon.com/512/${currentMonth < 5 ? '4226' : '4726'}/426${currentMonth < 5 ? 6 : 8}${currentMonth}.png`}
                        alt="Baby icon" 
                        className="h-10 w-10"
                      />
                    </div>
                    <div className="ml-5 flex-1">
                      <h3 className="text-xl font-semibold text-primary mb-2">Baby's Growth</h3>
                      <p className="text-neutral-600 mb-3">
                        Your baby is now approximately the size of <span className="font-medium">{getBabySize(currentMonth)}</span>.
                      </p>
                      <p className="text-neutral-500 text-sm mb-1">
                        <span className="font-medium">Current milestone:</span> {getDevelopmentMilestone(currentMonth)}
                      </p>
                      <div className="w-full bg-neutral-200 rounded-full h-2.5 mt-2">
                        <div className="bg-primary rounded-full h-2.5" style={{ width: `${(currentMonth/9)*100}%` }}></div>
                      </div>
                      <p className="text-xs text-neutral-400 mt-1">Progress: {Math.round((currentMonth/9)*100)}% of pregnancy</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden shadow-md rounded-xl border border-primary/10">
                <div className="px-6 py-5">
                  <h3 className="text-xl font-semibold text-primary mb-3">Did You Know?</h3>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 rounded-full p-3">
                      <Info className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-neutral-600">
                        {getBabyFact(currentMonth)}
                      </p>
                      <div className="flex justify-end mt-3">
                        <Link href="/timeline">
                          <Button variant="ghost" size="sm" className="text-xs">
                            Track Development →
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-primary mb-4 flex items-center">
              <img src="https://cdn-icons-png.flaticon.com/512/3140/3140300.png" className="w-6 h-6 mr-2" alt="gallery" />
              Recent Images & Videos
            </h3>
            
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
              <div className="bg-white shadow-md rounded-xl border border-primary/10 p-8 text-center mb-8">
                <div className="relative">
                  <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                    <div className="relative w-28 h-28 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                      <img 
                        src="https://cdn-icons-png.flaticon.com/512/2548/2548348.png" 
                        alt="Upload images" 
                        className="h-20 w-20"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-16">
                  <h3 className="text-xl font-semibold text-primary mb-2">Your Journey Begins Here</h3>
                  <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                    Capture and share those precious first glimpses of your little one.
                    Start by uploading your ultrasound images or videos.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/upload">
                      <Button className="px-6 py-5 h-auto">
                        <img src="https://cdn-icons-png.flaticon.com/512/5110/5110778.png" className="w-5 h-5 mr-2" alt="upload" />
                        <span>Upload First Image</span>
                      </Button>
                    </Link>
                    <Link href="/timeline">
                      <Button variant="outline" className="px-6 py-5 h-auto">
                        <span>Explore Timeline</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {recentMedia && recentMedia.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/upload">
                  <Button className="px-6">
                    <img src="https://cdn-icons-png.flaticon.com/512/5110/5110778.png" className="w-5 h-5 mr-2" alt="upload" />
                    <span>Upload New Image</span>
                  </Button>
                </Link>
                <Link href="/timeline">
                  <Button variant="outline">
                    <span>View Complete Timeline</span>
                  </Button>
                </Link>
              </div>
            )}
            
            {/* Week-by-Week Pregnancy Progress Tracker */}
            <div className="mt-12 mb-8">
              <h3 className="text-xl font-semibold text-primary mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Pregnancy Tracker
              </h3>
              <ProgressTracker 
                currentWeek={currentMonth * 4}
                dueDate={user?.dueDate || undefined}
              />
            </div>
            
            {/* Baby Growth Visual */}
            <div className="mt-10 mb-8">
              <h3 className="text-xl font-semibold text-primary mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Baby Development
              </h3>
              <BabyGrowthVisual month={currentMonth} />
            </div>
            
            {/* Parenting Tips Section */}
            <div className="mt-10 mb-8">
              <h3 className="text-xl font-semibold text-primary mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Parenting Resources
              </h3>
              <ParentingTips />
            </div>
            
            {/* Preparation Checklist */}
            <div className="mt-10 mb-8">
              <h3 className="text-xl font-semibold text-primary mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Preparation Checklist
              </h3>
              <PreparationChecklist />
            </div>

            {/* Monthly milestone cards - only show if there are images already */}
            {recentMedia && recentMedia.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-primary mb-6 flex items-center">
                  <img src="https://cdn-icons-png.flaticon.com/512/826/826358.png" className="w-6 h-6 mr-2" alt="milestones" />
                  Monthly Milestones
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, index) => {
                    const month = currentMonth - index;
                    if (month < 1) return null;
                    
                    return (
                      <div key={index} className="bg-white overflow-hidden shadow-md rounded-xl border border-primary/5 hover:border-primary/20 transition-all">
                        <div className="p-5">
                          <div className="flex items-center mb-3">
                            <div className="bg-primary/10 rounded-full p-2 mr-3">
                              <span className="text-primary font-bold">{month}</span>
                            </div>
                            <h4 className="font-medium text-neutral-700">Month {month}</h4>
                          </div>
                          <p className="text-sm text-neutral-500 mb-3">
                            {getDevelopmentMilestone(month)}
                          </p>
                          <Link href={`/timeline/${month}`}>
                            <Button variant="ghost" size="sm" className="w-full justify-between">
                              <span>View Month Details</span>
                              <span>→</span>
                            </Button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
