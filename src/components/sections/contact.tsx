'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowRight, Loader2, Check, Mail, MapPin, Clock } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input, Select, Textarea } from '@/components/ui/input';
import { SecureCore } from '@/components/ui/illustrations/secure-core';
import { fadeInUp, fadeIn, staggerContainer } from '@/lib/animations';
import { processSteps } from '@/lib/constants';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  project: z.string().min(1, 'Please select a project type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

const projectOptions = [
  { value: '', label: 'Select project type' },
  { value: 'ai-automation', label: 'AI Automation' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'data-analytics', label: 'Data Analytics' },
  { value: 'consulting', label: 'AI Consulting' },
  { value: 'other', label: 'Other' },
];

export function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = shouldReduceMotion ? fadeIn : fadeInUp;
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '', email: '', company: '', project: '', message: '',
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    if (submitState !== 'idle') return;

    setSubmitState('loading');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitState('success');
      reset();
      setTimeout(() => setSubmitState('idle'), 3000);
    } catch {
      setSubmitState('error');
      setTimeout(() => setSubmitState('idle'), 3000);
    }
  };

  return (
    <Section id="contact" divider backgroundVariant="contact">
      <Container>
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariant}
        >
          <Badge variant="green" className="mb-4">Get Started</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-5 leading-tight">
            Ready to{' '}
            <span className="text-gradient">transform</span>?
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            Book a free strategy call. We&apos;ll show you exactly how AI can drive measurable results for your business.
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {/* Form — takes 3 columns */}
          <motion.div className="lg:col-span-3" variants={itemVariant}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Tell us about your project</CardTitle>
                <CardDescription>We&apos;ll get back within 4-6 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <Input
                        label="Name"
                        placeholder="Your name"
                        {...register('name')}
                        error={errors.name?.message}
                      />
                    </div>
                    <div className="space-y-1">
                      <Input
                        label="Email"
                        type="email"
                        placeholder="you@company.com"
                        {...register('email')}
                        error={errors.email?.message}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <Input
                        label="Company"
                        placeholder="Your company"
                        {...register('company')}
                        error={errors.company?.message}
                      />
                    </div>
                    <div className="space-y-1">
                      <Select
                        label="Project Type"
                        options={projectOptions}
                        {...register('project')}
                        error={errors.project?.message}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Textarea
                      label="Project Details"
                      placeholder="What challenges are you looking to solve with AI?"
                      rows={4}
                      {...register('message')}
                      error={errors.message?.message}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isMagnetic
                    className={`w-full transition-all duration-500 ${
                      submitState === 'success'
                        ? '!bg-gradient-to-r !from-emerald-400 !to-emerald-500 !shadow-emerald-500/20'
                        : submitState === 'error'
                        ? '!bg-gradient-to-r !from-rose-400 !to-rose-500 !shadow-rose-500/20'
                        : ''
                    }`}
                    disabled={submitState === 'loading'}
                  >
                    {submitState === 'idle' && (
                      <>
                        Start Your AI Transformation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                    {submitState === 'loading' && (
                      <>
                        Sending...
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      </>
                    )}
                    {submitState === 'success' && (
                      <>
                        Message Sent!
                        <Check className="ml-2 h-4 w-4" />
                      </>
                    )}
                    {submitState === 'error' && (
                      <>
                        Something went wrong. Try again.
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info — takes 2 columns */}
          <motion.div className="lg:col-span-2 space-y-6" variants={itemVariant}>
            {/* Trust & Security */}
            <Card className="overflow-hidden relative group">
              <div className="absolute -top-4 -right-4 w-32 h-32 opacity-20 group-hover:opacity-40 transition-opacity">
                <SecureCore />
              </div>
              <CardContent className="p-7 relative z-10">
                <h3 className="text-lg font-semibold text-text-primary mb-6">Enterprise Trust</h3>
                <div className="space-y-4">
                  {[
                    { label: 'SOC2 Ready', desc: 'Enterprise-grade security standards' },
                    { label: 'Data Encryption', desc: 'End-to-end AES-256 protection' },
                    { label: 'GDPR Compliant', desc: 'Full data privacy sovereignty' }
                  ].map((item) => (
                    <div key={item.label} className="flex items-start space-x-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-amber" />
                      <div>
                        <div className="text-sm font-bold text-text-primary">{item.label}</div>
                        <p className="text-[10px] text-text-muted leading-tight">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact info */}
            <Card>
              <CardContent className="p-7 space-y-5">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Contact</h3>
                {[
                  { icon: Mail, text: 'ourtransmutelabs@gmail.com' },
                  { icon: MapPin, text: 'Bengaluru, India' },
                  { icon: Clock, text: '4-6 hour response time' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-accent-amber" />
                    </div>
                    <span className="text-text-secondary text-sm">{text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Process steps */}
            <Card>
              <CardContent className="p-7">
                <h3 className="text-lg font-semibold text-text-primary mb-6">Our Process</h3>
                <div className="space-y-6 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-4 top-2 bottom-2 w-px bg-white/[0.08]" />
                  
                  {processSteps.map((step, i) => (
                    <motion.div 
                      key={step.number} 
                      className="flex items-start space-x-6 relative group cursor-default"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400/20 to-amber-400/5 flex items-center justify-center flex-shrink-0 z-10 group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/10">
                        <span className="text-amber-400 text-sm font-bold">{step.number}</span>
                      </div>
                      <div className="pt-0.5">
                        <h4 className="text-text-primary font-medium text-sm group-hover:text-amber-400 transition-colors">{step.title}</h4>
                        <p className="text-text-muted text-xs mt-1.5 leading-relaxed group-hover:text-text-secondary transition-colors">{step.description}</p>
                        
                        <motion.div 
                          className="mt-2 h-0 overflow-hidden text-[10px] text-accent-amber font-mono tracking-wider uppercase"
                          initial={{ height: 0, opacity: 0 }}
                          whileHover={{ height: 'auto', opacity: 1 }}
                        >
                          {i === 0 && "Phase 1: Analysis"}
                          {i === 1 && "Phase 2: Development"}
                          {i === 2 && "Phase 3: Launch"}
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
