import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { MobileNavigation } from '@/components/layout/mobile-navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { uploadMediaSchema } from '@shared/schema';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useLocation } from 'wouter';
import { EmotionSelector, EmotionType } from '@/components/ui/emotion-tag';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X } from 'lucide-react';

export default function UploadPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const form = useForm<z.infer<typeof uploadMediaSchema>>({
    resolver: zodResolver(uploadMediaSchema),
    defaultValues: {
      mediaType: 'image',
      month: 5,
      emotionTag: 'happy',
      notes: '',
    },
  });
  
  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      try {
        const res = await apiRequest('POST', '/api/media', undefined, {
          method: 'POST',
          body: formData,
          headers: {}, // Don't set Content-Type, let the browser set it with the boundary
        });
        if (!res.ok) {
          throw new Error(`Upload failed with status ${res.status}`);
        }
        return await res.json();
      } catch (error) {
        console.error('Upload error:', error);
        throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: 'Upload successful',
        description: 'Your media has been uploaded.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/media'] });
      queryClient.invalidateQueries({ queryKey: ['/api/media/recent'] });
      setLocation('/');
    },
    onError: (error: Error) => {
      toast({
        title: 'Upload failed',
        description: error.message || 'Something went wrong with your upload.',
        variant: 'destructive',
      });
    },
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please select a file smaller than 10MB',
          variant: 'destructive',
        });
        e.target.value = '';
        return;
      }
      setSelectedFile(file);
      
      // Determine file type
      const fileType = file.type.startsWith('image/') ? 'image' : 'video';
      setFileType(fileType);
      form.setValue('mediaType', fileType);
      
      // Create preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };
  
  const clearSelectedFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedFile(null);
    setFileType(null);
  };
  
  const onSubmit = (values: z.infer<typeof uploadMediaSchema>) => {
    if (!selectedFile) {
      toast({
        title: 'Missing file',
        description: 'Please select a file to upload.',
        variant: 'destructive',
      });
      return;
    }
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('mediaType', values.mediaType);
    formData.append('month', values.month.toString());
    formData.append('week', values.week?.toString() || '');
    formData.append('emotionTag', values.emotionTag);
    formData.append('notes', values.notes || '');
    
    uploadMutation.mutate(formData);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar />
        
        <main className="flex-1 md:pl-64 pt-4 pb-20">
          <div className="px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-neutral-500 font-heading mb-6">
              Upload New Media
            </h2>
            
            <Card>
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="mediaType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Media Type</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select media type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="image">Ultrasound Image</SelectItem>
                              <SelectItem value="video">Ultrasound Video</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="month"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Month</FormLabel>
                            <Select
                              value={field.value.toString()}
                              onValueChange={(value) => field.onChange(parseInt(value))}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select month" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((month) => (
                                  <SelectItem key={month} value={month.toString()}>
                                    Month {month}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="week"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Week (Optional)</FormLabel>
                            <Select
                              value={field.value?.toString() || ''}
                              onValueChange={(value) => field.onChange(value ? parseInt(value) : undefined)}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select week (optional)" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="">Not specified</SelectItem>
                                {Array.from({ length: 40 }, (_, i) => i + 1).map((week) => (
                                  <SelectItem key={week} value={week.toString()}>
                                    Week {week}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="emotionTag"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emotion Tag</FormLabel>
                          <FormControl>
                            <EmotionSelector 
                              value={field.value as EmotionType} 
                              onChange={field.onChange} 
                              className="mt-2"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormItem>
                      <FormLabel>Upload Media</FormLabel>
                      <div className="mt-2">
                        {!previewUrl ? (
                          <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-200 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                              <Upload className="mx-auto h-12 w-12 text-neutral-300" />
                              <div className="flex text-sm text-neutral-400">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none">
                                  <span>Upload a file</span>
                                  <input 
                                    id="file-upload" 
                                    name="file-upload" 
                                    type="file" 
                                    className="sr-only"
                                    accept="image/png,image/jpeg,image/gif,video/mp4,video/quicktime"
                                    onChange={handleFileChange}
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-neutral-400">
                                PNG, JPG, GIF, MP4 up to 10MB
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="relative border border-neutral-200 rounded-md overflow-hidden">
                            <div className="relative aspect-video bg-neutral-100 flex items-center justify-center">
                              {fileType === 'image' ? (
                                <img src={previewUrl} alt="Preview" className="max-h-full" />
                              ) : (
                                <video src={previewUrl} className="max-h-full" controls />
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={clearSelectedFile}
                              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                            >
                              <X className="h-4 w-4 text-neutral-500" />
                            </button>
                            <div className="p-2 text-xs text-neutral-500 bg-neutral-50">
                              {selectedFile?.name} ({(selectedFile?.size / 1024 / 1024).toFixed(2)} MB)
                            </div>
                          </div>
                        )}
                      </div>
                    </FormItem>
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any observations or notes about this scan..." 
                              {...field}
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end space-x-3">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setLocation('/')}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        disabled={uploadMutation.isPending || !selectedFile}
                      >
                        {uploadMutation.isPending ? 'Uploading...' : 'Upload'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <MobileNavigation />
      </div>
    </div>
  );
}
