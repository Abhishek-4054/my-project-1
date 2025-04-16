import React from 'react';
import { cn } from '@/lib/utils';

export type EmotionType = 'happy' | 'sleepy' | 'playful' | 'kicking' | 'calm';

const emotionIcons: Record<EmotionType, string> = {
  happy: '😊',
  sleepy: '😴',
  playful: '🤗',
  kicking: '🦶',
  calm: '🤔'
};

interface EmotionTagProps {
  emotion: EmotionType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
  onClick?: () => void;
}

export function EmotionTag({ 
  emotion, 
  size = 'md', 
  className, 
  showLabel = true,
  onClick
}: EmotionTagProps) {
  const sizeClasses = {
    sm: 'p-1 text-sm',
    md: 'p-1 text-lg',
    lg: 'p-2 text-xl'
  };

  return (
    <div 
      className={cn(
        "flex items-center cursor-pointer transition-all",
        "hover:-translate-y-1",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className={cn(
        "flex-shrink-0 bg-pink bg-opacity-20 rounded-full",
        sizeClasses[size]
      )}>
        <span>{emotionIcons[emotion]}</span>
      </div>
      {showLabel && (
        <span className="ml-2 text-sm font-medium text-neutral-500 capitalize">
          {emotion}
        </span>
      )}
    </div>
  );
}

export function EmotionSelector({
  value,
  onChange,
  className
}: {
  value?: EmotionType;
  onChange: (emotion: EmotionType) => void;
  className?: string;
}) {
  const emotions: EmotionType[] = ['happy', 'sleepy', 'playful', 'kicking', 'calm'];
  
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-5 gap-3", className)}>
      {emotions.map((emotion) => (
        <div 
          key={emotion}
          onClick={() => onChange(emotion)}
          className={cn(
            "relative flex items-center space-x-3 rounded-lg border px-6 py-4 shadow-sm cursor-pointer",
            value === emotion 
              ? "border-primary ring-2 ring-primary ring-offset-2" 
              : "border-neutral-200 hover:border-primary bg-white"
          )}
        >
          <div className="flex-shrink-0 text-lg">{emotionIcons[emotion]}</div>
          <div className="min-w-0 flex-1">
            <label className="select-none font-medium text-neutral-500 capitalize">
              {emotion}
            </label>
            <input 
              type="radio" 
              name="emotion" 
              value={emotion} 
              checked={value === emotion}
              onChange={() => onChange(emotion)}
              className="sr-only"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
