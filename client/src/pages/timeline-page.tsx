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

  const { data: monthMedia, isLoading, isError } = useQuery<Media[]>({
    queryKey: ['/api/media/month', selectedMonth, 'emotion', selectedEmotion],
  });

  const { data: monthInfo } = useQuery<any>({
    queryKey: ['/api/month-info', selectedMonth],
    queryFn: async () => {
      return {
        month: selectedMonth,
        weekRange: `${(selectedMonth - 1) * 4 + 1}-${selectedMonth * 4}`,
        title: 'Key Development Milestones',
        description: getMilestoneInfo(selectedMonth),
        imageUrl: getMonthImage(selectedMonth),
      };
    }
  });

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const emotions = [
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
    <div className="flex flex-col min-h-screen bg-neutral-50 text-neutral-800">
      <Header />

      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar />

        <main className="flex-1 md:pl-64 pt-6 pb-20">
          <div className="px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-primary font-heading mb-8">Baby Development Timeline</h2>

            {/* Timeline Navigation */}
            <div className="bg-white shadow-lg rounded-xl mb-10 p-4 border border-neutral-200 transition-all hover:shadow-2xl">
              <div className="flex items-center justify-start space-x-2 overflow-x-auto pb-2">
                {months.map((month) => (
                  <button
                    key={month}
                    className={cn(
                      "flex flex-col items-center justify-center min-w-[80px] py-2 px-4 rounded-xl transition-all text-sm font-medium",
                      selectedMonth === month
                        ? "bg-primary text-white shadow-md"
                        : "bg-neutral-100 text-neutral-600 hover:bg-primary hover:text-white"
                    )}
                    onClick={() => setSelectedMonth(month)}
                  >
                    Month {month}
                  </button>
                ))}
              </div>
            </div>

            {/* Month Info Section */}
            {monthInfo && (
              <div className="bg-white border border-neutral-200 shadow-lg rounded-xl overflow-hidden mb-10 transition-all hover:shadow-2xl">
                <div className="md:flex">
                  <img
                    className="h-56 w-full object-cover md:w-56"
                    src={monthInfo.imageUrl}
                    alt={`Month ${monthInfo.month} development`}
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-primary font-semibold mb-1">
                      <span>Month {monthInfo.month}</span>
                      <span className="text-neutral-400">|</span>
                      <span className="text-neutral-400">Week {monthInfo.weekRange}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-neutral-700">{monthInfo.title}</h3>
                    <p className="text-neutral-600 mb-4 leading-relaxed">{monthInfo.description}</p>
                    <a href="#" className="text-sm text-primary hover:underline">Learn more about month {monthInfo.month} →</a>
                  </div>
                </div>
              </div>
            )}

            {/* Emotion Filter */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-neutral-700 mb-3">Gallery by Emotion</h3>
              <div className="flex overflow-x-auto gap-2 pb-2">
                {emotions.map((emotion) => (
                  <button
                    key={emotion.id}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all border",
                      selectedEmotion === emotion.id
                        ? "bg-primary text-white border-primary"
                        : "bg-white border-neutral-200 text-neutral-600 hover:bg-primary hover:text-white"
                    )}
                    onClick={() => setSelectedEmotion(emotion.id)}
                  >
                    <span>{emotion.emoji}</span>
                    {emotion.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Media Gallery */}
            <div className="bg-white border border-neutral-200 shadow rounded-xl p-4">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-40 w-full rounded-lg" />
                  ))}
                </div>
              ) : isError ? (
                <div className="text-center py-12">
                  <h4 className="text-lg font-medium text-neutral-600 mb-2">Error loading media</h4>
                  <p className="text-sm text-neutral-500">There was an issue fetching the data. Please try again later.</p>
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
                      className="hover:shadow-md rounded-lg transition-transform transform hover:scale-105"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-neutral-100 rounded-full">
                    📷
                  </div>
                  <h4 className="text-lg font-medium text-neutral-600 mb-2">No media yet</h4>
                  <p className="text-sm text-neutral-500">
                    You haven't uploaded any {selectedEmotion !== 'all' ? `"${selectedEmotion}"` : ''} media for month {selectedMonth} yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        <MobileNavigation />
      </div>

      {selectedMedia && (
        <MediaViewer media={selectedMedia} onClose={() => setSelectedMedia(null)} />
      )}
    </div>
  );
}
