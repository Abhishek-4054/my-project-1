
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

const premiumVideos = [
  {
    id: 1,
    title: "Understanding Baby Development",
    description: "Expert insights on tracking your baby's growth milestones.",
    thumbnailUrl: "https://cdn-icons-png.flaticon.com/512/4994/4994354.png",
    videoUrl: "/premium/video1.mp4",
    isPremium: true
  },
  {
    id: 2,
    title: "Preparing for Parenthood",
    description: "Essential tips and guidance for new parents.",
    thumbnailUrl: "https://cdn-icons-png.flaticon.com/512/4994/4994357.png",
    videoUrl: "/premium/video2.mp4",
    isPremium: true
  }
];

export function PremiumVideos() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {premiumVideos.map((video) => (
        <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative">
            <img 
              src={video.thumbnailUrl} 
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 right-2">
              <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                Premium
              </span>
            </div>
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              {video.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{video.description}</p>
            <Button className="w-full">
              Upgrade to Watch
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
