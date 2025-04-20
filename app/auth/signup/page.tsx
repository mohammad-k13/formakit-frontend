'use client';

import { useState } from 'react';
import { signup } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { signupSchema, type SignupFormData } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export default function SignupPage() {
      const router = useRouter();
      const [error, setError] = useState<string | null>(null);
      const [loading, setLoading] = useState(false);

      const form = useForm<SignupFormData>({
            resolver: zodResolver(signupSchema),
            defaultValues: {
                  username: '',
                  email: '',
                  password: '',
            },
      });

      async function onSubmit(data: SignupFormData) {
            setError(null);
            setLoading(true);

            try {
                  const result = await signup(data);
                  if (result.success) {
                        router.push('/auth/login');
                  } else {
                        setError(result.message || 'Signup failed');
                  }
            } catch (err) {
                  setError('An error occurred during signup');
            } finally {
                  setLoading(false);
            }
      }

      return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <Card className="w-full max-w-md">
                        <CardHeader>
                              <CardTitle>Create your account</CardTitle>
                              <CardDescription>
                                    Enter your details to create a new account
                              </CardDescription>
                        </CardHeader>
                        <CardContent>
                              <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                          {error && (
                                                <Alert variant="destructive">
                                                      <AlertDescription>{error}</AlertDescription>
                                                </Alert>
                                          )}
                                          <FormField
                                                control={form.control}
                                                name="username"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Username</FormLabel>
                                                            <FormControl>
                                                                  <Input placeholder="Enter your username" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />
                                          <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Email</FormLabel>
                                                            <FormControl>
                                                                  <Input placeholder="Enter your email" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />
                                          <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Password</FormLabel>
                                                            <FormControl>
                                                                  <Input type="password" placeholder="Enter your password" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />
                                          <Button type="submit" className="w-full" disabled={loading}>
                                                {loading ? 'Creating account...' : 'Sign up'}
                                          </Button>
                                    </form>
                              </Form>
                        </CardContent>
                  </Card>
            </div>
      );
} 