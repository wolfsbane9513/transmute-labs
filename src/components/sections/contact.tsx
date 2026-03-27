'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Loader2, Check, Mail, MapPin, Clock, Sparkles } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input, Select, Textarea } from '@/components/ui/input';
import { fadeInUp, fadeIn, staggerContainer } from '@/lib/animations';
import { processSteps } from '@/lib/constants';

type SubmitState = 'idle' | 'loading' | 'success';

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

  const [formData, setFormData] = useState({
    name: '', email: '', company: '', project: '', message: '',
  });
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitState !== 'idle') return;

    setSubmitState('loading');
    setTimeout(() => {
      setSubmitState('success');
      setFormData({ name: '', email: '', company: '', project: '', message: '' });
      setTimeout(() => setSubmitState('idle'), 3000);
    }, 1500);
  };

  return (
    <Section id="contact" divider>
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
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      label="Name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      label="Company"
                      type="text"
                      placeholder="Your company"
                      value={formData.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                    />
                    <Select
                      label="Project Type"
                      options={projectOptions}
                      value={formData.project}
                      onChange={(e) => handleChange('project', e.target.value)}
                    />
                  </div>
                  <Textarea
                    label="Project Details"
                    placeholder="What challenges are you looking to solve with AI?"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className={`w-full transition-all duration-500 ${
                      submitState === 'success'
                        ? '!bg-gradient-to-r !from-emerald-400 !to-emerald-500 !shadow-emerald-500/20'
                        : ''
                    }`}
                    disabled={submitState !== 'idle'}
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
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info — takes 2 columns */}
          <motion.div className="lg:col-span-2 space-y-6" variants={itemVariant}>
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
                <div className="space-y-5">
                  {processSteps.map((step, i) => (
                    <div key={step.number} className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400/20 to-amber-400/5 flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-400 text-sm font-bold">{step.number}</span>
                      </div>
                      <div>
                        <h4 className="text-text-primary font-medium text-sm">{step.title}</h4>
                        <p className="text-text-muted text-xs mt-0.5 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
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
