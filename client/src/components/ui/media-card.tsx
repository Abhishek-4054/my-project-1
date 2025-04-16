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
        "bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow",
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
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 text-white opacity-80" 
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
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
          </div>
        ) : (
          <img 
            src={media.url} 
            alt={`${media.emotionTag} ultrasound`} 
            className="w-full h-full object-cover"
          />
        )}
        
        {showMonth && (
          <div className="absolute top-2 right-2 bg-primary bg-opacity-90 text-white text-xs px-2 py-1 rounded">
            Month {media.month}
          </div>
        )}
        
        <div className="absolute top-2 left-2">
          <EmotionTag 
            emotion={media.emotionTag as EmotionType} 
            showLabel={false}
          />
        </div>
        
        <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-primary" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" 
            />
          </svg>
        </button>
      </div>
      
      <div className="px-4 py-4">
        <div className="flex justify-between items-center">
          <EmotionTag emotion={media.emotionTag as EmotionType} />
          <span className="text-xs text-neutral-400">
            {media.createdAt && getTimeAgo(new Date(media.createdAt))}
          </span>
        </div>
        
        {media.notes && (
          <p className="mt-2 text-sm text-neutral-400 line-clamp-2">
            {media.notes}
          </p>
        )}
      </div>
    </div>
  );
}
