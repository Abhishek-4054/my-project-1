import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from "./ui/progress";

interface BabyGrowthVisualProps {
  month: number;
}

export function BabyGrowthVisual({ month }: BabyGrowthVisualProps) {
  const developmentData = [
    {
      month: 1,
      size: "Size of a poppy seed (0.1 inch)",
      weight: "Less than 1 gram",
      developments: [
        "Heart begins to beat",
        "Neural tube forms",
        "Basic structure begins to form"
      ]
    },
    {
      month: 2,
      size: "Size of a raspberry (0.63 inch)",
      weight: "3-4 grams",
      developments: [
        "Facial features forming",
        "Limb buds appear",
        "Brain development accelerates"
      ]
    },
    {
      month: 3,
      size: "Size of a lime (3 inches)",
      weight: "30 grams",
      developments: [
        "External genitalia begin to form",
        "Fingers and toes are well-defined",
        "Can make a fist and move arms"
      ]
    },
    {
      month: 4,
      size: "Size of an avocado (5-6 inches)",
      weight: "100-200 grams",
      developments: [
        "Can hear sounds",
        "Facial muscles develop",
        "Beginning to form taste buds"
      ]
    },
    {
      month: 5,
      size: "Size of a banana (10 inches)",
      weight: "300-450 grams",
      developments: [
        "Sleep patterns develop",
        "Hair and nails growing",
        "Movement becomes stronger"
      ]
    },
    {
      month: 6,
      size: "Size of a mango (12 inches)",
      weight: "600-700 grams",
      developments: [
        "Eyes can open and close",
        "Fingerprints are formed",
        "Responds to sounds"
      ]
    },
    {
      month: 7,
      size: "Size of a cauliflower (14 inches)",
      weight: "900-1000 grams",
      developments: [
        "Brain growth rapid",
        "Regular movement patterns",
        "Can hiccup"
      ]
    },
    {
      month: 8,
      size: "Size of a pumpkin (18 inches)",
      weight: "2000-2500 grams",
      developments: [
        "Fat layers forming",
        "Most organs mature",
        "Can see and hear well"
      ]
    },
    {
      month: 9,
      size: "Size of a watermelon (20+ inches)",
      weight: "3000-3500 grams",
      developments: [
        "Lungs fully mature",
        "Position for birth",
        "Immune system developing"
      ]
    }
  ];

  const currentData = developmentData[month - 1] || developmentData[0];

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-primary mb-4">Month {month} Development</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-neutral-500">Size</p>
                  <p className="text-base text-neutral-700">{currentData.size}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500">Weight</p>
                  <p className="text-base text-neutral-700">{currentData.weight}</p>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h4 className="text-lg font-semibold text-primary mb-4">Key Developments</h4>
              <ul className="space-y-2">
                {currentData.developments.map((dev, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary/60" />
                    <span className="text-sm text-neutral-600">{dev}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm text-neutral-500 mb-2">
              <span>Progress</span>
              <span>{Math.round((month/9)*100)}%</span>
            </div>
            <Progress value={(month/9)*100} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}