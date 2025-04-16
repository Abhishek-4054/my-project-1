import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BabyGrowthVisualProps {
  month: number;
  week?: number;
}

export function BabyGrowthVisual({ month, week }: BabyGrowthVisualProps) {
  // Calculate week if only month is provided
  const currentWeek = week || month * 4;
  
  // Baby size comparisons by week
  const sizeComparisons = [
    { week: 4, size: 'a poppy seed', length: '0.04 inches', weight: '<0.04 oz', icon: '🌱' },
    { week: 8, size: 'a kidney bean', length: '0.63 inches', weight: '0.04 oz', icon: '🫘' },
    { week: 12, size: 'a lime', length: '2.5 inches', weight: '0.5 oz', icon: '🍋' },
    { week: 16, size: 'an avocado', length: '4.6 inches', weight: '3.5 oz', icon: '🥑' },
    { week: 20, size: 'a banana', length: '6.5 inches', weight: '10.5 oz', icon: '🍌' },
    { week: 24, size: 'an ear of corn', length: '11.8 inches', weight: '1.3 lbs', icon: '🌽' },
    { week: 28, size: 'an eggplant', length: '14.8 inches', weight: '2.2 lbs', icon: '🍆' },
    { week: 32, size: 'a squash', length: '16.7 inches', weight: '3.8 lbs', icon: '🎃' },
    { week: 36, size: 'a head of romaine lettuce', length: '18.7 inches', weight: '5.8 lbs', icon: '🥬' },
    { week: 40, size: 'a small pumpkin', length: '20.2 inches', weight: '7.6 lbs', icon: '🎃' }
  ];
  
  // Find closest size comparison
  const getCurrentSize = () => {
    for (let i = sizeComparisons.length - 1; i >= 0; i--) {
      if (currentWeek >= sizeComparisons[i].week) {
        return sizeComparisons[i];
      }
    }
    return sizeComparisons[0];
  };
  
  const currentSize = getCurrentSize();
  
  const getBabyImage = (week: number) => {
    if (week <= 8) return "https://cdn-icons-png.flaticon.com/512/4378/4378534.png";
    if (week <= 16) return "https://cdn-icons-png.flaticon.com/512/4378/4378495.png";
    if (week <= 24) return "https://cdn-icons-png.flaticon.com/512/4378/4378482.png";
    if (week <= 32) return "https://cdn-icons-png.flaticon.com/512/4378/4378446.png";
    return "https://cdn-icons-png.flaticon.com/512/4378/4378391.png";
  }
  
  // Development milestones by week
  const getDevelopmentMilestones = () => {
    if (currentWeek <= 4) {
      return [
        "The fertilized egg implants in the uterus",
        "The placenta begins to form",
        "The neural tube (future brain and spinal cord) develops"
      ];
    } else if (currentWeek <= 8) {
      return [
        "Baby's heart begins to beat",
        "Arm and leg buds appear",
        "Basic facial features are forming"
      ];
    } else if (currentWeek <= 12) {
      return [
        "All essential organs have begun to form",
        "External ears are developing",
        "Baby can open and close their fists"
      ];
    } else if (currentWeek <= 16) {
      return [
        "Baby's sex becomes visible",
        "Baby begins to make facial expressions",
        "Baby begins to hear sounds"
      ];
    } else if (currentWeek <= 20) {
      return [
        "Baby's movement can be felt (quickening)",
        "Baby develops sleep patterns",
        "Baby's skin is covered with vernix caseosa"
      ];
    } else if (currentWeek <= 24) {
      return [
        "Baby's fingerprints are formed",
        "Baby's lungs begin to develop surfactant",
        "Baby may respond to loud sounds"
      ];
    } else if (currentWeek <= 28) {
      return [
        "Baby's eyes begin to open",
        "Brain tissue continues to develop",
        "Baby begins to practice breathing movements"
      ];
    } else if (currentWeek <= 32) {
      return [
        "Baby's bones are fully formed, but still soft",
        "Baby can now see",
        "Baby is growing rapidly and gaining weight"
      ];
    } else if (currentWeek <= 36) {
      return [
        "Baby's lungs are nearly fully developed",
        "Baby gains weight rapidly",
        "Baby moves to a head-down position"
      ];
    } else {
      return [
        "Baby is considered full term after week 37",
        "Most brain development is complete",
        "Baby continues to gain weight, about 1/2 pound per week"
      ];
    }
  };
  
  const milestones = getDevelopmentMilestones();
  
  return (
    <Card className="overflow-hidden border border-primary/10 shadow-md">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-4 border-b border-primary/10">
        <h3 className="text-xl font-semibold text-primary">
          Your Baby at Week {currentWeek}
        </h3>
        <p className="text-neutral-600 text-sm">
          Watch as your little one grows and develops
        </p>
      </div>
      
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 md:max-w-[220px] text-center">
            <div className="mx-auto w-36 h-36 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-5xl" role="img" aria-label={`Size like ${currentSize.size}`}>
                {currentSize.icon}
              </span>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium text-neutral-700">Size Comparison</h4>
              <p className="text-primary text-2xl font-light">{currentSize.size}</p>
              
              <div className="mt-3 flex justify-center gap-4 text-center">
                <div>
                  <p className="text-xs text-neutral-500">LENGTH</p>
                  <p className="text-sm font-medium text-neutral-700">{currentSize.length}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">WEIGHT</p>
                  <p className="text-sm font-medium text-neutral-700">{currentSize.weight}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <h4 className="font-medium text-neutral-700 mb-3">Development Highlights</h4>
            <ul className="space-y-2">
              {milestones.map((milestone, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 bg-primary/10 rounded-full p-1 mt-0.5 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-neutral-600">{milestone}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-5 pt-4 border-t border-neutral-100">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-neutral-700">Normal Fetal Heart Rate</h4>
                <div className="bg-primary/10 text-primary text-sm font-medium px-2 py-0.5 rounded">
                  {currentWeek < 12 
                    ? '160-180 BPM' 
                    : currentWeek < 20 
                      ? '140-160 BPM' 
                      : '120-140 BPM'}
                </div>
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                A normal fetal heart rate changes throughout pregnancy. It starts slower, increases, and then gradually decreases as your baby grows.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between">
          <Button size="sm" variant="outline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Previous Week
          </Button>
          <Button size="sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Save to Memory Book
          </Button>
          <Button size="sm" variant="outline">
            Next Week
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}