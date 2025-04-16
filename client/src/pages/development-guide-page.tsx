
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { MobileNavigation } from '@/components/layout/mobile-navigation';
import { BabyGrowthVisual } from '@/components/baby-growth-visual';
import { useAuth } from '@/hooks/use-auth';

export default function DevelopmentGuidePage() {
  const { user } = useAuth();
  
  const getCurrentMonth = () => {
    if (!user?.dueDate) return 1;
    const dueDate = new Date(user.dueDate);
    const today = new Date();
    const conceptionDate = new Date(dueDate);
    conceptionDate.setDate(conceptionDate.getDate() - 280);
    const monthsDiff = (today.getFullYear() - conceptionDate.getFullYear()) * 12 + 
                      (today.getMonth() - conceptionDate.getMonth());
    return Math.min(Math.max(1, monthsDiff + 1), 9);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar />
        
        <main className="flex-1 md:pl-64 pt-4 pb-20">
          <div className="px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-primary mb-6">Development Guide</h1>
            <BabyGrowthVisual month={getCurrentMonth()} />
          </div>
        </main>
        
        <MobileNavigation />
      </div>
    </div>
  );
}
