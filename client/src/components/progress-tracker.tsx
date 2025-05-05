import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

interface ProgressTrackerProps {
  currentWeek: number;
  totalWeeks?: number;
  dueDate?: string;
}

export function ProgressTracker({
  currentWeek,
  totalWeeks = 40,
  dueDate,
}: ProgressTrackerProps) {
  const progressPercentage = Math.min(100, Math.round((currentWeek / totalWeeks) * 100));
  const remainingWeeks = Math.max(0, totalWeeks - currentWeek);

  const milestoneWeeks = [
    { week: 12, label: '1st Trimester Ends' },
    { week: 20, label: 'Anatomy Scan' },
    { week: 28, label: '3rd Trimester Starts' },
    { week: 36, label: 'Full Term Approaches' },
    { week: 40, label: 'Due Date' },
  ];

  const nextMilestone = milestoneWeeks.find(m => m.week > currentWeek);

  const formatDueDate = () =>
    dueDate
      ? new Date(dueDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : 'Not set';

  const developmentText = (() => {
    if (currentWeek < 10)
      return "Major organs are forming, and tiny limbs are starting to grow.";
    if (currentWeek < 20)
      return "Baby can hear sounds and is learning to move around.";
    if (currentWeek < 30)
      return "Rapid brain growth and weight gain underway.";
    return "Baby is preparing for birth — stay healthy and rested!";
  })();

  return (
    <Card className="border border-primary/10 shadow-md">
      <CardContent className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h3 className="text-xl font-semibold text-primary">Week {currentWeek}</h3>
            <p className="text-sm text-muted-foreground">
              {remainingWeeks > 0
                ? `${remainingWeeks} weeks until your due date`
                : "Your baby is due any moment!"}
            </p>
          </div>
          <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full mt-2 md:mt-0">
            Due: {formatDueDate()}
          </span>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-primary font-medium">{progressPercentage}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full">
            <div
              className="h-3 bg-primary rounded-full transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
          <h4 className="text-blue-700 font-medium mb-1">Baby's Development</h4>
          <p className="text-sm text-blue-600">{developmentText}</p>
          <Link href={`/development/week-${currentWeek}`}>
            <Button variant="link" size="sm" className="text-blue-700 px-0 mt-1 h-auto">
              Learn more about week {currentWeek}
            </Button>
          </Link>
        </div>

        {nextMilestone && (
          <div className="bg-amber-50 border border-amber-100 rounded-md p-4">
            <h4 className="text-amber-700 font-medium mb-1">Next Milestone</h4>
            <p className="text-sm text-amber-600">
              <strong>{nextMilestone.label}</strong> (Week {nextMilestone.week}) —{' '}
              in {nextMilestone.week - currentWeek} weeks
            </p>
          </div>
        )}

        <div className="flex gap-2 flex-wrap">
          <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
            Add Progress Photo
          </Button>
          <Button size="sm" variant="outline">
            Log Doctor Visit
          </Button>
          <Button size="sm" variant="outline">
            Track Symptoms
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
