import { EmotionType } from '../components/ui/emotion-tag';
import { Media } from '@shared/schema';

export interface MonthInfo {
  month: number;
  weekRange: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface EmotionTab {
  id: string;
  label: string;
  emoji: string;
}

export interface TimelineState {
  selectedMonth: number;
  selectedEmotion: string;
  selectedMedia: Media | null;
}

export interface UploadFormData {
  mediaType: 'image' | 'video';
  month: number;
  week?: number;
  emotionTag: EmotionType;
  notes?: string;
  file: File;
}
