import React from 'react';
import { Media } from '@shared/schema';
import { format } from 'date-fns';
import { X, ZoomIn, ZoomOut, Download, Share, Edit } from 'lucide-react';
import { EmotionTag, EmotionType } from './ui/emotion-tag';

interface MediaViewerProps {
  media: Media;
  onClose: () => void;
}

export function MediaViewer({ media, onClose }: MediaViewerProps) {
  const isVideo = media.mediaType === 'video';
  
  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return '';
    return format(new Date(date), 'MMMM d, yyyy');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = media.url;
    link.download = `baby-scan-month-${media.month}-${media.emotionTag}.${isVideo ? 'mp4' : 'jpg'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto p-4">
        <div className="relative">
          {isVideo ? (
            <video 
              src={media.url} 
              className="w-full max-h-[80vh] object-contain"
              controls
              autoPlay
            />
          ) : (
            <img 
              src={media.url} 
              alt={`Month ${media.month} ${media.emotionTag} scan`} 
              className="w-full max-h-[80vh] object-contain"
            />
          )}
          
          <button 
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="h-6 w-6 text-neutral-500" />
          </button>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 rounded-lg px-4 py-2 flex space-x-4">
            <button className="p-2 text-primary hover:text-primary-dark">
              <ZoomIn className="h-6 w-6" />
            </button>
            <button className="p-2 text-primary hover:text-primary-dark">
              <ZoomOut className="h-6 w-6" />
            </button>
            <button 
              className="p-2 text-primary hover:text-primary-dark"
              onClick={handleDownload}
            >
              <Download className="h-6 w-6" />
            </button>
            <button className="p-2 text-primary hover:text-primary-dark">
              <Share className="h-6 w-6" />
            </button>
            <button className="p-2 text-primary hover:text-primary-dark">
              <Edit className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="bg-white mt-4 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <EmotionTag emotion={media.emotionTag as EmotionType} />
            <span className="text-xs text-neutral-400">
              {media.week ? `Week ${media.week}, ` : ''}
              Month {media.month}
            </span>
          </div>
          
          {media.notes && (
            <p className="mt-2 text-sm text-neutral-500">
              {media.notes}
            </p>
          )}
          
          <div className="mt-3 flex items-center text-xs text-neutral-400">
            <span>Added: {media.createdAt && formatDate(media.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
