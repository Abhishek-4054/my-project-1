import React from 'react';
import { Media } from '@shared/schema';
import { EmotionTag, EmotionType } from './emotion-tag';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface MediaCardProps {
  media: Media;
  onClick?: () => void;
  className?: string;
  showMonth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function MediaCard({
  media,
  onClick,
  className,
  showMonth = true,
  size = 'md'
}: MediaCardProps) {
  const sizes = {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64'
  };

  const getTimeAgo = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const isVideoFile = media.mediaType === 'video';

  return (
    <div 
      className={cn(
        "bg-white overflow-hidden shadow-md rounded-xl border border-primary/5 cursor-pointer hover:shadow-lg hover:border-primary/20 transition-all transform hover:-translate-y-1",
        className
      )}
      onClick={onClick}
    >
      <div className={cn("relative bg-neutral-100", sizes[size])}>
        {isVideoFile ? (
          <div className="w-full h-full flex items-center justify-center">
            <video 
              src={media.url} 
              className="w-full h-full object-cover"
              controls={false}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/80 text-white shadow-lg">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
                  />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full overflow-hidden">
            <img 
              src={media.url} 
              alt={`${media.emotionTag} ultrasound`} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"></div>
          </div>
        )}
        
        <div className="absolute top-0 inset-x-0 p-3 flex justify-between items-start">
          <EmotionTag 
            emotion={media.emotionTag as EmotionType} 
            size="md"
            className="shadow-md"
          />
          
          {showMonth && (
            <div className="flex items-center bg-white/90 backdrop-blur-sm text-primary font-medium text-xs px-3 py-1.5 rounded-full shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Month {media.month}
            </div>
          )}
        </div>
        
        <div className="absolute bottom-3 right-3 flex space-x-2">
          <button 
            className="bg-white rounded-full p-2 shadow-md hover:bg-primary/5 transition-colors" 
            onClick={(e) => { e.stopPropagation(); }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 text-primary" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
          </button>
          <button 
            className="bg-white rounded-full p-2 shadow-md hover:bg-primary/5 transition-colors"
            onClick={(e) => { e.stopPropagation(); }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 text-primary" 
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
              <span className="text-xs font-bold text-primary">{media.week || media.month}</span>
            </div>
            <h3 className="text-sm font-medium text-neutral-700">
              {isVideoFile ? 'Video Ultrasound' : 'Ultrasound Image'}
            </h3>
          </div>
          <span className="text-xs text-neutral-500 font-medium">
            {media.createdAt && getTimeAgo(new Date(media.createdAt))}
          </span>
        </div>
        
        {media.notes && (
          <p className="mt-2 text-sm text-neutral-600 line-clamp-2">
            {media.notes}
          </p>
        )}
        
        <div className="mt-3 pt-2 border-t border-neutral-100 flex justify-between items-center">
          <div className="flex items-center text-xs text-neutral-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Week {media.week || (media.month * 4)}
          </div>
          <button className="text-xs font-medium text-primary hover:text-primary/80 flex items-center">
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
