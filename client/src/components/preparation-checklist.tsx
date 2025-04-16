import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Check, 
  Calendar, 
  ShoppingCart, 
  Home, 
  FileText, 
  PlusCircle,
  Filter
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  task: string;
  category: string;
  trimester: number;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueWeek?: number;
}

export function PreparationChecklist() {
  const [activeTab, setActiveTab] = useState('all');
  const [items, setItems] = useState<ChecklistItem[]>([
    // First Trimester
    { 
      id: '1', 
      task: 'Schedule first prenatal appointment', 
      category: 'medical', 
      trimester: 1, 
      priority: 'high', 
      completed: false,
      dueWeek: 8
    },
    { 
      id: '2', 
      task: 'Start taking prenatal vitamins', 
      category: 'medical', 
      trimester: 1, 
      priority: 'high', 
      completed: false,
      dueWeek: 4
    },
    { 
      id: '3', 
      task: 'Research health insurance coverage', 
      category: 'financial', 
      trimester: 1, 
      priority: 'medium', 
      completed: false,
      dueWeek: 12
    },
    { 
      id: '4', 
      task: 'Calculate estimated due date', 
      category: 'planning', 
      trimester: 1, 
      priority: 'medium', 
      completed: false,
      dueWeek: 4
    },
    
    // Second Trimester
    { 
      id: '5', 
      task: 'Schedule anatomy scan (20 weeks)', 
      category: 'medical', 
      trimester: 2, 
      priority: 'high', 
      completed: false,
      dueWeek: 18
    },
    { 
      id: '6', 
      task: 'Start a baby registry', 
      category: 'shopping', 
      trimester: 2, 
      priority: 'medium', 
      completed: false,
      dueWeek: 20
    },
    { 
      id: '7', 
      task: 'Research childcare options', 
      category: 'planning', 
      trimester: 2, 
      priority: 'medium', 
      completed: false,
      dueWeek: 24
    },
    { 
      id: '8', 
      task: 'Start planning nursery', 
      category: 'home', 
      trimester: 2, 
      priority: 'low', 
      completed: false,
      dueWeek: 22
    },
    
    // Third Trimester
    { 
      id: '9', 
      task: 'Pack hospital bag', 
      category: 'planning', 
      trimester: 3, 
      priority: 'high', 
      completed: false,
      dueWeek: 36
    },
    { 
      id: '10', 
      task: 'Install car seat', 
      category: 'home', 
      trimester: 3, 
      priority: 'high', 
      completed: false,
      dueWeek: 36
    },
    { 
      id: '11', 
      task: 'Take childbirth classes', 
      category: 'education', 
      trimester: 3, 
      priority: 'medium', 
      completed: false,
      dueWeek: 32
    },
    { 
      id: '12', 
      task: 'Prepare and freeze meals', 
      category: 'home', 
      trimester: 3, 
      priority: 'medium', 
      completed: false,
      dueWeek: 36
    },
    { 
      id: '13', 
      task: 'Create a birth plan', 
      category: 'planning', 
      trimester: 3, 
      priority: 'high', 
      completed: false,
      dueWeek: 34
    },
    { 
      id: '14', 
      task: 'Arrange maternity/paternity leave', 
      category: 'financial', 
      trimester: 3, 
      priority: 'high', 
      completed: false,
      dueWeek: 30
    },
  ]);
  
  const toggleItem = (id: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, completed: !item.completed } 
          : item
      )
    );
  };
  
  // Filter items based on active tab
  const getFilteredItems = () => {
    if (activeTab === 'all') {
      return items;
    } else if (activeTab === 'completed') {
      return items.filter(item => item.completed);
    } else if (activeTab === 'incomplete') {
      return items.filter(item => !item.completed);
    } else {
      return items.filter(item => item.trimester === parseInt(activeTab));
    }
  };
  
  const filteredItems = getFilteredItems();
  
  // Count completed and total items for each trimester
  const getTrimesterProgress = (trimester: number) => {
    const trimesterItems = items.filter(item => item.trimester === trimester);
    const completedItems = trimesterItems.filter(item => item.completed);
    return {
      completed: completedItems.length,
      total: trimesterItems.length,
      percentage: Math.round((completedItems.length / trimesterItems.length) * 100) || 0
    };
  };
  
  const firstTrimesterProgress = getTrimesterProgress(1);
  const secondTrimesterProgress = getTrimesterProgress(2);
  const thirdTrimesterProgress = getTrimesterProgress(3);
  
  // Get priority badge color
  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'medical':
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>;
      case 'financial':
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>;
      case 'shopping':
        return <ShoppingCart className="h-4 w-4" />;
      case 'home':
        return <Home className="h-4 w-4" />;
      case 'planning':
        return <Calendar className="h-4 w-4" />;
      case 'education':
        return <FileText className="h-4 w-4" />;
      default:
        return <Check className="h-4 w-4" />;
    }
  };
  
  // Get overall completion percentage
  const overallProgress = {
    completed: items.filter(item => item.completed).length,
    total: items.length,
    percentage: Math.round((items.filter(item => item.completed).length / items.length) * 100)
  };
  
  return (
    <Card className="border border-primary/10 shadow-md">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-primary flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Pregnancy Checklist
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Filter className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="bg-blue-50 rounded-lg p-2 border border-blue-100">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-blue-700">First Trimester</span>
              <span className="text-xs text-blue-700">{firstTrimesterProgress.completed}/{firstTrimesterProgress.total}</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-1.5">
              <div 
                className="bg-blue-500 h-1.5 rounded-full"
                style={{ width: `${firstTrimesterProgress.percentage}%` }}
              />
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-2 border border-purple-100">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-purple-700">Second Trimester</span>
              <span className="text-xs text-purple-700">{secondTrimesterProgress.completed}/{secondTrimesterProgress.total}</span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-1.5">
              <div 
                className="bg-purple-500 h-1.5 rounded-full"
                style={{ width: `${secondTrimesterProgress.percentage}%` }}
              />
            </div>
          </div>
          
          <div className="bg-pink-50 rounded-lg p-2 border border-pink-100">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-pink-700">Third Trimester</span>
              <span className="text-xs text-pink-700">{thirdTrimesterProgress.completed}/{thirdTrimesterProgress.total}</span>
            </div>
            <div className="w-full bg-pink-200 rounded-full h-1.5">
              <div 
                className="bg-pink-500 h-1.5 rounded-full"
                style={{ width: `${thirdTrimesterProgress.percentage}%` }}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="1">1st Tri</TabsTrigger>
            <TabsTrigger value="2">2nd Tri</TabsTrigger>
            <TabsTrigger value="3">3rd Tri</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <div className="space-y-2">
            {filteredItems.length === 0 ? (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="mt-2 text-neutral-500">No items found</p>
              </div>
            ) : (
              filteredItems.map(item => (
                <div 
                  key={item.id} 
                  className={`flex items-start p-3 rounded-lg border ${
                    item.completed 
                      ? 'bg-neutral-50 border-neutral-200' 
                      : 'bg-white border-neutral-200 hover:border-primary/20'
                  } transition-colors`}
                >
                  <Checkbox 
                    id={`task-${item.id}`}
                    checked={item.completed}
                    onCheckedChange={() => toggleItem(item.id)}
                    className="mt-0.5"
                  />
                  <div className="ml-3 flex-1">
                    <label 
                      htmlFor={`task-${item.id}`}
                      className={`text-sm font-medium cursor-pointer ${
                        item.completed ? 'text-neutral-400 line-through' : 'text-neutral-700'
                      }`}
                    >
                      {item.task}
                    </label>
                    
                    <div className="mt-1 flex items-center flex-wrap gap-2">
                      <div className="flex items-center">
                        <div className="h-5 w-5 rounded-full bg-neutral-100 flex items-center justify-center mr-1">
                          {getCategoryIcon(item.category)}
                        </div>
                        <span className="text-xs text-neutral-500 capitalize">{item.category}</span>
                      </div>
                      
                      {item.dueWeek && (
                        <div className="flex items-center">
                          <div className="h-5 w-5 rounded-full bg-neutral-100 flex items-center justify-center mr-1">
                            <Calendar className="h-3 w-3" />
                          </div>
                          <span className="text-xs text-neutral-500">Week {item.dueWeek}</span>
                        </div>
                      )}
                      
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getPriorityColor(item.priority)}`}
                      >
                        {item.priority} priority
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t border-neutral-100 py-3">
        <div className="flex items-center">
          <div className="w-full bg-neutral-200 rounded-full h-2 w-24 mr-3">
            <div 
              className="bg-primary rounded-full h-2"
              style={{ width: `${overallProgress.percentage}%` }}
            />
          </div>
          <span className="text-xs text-neutral-500">
            {overallProgress.completed}/{overallProgress.total} completed
          </span>
        </div>
        <Button size="sm">
          Add Task
        </Button>
      </CardFooter>
    </Card>
  );
}