'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Shield, BookOpen, Lock, TrendingUp, Globe, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  mobile: z.string().min(10, {
    message: 'Please enter a valid mobile number.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      mobile: '',
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
        toast.success('Thank you! We\'ll be in touch soon.');
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">

        {/* Hero Section */}
        <section className="text-center pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800/50 border border-neutral-700/50 mb-6">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-neutral-300">Regulated & Secure</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Trade with <span className="text-emerald-400">Confidence</span>
            <br />in Global Markets
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Access Forex and Cryptocurrency markets with transparent pricing,
            comprehensive education, and a platform built on trust.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 text-neutral-300 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              No Hidden Fees
            </div>
            <div className="flex items-center gap-2 text-neutral-300 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Transparent Trading
            </div>
            <div className="flex items-center gap-2 text-neutral-300 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              24/7 Support
            </div>
          </div>
        </section>

        {/* Lead Form Section */}
        <section className="mb-20">
          <Card className="max-w-md mx-auto bg-neutral-900/50 border-neutral-800 backdrop-blur">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Start Your Trading Journey</CardTitle>
              <CardDescription className="text-neutral-400">
                Get personalized guidance from our team
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Thank You!</h3>
                  <p className="text-neutral-400 mb-6">
                    We've received your information and will contact you within 24 hours.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="border-neutral-700 text-white hover:bg-neutral-800"
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-200">Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              {...field}
                              className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-200">Mobile Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+1 (555) 000-0000"
                              {...field}
                              className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
                            />
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
                          <FormLabel className="text-neutral-200">Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john@example.com"
                              {...field}
                              className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
                    >
                      {isSubmitting ? 'Submitting...' : 'Get Started'}
                    </Button>

                    <div className="text-xs text-neutral-500 text-center space-y-1">
                      <p className="flex items-center justify-center gap-1">
                        <Lock className="w-3 h-3" />
                        Your data is encrypted and secure
                      </p>
                      <p>We respect your privacy. No spam, ever.</p>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Value Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Aurotradex?
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              We prioritize your success through education, transparency, and cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur hover:border-emerald-500/30 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-400/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-emerald-400" />
                </div>
                <CardTitle className="text-white">Global Market Access</CardTitle>
                <CardDescription className="text-neutral-400">
                  Trade Forex and Cryptocurrency markets with competitive spreads and real-time execution
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur hover:border-emerald-500/30 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-400/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-emerald-400" />
                </div>
                <CardTitle className="text-white">Education First</CardTitle>
                <CardDescription className="text-neutral-400">
                  Learn from expert analysis, webinars, and comprehensive resources designed for all experience levels
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur hover:border-emerald-500/30 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-400/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-emerald-400" />
                </div>
                <CardTitle className="text-white">Secure & Transparent</CardTitle>
                <CardDescription className="text-neutral-400">
                  Bank-grade security, segregated accounts, and full regulatory compliance for your peace of mind
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Trust Footer */}
        <footer className="border-t border-neutral-800 pt-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-2 text-neutral-400">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold text-white">Aurotradex</span>
            </div>

            <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
              <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
                <strong className="text-neutral-300">Risk Warning:</strong> Trading foreign exchange and cryptocurrencies on margin carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite. There is a possibility that you may sustain a loss of some or all of your investment.
              </p>
              <p className="text-xs text-neutral-500">
                Aurotradex is committed to responsible trading practices and transparent communication.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-neutral-500">
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Risk Disclosure</a>
            </div>

            <p className="text-xs text-neutral-600">
              © 2024 Aurotradex. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
