import React from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { MobileNavigation } from '@/components/layout/mobile-navigation';
import { useAuth } from '@/hooks/use-auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function SettingsPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  // Profile form schema
  const profileSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
  });

  // Baby info form schema
  const babyInfoSchema = z.object({
    name: z.string().optional(),
    dueDate: z.string().min(1, "Due date is required"),
    gender: z.string().optional(),
    doctorName: z.string().optional(),
  });

  // Get baby info
  const { data: babyInfo, isLoading: isLoadingBabyInfo } = useQuery({
    queryKey: ['/api/baby-info'],
  });

  // Profile form
  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
    },
  });

  // Baby info form
  const babyInfoForm = useForm<z.infer<typeof babyInfoSchema>>({
    resolver: zodResolver(babyInfoSchema),
    defaultValues: {
      name: babyInfo?.name || '',
      dueDate: user?.dueDate || '',
      gender: babyInfo?.gender || '',
      doctorName: babyInfo?.doctorName || '',
    },
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: z.infer<typeof profileSchema>) => {
      const res = await apiRequest('POST', '/api/profile', data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user'] });
      toast({
        title: 'Profile updated',
        description: 'Your profile information has been updated.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Update failed',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
      });
    },
  });

  // Update baby info mutation
  const updateBabyInfoMutation = useMutation({
    mutationFn: async (data: z.infer<typeof babyInfoSchema>) => {
      const res = await apiRequest('POST', '/api/baby-info', data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/baby-info'] });
      toast({
        title: 'Baby info updated',
        description: 'Your baby\'s information has been updated.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Update failed',
        description: error.message || 'Failed to update baby information',
        variant: 'destructive',
      });
    },
  });

  const onProfileSubmit = (data: z.infer<typeof profileSchema>) => {
    updateProfileMutation.mutate(data);
  };

  const onBabyInfoSubmit = (data: z.infer<typeof babyInfoSchema>) => {
    updateBabyInfoMutation.mutate(data);
  };

  // Update baby info form when data is loaded
  React.useEffect(() => {
    if (babyInfo) {
      babyInfoForm.reset({
        name: babyInfo.name || '',
        dueDate: user?.dueDate || '',
        gender: babyInfo.gender || '',
        doctorName: babyInfo.doctorName || '',
      });
    }
  }, [babyInfo, user]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar />

        <main className="flex-1 md:pl-64 pt-4 pb-20">
          <div className="px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-neutral-500 font-heading mb-6">
              Account Settings
            </h2>

            <Card className="mb-6">
              <CardHeader className="border-b border-neutral-200">
                <CardTitle className="text-lg font-medium text-neutral-500 font-heading">
                  Profile Information
                </CardTitle>
                <CardDescription className="text-sm text-neutral-400">
                  Update your account information and preferences.
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <div className="sm:flex sm:items-center">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="https://api.dicebear.com/7.x/personas/svg?seed=Emily" />
                        <AvatarFallback>
                          {user?.fullName?.substring(0, 2) || user?.username?.substring(0, 2) || 'U'}
                        </AvatarFallback>
                      </Avatar>

                      <div className="mt-4 sm:mt-0 sm:ml-4 flex">
                        <Button type="button" variant="outline" size="sm">
                          Change
                        </Button>
                        <Button type="button" variant="outline" size="sm" className="ml-3">
                          Remove
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                      <FormField
                        control={profileForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button 
                        type="submit" 
                        disabled={updateProfileMutation.isPending}
                      >
                        {updateProfileMutation.isPending ? 'Saving...' : 'Save'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader className="border-b border-neutral-200">
                <CardTitle className="text-lg font-medium text-neutral-500 font-heading">
                  Baby Information
                </CardTitle>
                <CardDescription className="text-sm text-neutral-400">
                  Update your baby's details.
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                <Form {...babyInfoForm}>
                  <form onSubmit={babyInfoForm.handleSubmit(onBabyInfoSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                      <FormField
                        control={babyInfoForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Baby's Name (if chosen)</FormLabel>
                            <FormControl>
                              <Input placeholder="Baby's name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={babyInfoForm.control}
                        name="dueDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Due Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={babyInfoForm.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender (if known)</FormLabel>
                            <FormControl>
                              <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                {...field}
                                value={field.value || ''}
                              >
                                <option value="">Select gender</option>
                                <option value="boy">Boy</option>
                                <option value="girl">Girl</option>
                                <option value="unknown">Not known yet</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={babyInfoForm.control}
                        name="doctorName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Doctor's Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doctor's name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button 
                        type="submit" 
                        disabled={updateBabyInfoMutation.isPending}
                      >
                        {updateBabyInfoMutation.isPending ? 'Saving...' : 'Save'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="border-b border-neutral-200">
                <CardTitle className="text-lg font-medium text-neutral-500 font-heading">
                  Preferences
                </CardTitle>
                <CardDescription className="text-sm text-neutral-400">
                  Manage your app settings and notifications.
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-neutral-500">Email Notifications</h4>
                      <p className="text-sm text-neutral-400">
                        Receive email updates about new app features and milestones.
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-neutral-500">Push Notifications</h4>
                      <p className="text-sm text-neutral-400">
                        Receive push notifications for important milestones.
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-neutral-500">Dark Mode</h4>
                      <p className="text-sm text-neutral-400">
                        Use dark color theme for the app interface.
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <MobileNavigation />
      </div>
    </div>
  );
}