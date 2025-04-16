
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardContent } from '@/components/ui/card';

export default function MilestonesPage() {
  const milestones = [
    { week: 12, title: "First Trimester Complete", description: "Major organs and structures are formed" },
    { week: 20, title: "Halfway Point", description: "Detailed anatomy scan and gender reveal possible" },
    { week: 24, title: "Viability", description: "Baby reaches point of potential survival outside womb" },
    { week: 28, title: "Third Trimester", description: "Final stage of pregnancy begins" },
    { week: 37, title: "Full Term", description: "Baby is considered full term and ready for arrival" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar />
        <main className="flex-1 md:pl-64 pt-4 pb-20">
          <div className="px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-neutral-500 font-heading mb-6">Pregnancy Milestones</h2>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">Week {milestone.week}: {milestone.title}</h3>
                    <p className="text-gray-600 mt-2">{milestone.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
