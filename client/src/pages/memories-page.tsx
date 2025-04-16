
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Media } from '@shared/schema';

export default function MemoriesPage() {
  const { data: memories } = useQuery<Media[]>({
    queryKey: ['/api/media/recent'],
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar />
        <main className="flex-1 md:pl-64 pt-4 pb-20">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-neutral-500 font-heading">Memory Book</h2>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Memories</SelectItem>
                  <SelectItem value="photos">Photos</SelectItem>
                  <SelectItem value="notes">Notes</SelectItem>
                  <SelectItem value="scans">Scans</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {memories?.map((memory) => (
                <Card key={memory.id}>
                  <CardContent className="p-4">
                    <img src={memory.url} alt={memory.caption} className="w-full h-48 object-cover rounded-lg" />
                    <p className="mt-2 text-sm text-gray-600">{memory.caption}</p>
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
