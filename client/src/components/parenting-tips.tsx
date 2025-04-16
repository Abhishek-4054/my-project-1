
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TipCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  tips: Tip[];
}

interface Tip {
  id: string;
  title: string;
  content: string;
  source?: string;
}

export function ParentingTips() {
  const [activeTab, setActiveTab] = useState<string>('week');
  
  const weeklyTips: TipCategory = {
    id: 'week',
    label: 'This Week',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    tips: [
      {
        id: 'week-1',
        title: 'Stay Hydrated',
        content: 'During pregnancy, blood volume increases significantly. Drinking enough water helps maintain this increased blood volume and helps prevent common problems such as constipation and UTIs.',
        source: 'American Pregnancy Association'
      },
      {
        id: 'week-2',
        title: 'Track Your Baby\'s Movements',
        content: 'Starting around 28 weeks, your baby should move 10 times within a two-hour period. If you notice decreased movement, contact your healthcare provider.',
        source: 'Mayo Clinic'
      },
      {
        id: 'week-3',
        title: 'Sleep Position Matters',
        content: 'As your pregnancy progresses, try to sleep on your left side to improve blood flow to your heart, baby, and kidneys. Avoid sleeping flat on your back.',
        source: 'American College of Obstetricians and Gynecologists'
      }
    ]
  };
  
  const nutritionTips: TipCategory = {
    id: 'nutrition',
    label: 'Nutrition',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
    tips: [
      {
        id: 'nutrition-1',
        title: 'Folate-Rich Foods',
        content: 'Folate is crucial for preventing neural tube defects. Include dark leafy greens, citrus fruits, beans, and fortified cereals in your diet.',
        source: 'CDC'
      },
      {
        id: 'nutrition-2',
        title: 'Iron Sources',
        content: 'Your iron needs increase during pregnancy. Good sources include lean red meat, poultry, fish, beans, and iron-fortified cereals.',
        source: 'WebMD'
      },
      {
        id: 'nutrition-3',
        title: 'Calcium Importance',
        content: 'Calcium helps build your baby\'s bones and teeth. Dairy products, fortified plant milks, broccoli, and kale are excellent sources.',
        source: 'NIH'
      }
    ]
  };
  
  const wellbeingTips: TipCategory = {
    id: 'wellbeing',
    label: 'Wellbeing',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    tips: [
      {
        id: 'wellbeing-1',
        title: 'Gentle Exercise',
        content: 'Regular, moderate exercise can help reduce pregnancy discomforts, improve mood, and prepare your body for labor. Walking, swimming, and prenatal yoga are excellent options.',
        source: 'ACOG'
      },
      {
        id: 'wellbeing-2',
        title: 'Manage Stress',
        content: 'High stress levels can affect your baby. Try relaxation techniques like deep breathing, prenatal yoga, or meditation. Don\'t hesitate to talk to your healthcare provider if you feel overwhelmed.',
        source: 'March of Dimes'
      },
      {
        id: 'wellbeing-3',
        title: 'Rest When Needed',
        content: 'Listen to your body and rest when you need to. Pregnancy takes a lot of energy, and fatigue is common. Try to get enough sleep and take short naps if needed.',
        source: 'Cleveland Clinic'
      }
    ]
  };
  
  const categories: TipCategory[] = [weeklyTips, nutritionTips, wellbeingTips];
  const activeCategory = categories.find(cat => cat.id === activeTab) || categories[0];
  
  return (
    <Card className="border border-primary/10 shadow-md">
      <CardContent className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-primary mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Parenting Tips & Advice
        </h3>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4 w-full">
            {categories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center justify-center px-2 sm:px-4"
              >
                <span className="hidden sm:inline mr-1.5">{category.icon}</span>
                <span className="text-xs sm:text-sm">{category.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {category.tips.map((tip, index) => (
                  <div 
                    key={tip.id} 
                    className={`p-3 sm:p-4 rounded-lg transform transition-all duration-200 hover:scale-[1.02] ${
                      index % 3 === 0 
                        ? 'bg-pink-50 border border-pink-100' 
                        : index % 3 === 1 
                          ? 'bg-blue-50 border border-blue-100' 
                          : 'bg-amber-50 border border-amber-100'
                    }`}
                  >
                    <h4 className={`font-medium text-sm sm:text-base mb-2 ${
                      index % 3 === 0 
                        ? 'text-pink-700' 
                        : index % 3 === 1 
                          ? 'text-blue-700' 
                          : 'text-amber-700'
                    }`}>
                      {tip.title}
                    </h4>
                    <p className={`text-xs sm:text-sm ${
                      index % 3 === 0 
                        ? 'text-pink-600' 
                        : index % 3 === 1 
                          ? 'text-blue-600' 
                          : 'text-amber-600'
                    }`}>
                      {tip.content}
                    </p>
                    {tip.source && (
                      <p className={`text-xs mt-1.5 ${
                        index % 3 === 0 
                          ? 'text-pink-500' 
                          : index % 3 === 1 
                            ? 'text-blue-500' 
                            : 'text-amber-500'
                      }`}>
                        Source: {tip.source}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="bg-neutral-50 border-t border-neutral-100 p-3 sm:p-4 flex flex-col sm:flex-row justify-between gap-2">
        <Button variant="link" size="sm" className="text-neutral-600 p-0 h-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span className="text-xs sm:text-sm">See All Tips</span>
        </Button>
        <Button variant="link" size="sm" className="text-primary p-0 h-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          <span className="text-xs sm:text-sm">Share Tips</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
