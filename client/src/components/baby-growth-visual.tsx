// components/BabyGrowthVisual.tsx

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { BabyIcon } from 'lucide-react';

interface BabyGrowthVisualProps {
  month: number;
}

export function BabyGrowthVisual({ month }: BabyGrowthVisualProps) {
  const developmentData = [
    {
      month: 1,
      size: "Size of a poppy seed (0.1 inch) 🌱",
      weight: "Less than 1 gram",
      developments: [
        "Heart begins to beat",
        "Neural tube forms",
        "Basic structure begins to form"
      ]
    },
    {
      month: 2,
      size: "Size of a raspberry (0.63 inch) 🍓",
      weight: "3-4 grams",
      developments: [
        "Facial features forming",
        "Limb buds appear",
        "Brain development accelerates"
      ]
    },
    {
      month: 3,
      size: "Size of a lime (3 inches) 🍋",
      weight: "30 grams",
      developments: [
        "External genitalia begin to form",
        "Fingers and toes are well-defined",
        "Can make a fist and move arms"
      ]
    },
    {
      month: 4,
      size: "Size of an avocado (5-6 inches) 🥑",
      weight: "100-200 grams",
      developments: [
        "Can hear sounds",
        "Facial muscles develop",
        "Beginning to form taste buds"
      ]
    },
    {
      month: 5,
      size: "Size of a banana (10 inches) 🍌",
      weight: "300-450 grams",
      developments: [
        "Sleep patterns develop",
        "Hair and nails growing",
        "Movement becomes stronger"
      ]
    },
    {
      month: 6,
      size: "Size of a mango (12 inches) 🥭",
      weight: "600-700 grams",
      developments: [
        "Eyes can open and close",
        "Fingerprints are formed",
        "Responds to sounds"
      ]
    },
    {
      month: 7,
      size: "Size of a cauliflower (14 inches) 🥦",
      weight: "900-1000 grams",
      developments: [
        "Brain growth rapid",
        "Regular movement patterns",
        "Can hiccup"
      ]
    },
    {
      month: 8,
      size: "Size of a pumpkin (18 inches) 🎃",
      weight: "2000-2500 grams",
      developments: [
        "Fat layers forming",
        "Most organs mature",
        "Can see and hear well"
      ]
    },
    {
      month: 9,
      size: "Size of a watermelon (20+ inches) 🍉",
      weight: "3000-3500 grams",
      developments: [
        "Lungs fully mature",
        "Position for birth",
        "Immune system developing"
      ]
    }
  ];

  const currentData = developmentData[month - 1] || developmentData[0];
  const progressValue = (month / 9) * 100;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-pink-50 to-purple-100 border-none shadow-xl rounded-2xl">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Section */}
            <div className="flex-1">
              <h4 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                <BabyIcon className="h-5 w-5 text-pink-500" /> Month {month} Growth Overview
              </h4>
              <div className="space-y-4 text-sm md:text-base">
                <div>
                  <p className="text-neutral-600 font-medium">Size</p>
                  <p className="text-neutral-800">{currentData.size}</p>
                </div>
                <div>
                  <p className="text-neutral-600 font-medium">Weight</p>
                  <p className="text-neutral-800">{currentData.weight}</p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex-1">
              <h4 className="text-xl font-bold text-purple-700 mb-4">Key Developments</h4>
              <ul className="space-y-2">
                {currentData.developments.map((dev, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-400 mt-1" />
                    <span className="text-neutral-700 text-sm">{dev}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex justify-between text-sm text-neutral-600 mb-1">
              <span>Pregnancy Progress</span>
              <span>{Math.round(progressValue)}%</span>
            </div>
            <Progress value={progressValue} className="h-2 bg-purple-200" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
