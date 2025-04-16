import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { MobileNavigation } from '@/components/layout/mobile-navigation';
import { useQuery } from '@tanstack/react-query';
import { Media } from '@shared/schema';
import { MediaCard } from '@/components/ui/media-card';
import { MediaViewer } from '@/components/media-viewer';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { EmotionType } from '@/components/ui/emotion-tag';

export default function TimelinePage() {
  const [selectedMonth, setSelectedMonth] = useState(5);
  const [selectedEmotion, setSelectedEmotion] = useState<string>('all');
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  
  // Fetch media for selected month and emotion
  const { data: monthMedia, isLoading } = useQuery<Media[]>({
    queryKey: ['/api/media/month', selectedMonth, 'emotion', selectedEmotion],
  });
  
  // Fetch month info
  const { data: monthInfo } = useQuery<any>({
    queryKey: ['/api/month-info', selectedMonth],
    queryFn: async () => {
      // This would ideally fetch from an API with real month info data
      // For now, using static data
      return {
        month: selectedMonth,
        weekRange: `${(selectedMonth - 1) * 4 + 1}-${selectedMonth * 4}`,
        title: "Key Development Milestones",
        description: getMilestoneInfo(selectedMonth),
        imageUrl: getMonthImage(selectedMonth)
      };
    }
  });
  
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const emotions: { id: string, label: string, emoji: string }[] = [
    { id: 'all', label: 'All', emoji: '🗂️' },
    { id: 'happy', label: 'Happy', emoji: '😊' },
    { id: 'sleepy', label: 'Sleepy', emoji: '😴' },
    { id: 'playful', label: 'Playful', emoji: '🤗' },
    { id: 'kicking', label: 'Kicking', emoji: '🦶' },
    { id: 'calm', label: 'Calm', emoji: '🤔' }
  ];
  
  function getMilestoneInfo(month: number) {
    const milestones = [
      "Your baby is just a tiny embryo, about the size of a poppy seed. The neural tube, which will become the brain and spinal cord, is beginning to develop.",
      "Your baby's facial features are beginning to form, and tiny limb buds that will develop into arms and legs are visible. The heart is now beating!",
      "Your baby is about the size of a grape. Tiny fingers and toes are forming, and essential organs continue to develop.",
      "Your baby is now about the size of a lime. The face is well-formed, and your baby can make facial expressions. Gender is becoming distinguishable.",
      "Your baby now weighs about 10 ounces and is roughly 6 inches long. The baby can hear sounds from outside the womb, and movements are becoming more pronounced.",
      "Your baby is about the size of an avocado. The skin is becoming less transparent, and hair follicles are developing all over the body.",
      "Your baby weighs about 2 pounds and is around 14 inches long. The eyes have formed and can open and close. Brain tissue continues to develop.",
      "Your baby's brain is developing rapidly, and lung tissue is maturing. Your baby is about the size of a cabbage.",
      "Your baby is now fully developed and preparing for birth. The average weight is about 7.5 pounds, and length is around 20 inches."
    ];
    
    return milestones[month - 1] || "Development information not available";
  }
  
  function getMonthImage(month: number) {
    // Placeholder images
    const images = [
      "https://www.parents.com/thmb/rnrKG_WHFkh8s0IiT4X_Y9F3N74=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Embryo-Development-Collage-ebc5de8b37854a8e9a57241f969abe98.jpg",
      "https://www.parents.com/thmb/rnrKG_WHFkh8s0IiT4X_Y9F3N74=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Embryo-Development-Collage-ebc5de8b37854a8e9a57241f969abe98.jpg",
      "https://images.agoramedia.com/wte3.0/gcms/wbw-your-growing-baby-week-12-722x406.jpg",
      "https://americanpregnancy.org/wp-content/uploads/2012/04/17-week-fetus-600x351.jpg",
      "https://imagecdn.parenting.com/wp-content/uploads/2020/05/13123937/20-weeks-pregnant.jpg",
      "https://www.babycenter.com/ims/2015/01/pregnancy-week-24-ear-bones_4x3.jpg",
      "https://www.babycenter.com/ims/2015/01/pregnancy-week-28-eyelashes_4x3.jpg",
      "https://www.babycenter.com/ims/2015/01/pregnancy-week-32-toe-fingernails_4x3.jpg",
      "https://www.babycenter.com/ims/2015/01/pregnancy-week-40-mature-lungs_4x3.jpg"
    ];
    
    return images[month - 1] || images[0];
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar />
        
        <main className="flex-1 md:pl-64 pt-4 pb-20">
          <div className="px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-neutral-500 font-heading mb-6">Development Timeline</h2>
            
            {/* Timeline Navigation */}
            <div className="bg-white shadow rounded-lg mb-8 p-4">
              <div className="timeline-container flex items-center space-x-2 overflow-x-auto pb-2">
                {months.map((month) => (
                  <button 
                    key={month}
                    className={cn(
                      "timeline-item flex flex-col items-center justify-center min-w-[80px] py-2 px-4 rounded-lg focus:outline-none transition-all hover:scale-105",
                      selectedMonth === month 
                        ? "bg-primary bg-opacity-10"
                        : "hover:bg-primary hover:bg-opacity-10",
                      month > 5 && "opacity-60"
                    )}
                    onClick={() => setSelectedMonth(month)}
                  >
                    <span className={cn(
                      "text-sm font-medium",
                      selectedMonth === month ? "text-primary" : "text-neutral-400"
                    )}>
                      Month
                    </span>
                    <span className={cn(
                      "text-xl font-bold",
                      selectedMonth === month ? "text-primary" : "text-neutral-500"
                    )}>
                      {month}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Month Info */}
            {monthInfo && (
              <div className="bg-white shadow rounded-lg mb-8 overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img 
                      className="h-48 w-full object-cover md:w-48" 
                      src={monthInfo.imageUrl} 
                      alt={`Month ${monthInfo.month} development`}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="bg-secondary bg-opacity-20 text-secondary px-3 py-1 rounded-full text-xs font-medium">
                        Month {monthInfo.month}
                      </div>
                      <span className="ml-2 text-xs text-neutral-400">Week {monthInfo.weekRange}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-neutral-500 font-heading">{monthInfo.title}</h3>
                    <p className="mt-3 text-base text-neutral-400">
                      {monthInfo.description}
                    </p>
                    <div className="mt-4">
                      <a href="#" className="text-primary hover:text-opacity-80 font-medium">
                        Learn more about month {monthInfo.month} →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Emotion Categories */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-neutral-500 font-heading mb-4">
                Month {selectedMonth} Gallery
              </h3>
              <div className="bg-white shadow rounded-lg">
                <div className="border-b border-neutral-200">
                  <nav className="flex -mb-px overflow-x-auto" aria-label="Tabs">
                    {emotions.map((emotion) => (
                      <button 
                        key={emotion.id}
                        className={cn(
                          "whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm",
                          selectedEmotion === emotion.id
                            ? "text-primary border-primary"
                            : "text-neutral-400 hover:text-neutral-500 hover:border-neutral-300 border-transparent"
                        )}
                        onClick={() => setSelectedEmotion(emotion.id)}
                      >
                        <span className="mr-1">{emotion.emoji}</span> {emotion.label}
                      </button>
                    ))}
                  </nav>
                </div>
                <div className="p-4">
                  {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[...Array(6)].map((_, index) => (
                        <div key={index} className="bg-neutral-100 overflow-hidden rounded-lg shadow-sm">
                          <Skeleton className="h-40 w-full" />
                        </div>
                      ))}
                    </div>
                  ) : monthMedia && monthMedia.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {monthMedia.map((media) => (
                        <MediaCard
                          key={media.id}
                          media={media}
                          showMonth={false}
                          size="sm"
                          onClick={() => setSelectedMedia(media)}
                          className="hover:shadow"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="mx-auto w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                        <span className="text-xl">📷</span>
                      </div>
                      <h4 className="text-lg font-medium text-neutral-500 mb-2">No media yet</h4>
                      <p className="text-sm text-neutral-400 max-w-md mx-auto">
                        You haven't uploaded any {selectedEmotion !== 'all' ? `"${selectedEmotion}"` : ''} media for month {selectedMonth} yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
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
