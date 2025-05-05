import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Calendar, PlusCircle } from 'lucide-react';

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
    { id: '1', task: 'Schedule first prenatal appointment', category: 'medical', trimester: 1, priority: 'high', completed: false, dueWeek: 8 },
    { id: '2', task: 'Start taking prenatal vitamins', category: 'medical', trimester: 1, priority: 'high', completed: false, dueWeek: 4 },
    { id: '3', task: 'Research health insurance coverage', category: 'financial', trimester: 1, priority: 'medium', completed: false, dueWeek: 12 },
    { id: '4', task: 'Calculate estimated due date', category: 'planning', trimester: 1, priority: 'medium', completed: false, dueWeek: 4 },
    { id: '5', task: 'Schedule anatomy scan (20 weeks)', category: 'medical', trimester: 2, priority: 'high', completed: false, dueWeek: 18 },
    { id: '6', task: 'Start a baby registry', category: 'shopping', trimester: 2, priority: 'medium', completed: false, dueWeek: 20 },
    { id: '7', task: 'Research childcare options', category: 'planning', trimester: 2, priority: 'medium', completed: false, dueWeek: 24 },
    { id: '8', task: 'Start planning nursery', category: 'home', trimester: 2, priority: 'low', completed: false, dueWeek: 22 },
    { id: '9', task: 'Pack hospital bag', category: 'planning', trimester: 3, priority: 'high', completed: false, dueWeek: 36 },
    { id: '10', task: 'Install car seat', category: 'home', trimester: 3, priority: 'high', completed: false, dueWeek: 36 },
    { id: '11', task: 'Take childbirth classes', category: 'education', trimester: 3, priority: 'medium', completed: false, dueWeek: 32 },
    { id: '12', task: 'Prepare and freeze meals', category: 'home', trimester: 3, priority: 'medium', completed: false, dueWeek: 36 },
    { id: '13', task: 'Create a birth plan', category: 'planning', trimester: 3, priority: 'high', completed: false, dueWeek: 34 },
    { id: '14', task: 'Arrange maternity/paternity leave', category: 'financial', trimester: 3, priority: 'high', completed: false, dueWeek: 30 },
    { id: '15', task: 'Join a prenatal yoga or fitness class', category: 'wellness', trimester: 1, priority: 'medium', completed: false, dueWeek: 10 },
    { id: '16', task: 'Download a pregnancy tracking app', category: 'planning', trimester: 1, priority: 'low', completed: false, dueWeek: 6 },
    { id: '17', task: 'Start a pregnancy journal', category: 'emotional', trimester: 1, priority: 'low', completed: false, dueWeek: 6 },
    { id: '18', task: 'Attend a partner bonding session', category: 'relationship', trimester: 2, priority: 'medium', completed: false, dueWeek: 22 },
    { id: '19', task: 'Explore baby names together', category: 'planning', trimester: 2, priority: 'low', completed: false, dueWeek: 24 },
    { id: '20', task: 'Create a monthly budget for baby expenses', category: 'financial', trimester: 2, priority: 'medium', completed: false, dueWeek: 20 },
    { id: '21', task: 'Take maternity/paternity photos', category: 'emotional', trimester: 3, priority: 'low', completed: false, dueWeek: 34 },
    { id: '22', task: 'Write letters to your baby', category: 'emotional', trimester: 3, priority: 'low', completed: false, dueWeek: 36 },
    { id: '23', task: 'Finalize pediatrician selection', category: 'medical', trimester: 3, priority: 'high', completed: false, dueWeek: 30 },
    { id: '24', task: 'Organize important documents for birth', category: 'planning', trimester: 3, priority: 'high', completed: false, dueWeek: 32 },
  ]);

  const toggleItem = (id: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const getFilteredItems = () => {
    if (activeTab === 'all') return items;
    if (activeTab === 'completed') return items.filter(i => i.completed);
    if (activeTab === 'incomplete') return items.filter(i => !i.completed);
    return items.filter(i => i.trimester === parseInt(activeTab));
  };

  const filteredItems = getFilteredItems();

  const overallProgress = {
    completed: items.filter(item => item.completed).length,
    total: items.length,
    percentage: Math.round((items.filter(item => item.completed).length / items.length) * 100),
  };

  const handleAddTask = () => {
    console.log("Open Add Task Form");
  };

  return (
    <Card className="border border-primary/10 shadow-lg p-4 rounded-2xl">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between mb-4">
          <CardTitle className="text-xl font-bold text-primary">Pregnancy Checklist</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap justify-center gap-2 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
            <TabsTrigger value="1">Trimester 1</TabsTrigger>
            <TabsTrigger value="2">Trimester 2</TabsTrigger>
            <TabsTrigger value="3">Trimester 3</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map(item => (
                <Card key={item.id} className="bg-white p-4 shadow-sm border border-gray-200 rounded-xl transition hover:shadow-md">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-800">{item.task}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex flex-col text-xs text-gray-500">
                      <span>Priority: <Badge>{item.priority}</Badge></span>
                      {item.dueWeek && <span>Due: Week {item.dueWeek}</span>}
                    </div>
                    <Checkbox checked={item.completed} onCheckedChange={() => toggleItem(item.id)} />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-4">
        <span className="text-sm text-gray-500">
          Overall progress: <strong>{overallProgress.percentage}%</strong>
        </span>
        <Button onClick={handleAddTask} size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
          <PlusCircle className="mr-2 h-5 w-5" />
          Add Task
        </Button>
      </CardFooter>
    </Card>
  );
}
