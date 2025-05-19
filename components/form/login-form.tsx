'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
      Form,
      FormControl,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import {
      Carousel,
      CarouselContent,
      CarouselItem,
      CarouselNext,
      CarouselPrevious,
} from '../ui/carousel';

// Zod schema
const loginSchema = z.object({
      email: z.string().min(1, 'Email is required').email('Invalid email'),
      password: z.string().min(6, 'Password must be at least 6 characters'),
});

const unsplashImages = [
      'https://source.unsplash.com/600x600/?love,birds',
      'https://source.unsplash.com/600x600/?nature,birds',
      'https://source.unsplash.com/600x600/?flowers,birds',
      'https://source.unsplash.com/600x600/?forest,birds',
];

export default function LoginForm() {
      const form = useForm<z.infer<typeof loginSchema>>({
            resolver: zodResolver(loginSchema),
            defaultValues: {
                  email: '',
                  password: '',
            },
      });

      function onSubmit(values: z.infer<typeof loginSchema>) {
            console.log('Login data:', values);
      }

      return (
            <div className="w-full min-h-screen grid lg:grid-cols-2">
                  {/* Left side with illustration */}
                  <div className="relative hidden lg:flex flex-col items-center justify-center p-8 bg-[#B5CCBE] text-white">
                        <div className="w-full max-w-md mx-auto text-center space-y-6">
                              <Carousel className="w-full max-w-md">
                                    <CarouselContent>
                                          {unsplashImages.map((src, index) => (
                                                <CarouselItem key={index}>
                                                      <Image
                                                            src={src}
                                                            alt={`Slide ${index + 1}`}
                                                            width={300}
                                                            height={300}
                                                            className="mx-auto rounded-lg object-cover"
                                                      />
                                                </CarouselItem>
                                          ))}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                              </Carousel>

                              <h2 className="text-2xl font-medium">Maecenas mattis egestas</h2>
                              <p className="text-sm text-white/80">
                                    Eidum et malesuada fames ac ante ipsum primis in faucibus
                                    suspendisse porta
                              </p>
                        </div>
                  </div>

                  {/* Right side with login form */}
                  <div className="flex flex-col items-center justify-center p-8">
                        <div className="w-full max-w-sm space-y-8">
                              <div className="text-center">
                                    <h1 className="text-2xl font-script mb-6">Lovebirds</h1>
                                    <h2 className="text-xl text-gray-600">Welcome to Lovebirds</h2>
                              </div>

                              <Form {...form}>
                                    <form
                                          onSubmit={form.handleSubmit(onSubmit)}
                                          className="space-y-6"
                                    >
                                          <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>
                                                                  Users name or Email
                                                            </FormLabel>
                                                            <FormControl>
                                                                  <Input
                                                                        placeholder="you@example.com"
                                                                        {...field}
                                                                  />
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
                                                                  <Input
                                                                        type="password"
                                                                        placeholder="••••••••"
                                                                        {...field}
                                                                  />
                                                            </FormControl>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />

                                          <div className="text-right">
                                                <Link
                                                      href="#"
                                                      className="text-sm text-gray-500 hover:text-gray-700"
                                                >
                                                      Forget password?
                                                </Link>
                                          </div>

                                          <Button
                                                type="submit"
                                                className="w-full bg-gray-600 hover:bg-gray-700 text-white"
                                          >
                                                Sign in
                                          </Button>

                                          <div className="relative">
                                                <div className="absolute inset-0 flex items-center">
                                                      <div className="w-full border-t border-gray-200"></div>
                                                </div>
                                                <div className="relative flex justify-center text-sm">
                                                      <span className="px-2 bg-white text-gray-500">
                                                            or
                                                      </span>
                                                </div>
                                          </div>

                                          <Button
                                                variant="outline"
                                                className="w-full border-gray-300"
                                          >
                                                <Image
                                                      src="/placeholder.svg"
                                                      alt="Google"
                                                      width={20}
                                                      height={20}
                                                      className="mr-2"
                                                />
                                                Sign in with Google
                                          </Button>

                                          <p className="text-center text-sm text-gray-500">
                                                New Lovebirds?{' '}
                                                <Link
                                                      href="#"
                                                      className="text-gray-600 hover:text-gray-800"
                                                >
                                                      Create Account
                                                </Link>
                                          </p>

                                          <Button variant="ghost" className="w-full" asChild>
                                                <Link href="/register">Create an Account</Link>
                                          </Button>
                                    </form>
                              </Form>
                        </div>
                  </div>
            </div>
      );
}
