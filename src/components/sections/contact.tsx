'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Loader2, Check, Mail, MapPin, Clock } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
    name: '',
    email: '',
    company: '',
    project: '',
    message: '',
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

      setTimeout(() => {
        setSubmitState('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <Section id="contact">
      <Container>
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariant}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Start Your AI Transformation
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
            Book a free strategy call to discuss how AI can drive measurable results for your business
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          {/* Form Card */}
          <motion.div variants={itemVariant}>
            <Card>
              <CardHeader>
                <CardTitle>Get Started Today</CardTitle>
                <CardDescription>Tell us about your project and we&apos;ll show you what&apos;s possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
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
                      placeholder="your.email@company.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
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
                    placeholder="Tell us about your project goals and challenges..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    className={`w-full ${
                      submitState === 'success' ? 'bg-accent-green hover:bg-emerald-400' : ''
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

          {/* Info + Process Cards */}
          <motion.div className="space-y-8" variants={itemVariant}>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 text-text-secondary">
                  <Mail className="h-5 w-5 text-accent-amber flex-shrink-0" />
                  <span>ourtransmutelabs@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-text-secondary">
                  <MapPin className="h-5 w-5 text-accent-amber flex-shrink-0" />
                  <span>Bengaluru, India</span>
                </div>
                <div className="flex items-center space-x-3 text-text-secondary">
                  <Clock className="h-5 w-5 text-accent-amber flex-shrink-0" />
                  <span>Response time: 4-6 hours</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Process</CardTitle>
                <CardDescription>How we deliver results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {processSteps.map((step) => (
                    <div key={step.number} className="flex items-start space-x-3">
                      <div className="w-7 h-7 bg-accent-amber text-deep rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {step.number}
                      </div>
                      <div>
                        <h4 className="text-text-primary font-semibold">{step.title}</h4>
                        <p className="text-text-muted text-sm">{step.description}</p>
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
