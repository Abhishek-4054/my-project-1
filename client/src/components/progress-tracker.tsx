import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';

interface ProgressTrackerProps {
  currentWeek: number;
  totalWeeks?: number;
  dueDate?: string;
}

export function ProgressTracker({ 
  currentWeek, 
  totalWeeks = 40,
  dueDate
}: ProgressTrackerProps) {
  const remainingWeeks = Math.max(0, totalWeeks - currentWeek);
  const progressPercentage = Math.min(100, Math.round((currentWeek / totalWeeks) * 100));
  
  // Generate milestone weeks - important developmental markers
  const milestoneWeeks = [
    { week: 8, label: 'First Heartbeat' },
    { week: 12, label: 'End of First Trimester' },
    { week: 16, label: 'Baby\'s Gender Visible' },
    { week: 20, label: 'Anatomy Scan' },
    { week: 24, label: 'Viability' },
    { week: 28, label: 'Third Trimester' },
    { week: 32, label: 'Baby\'s Position' },
    { week: 36, label: 'Full Term Soon' },
    { week: 40, label: 'Due Date' },
  ];
  
  // Calculate weeks/days until next milestone
  const getNextMilestone = () => {
    const upcomingMilestones = milestoneWeeks.filter(m => m.week > currentWeek);
    if (upcomingMilestones.length === 0) return null;
    
    const nextMilestone = upcomingMilestones[0];
    const weeksUntil = nextMilestone.week - currentWeek;
    
    return {
      ...nextMilestone,
      weeksUntil
    };
  };
  
  const nextMilestone = getNextMilestone();
  
  // Calculate estimated due date in readable format
  const formatDueDate = () => {
    if (!dueDate) return 'Not set';
    
    const date = new Date(dueDate);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <Card className="border border-primary/10 shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-primary">Week {currentWeek} of Pregnancy</h3>
            <p className="text-neutral-600 text-sm mt-1">
              {remainingWeeks > 0 
                ? `${remainingWeeks} weeks until due date` 
                : 'Your baby is due any day now!'}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 text-right">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Estimated Due Date: {formatDueDate()}
            </span>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-600">Progress</span>
            <span className="text-sm font-medium text-primary">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-3">
            <div 
              className="bg-primary rounded-full h-3 relative overflow-hidden transition-all duration-1000 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute left-0 right-0 h-0.5 bg-neutral-200 top-4"></div>
          <div className="flex justify-between relative">
            {[0, 1, 2, 3].map((trimester) => {
              const week = trimester * 10;
              const isActive = currentWeek >= week;
              
              return (
                <div key={trimester} className="flex flex-col items-center relative z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-400'
                  }`}>
                    {trimester === 0 ? 0 : trimester === 3 ? '40' : trimester * 10}
                  </div>
                  <span className="text-xs mt-1 text-neutral-500">
                    {trimester === 0 
                      ? 'Start' 
                      : trimester === 1 
                        ? '1st Tri' 
                        : trimester === 2 
                          ? '2nd Tri' 
                          : 'Due Date'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-1 bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h4 className="font-medium text-blue-700 mb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                This Week's Development
              </h4>
              <p className="text-sm text-blue-600">
                {currentWeek < 10 
                  ? "Your baby's major organs are forming and tiny limb buds appear." 
                  : currentWeek < 20 
                    ? "Your baby can move, kick, swallow and hear sounds from outside." 
                    : currentWeek < 30 
                      ? "Your baby is gaining weight and developing brain function." 
                      : "Your baby is preparing for birth by gaining weight and positioning."}
              </p>
              <Link href={`/development/week-${currentWeek}`}>
                <Button variant="link" size="sm" className="text-blue-600 p-0 mt-2 h-auto">
                  Learn more about week {currentWeek}
                </Button>
              </Link>
            </div>
            
            {nextMilestone && (
              <div className="flex-1 bg-amber-50 rounded-lg p-4 border border-amber-100">
                <h4 className="font-medium text-amber-700 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Next Milestone
                </h4>
                <p className="text-sm text-amber-600">
                  <span className="font-medium">{nextMilestone.label}</span> in {nextMilestone.weeksUntil} {nextMilestone.weeksUntil === 1 ? 'week' : 'weeks'} (Week {nextMilestone.week})
                </p>
                <p className="text-xs text-amber-500 mt-1">
                  {nextMilestone.week === 12 
                    ? "First trimester complete - risk of miscarriage decreases significantly."
                    : nextMilestone.week === 20 
                      ? "Halfway there! Detailed ultrasound to check baby's anatomy."
                      : nextMilestone.week === 24 
                        ? "Baby reaches viability - important developmental milestone."
                        : nextMilestone.week === 28 
                          ? "Third trimester begins - baby's chances of survival are good."
                          : nextMilestone.week === 40 
                            ? "Your due date - though only about 5% of babies arrive on their exact due date."
                            : "Keep tracking your baby's development in the app."}
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex flex-wrap gap-2">
          <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Add Progress Photo
          </Button>
          <Button size="sm" variant="outline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Log Doctor Visit
          </Button>
          <Button size="sm" variant="outline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Track Symptoms
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}