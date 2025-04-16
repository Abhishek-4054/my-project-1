
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { MobileNavigation } from '@/components/layout/mobile-navigation';
import { ParentingTips } from '@/components/parenting-tips';

export default function ParentingTipsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar />
        
        <main className="flex-1 md:pl-64 pt-4 pb-20">
          <div className="px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-primary mb-6">Parenting Resources</h1>
            <ParentingTips />
          </div>
        </main>
        
        <MobileNavigation />
      </div>
    </div>
  );
}
