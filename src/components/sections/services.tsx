'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Bot, TrendingUp, Code, CheckCircle, ArrowRight, Shield, Zap } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fadeInUp, fadeIn, staggerContainer } from '@/lib/animations';
import { ProcessMap } from '@/components/ui/animations/process-map';
import { services } from '@/lib/constants';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Bot, TrendingUp, Code, Shield, Zap
};

const extraServices = [
  {
    icon: 'Shield',
    title: 'AI Strategy & Security',
    description: 'Ensure your AI roadmap is secure, compliant, and enterprise-ready.',
    features: ['Compliance Audit', 'Security Frameworks'],
  },
  {
    icon: 'Zap',
    title: 'MLOps & Performance',
    description: 'Scaling AI models from prototypes to global production environments.',
    features: ['Infrastructure Setup', 'Performance Monitoring'],
  }
];

export function Services() {
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = shouldReduceMotion ? fadeIn : fadeInUp;

  return (
    <Section id="services" divider backgroundVariant="services">
      <Container>
        {/* Section header */}
        <motion.div
          className="max-w-2xl mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariant}
        >
          <Badge className="mb-4">What We Do</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-5 leading-tight">
            AI solutions that move the{' '}
            <span className="text-gradient">needle</span>
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            We don&apos;t just build AI systems — we deliver modular, enterprise-grade business transformations.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {/* Tile 1: Intelligent Automation (Large) */}
          <motion.div variants={itemVariant} className="md:col-span-4 h-full">
            <Card className="h-full relative overflow-hidden" isViewable>
              <ProcessMap />
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-amber-400/10 flex items-center justify-center mb-5">
                  <Bot className="h-7 w-7 text-accent-amber" />
                </div>
                <CardTitle className="text-2xl">{services[0].title}</CardTitle>
                <CardDescription className="text-lg max-w-lg">{services[0].description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {services[0].features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-accent-amber/70 flex-shrink-0" />
                      <span className="text-text-secondary text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tile 2: Predictive Analytics */}
          <motion.div variants={itemVariant} className="md:col-span-2 h-full">
            <Card className="h-full relative" isViewable>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-blue-400/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-accent-blue" />
                </div>
                <CardTitle className="text-xl">{services[1].title}</CardTitle>
                <CardDescription>{services[1].description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {services[1].features.slice(0, 2).map((feature) => (
                    <div key={feature} className="flex items-center space-x-3">
                      <CheckCircle className="h-3 w-3 text-accent-blue/70 flex-shrink-0" />
                      <span className="text-text-secondary text-xs">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tile 3: Full-Stack AI Platforms */}
          <motion.div variants={itemVariant} className="md:col-span-2 h-full">
            <Card className="h-full relative" isViewable>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-purple-400/10 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-accent-purple" />
                </div>
                <CardTitle className="text-xl">{services[2].title}</CardTitle>
                <CardDescription>{services[2].description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {services[2].features.slice(0, 2).map((feature) => (
                    <div key={feature} className="flex items-center space-x-3">
                      <CheckCircle className="h-3 w-3 text-accent-purple/70 flex-shrink-0" />
                      <span className="text-text-secondary text-xs">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tile 4: AI Strategy (Smaller) */}
          <motion.div variants={itemVariant} className="md:col-span-2 h-full">
            <Card className="h-full relative" isViewable>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-green-400/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-accent-green" />
                </div>
                <CardTitle className="text-xl">{extraServices[0].title}</CardTitle>
                <CardDescription>{extraServices[0].description}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Tile 5: MLOps (Smaller) */}
          <motion.div variants={itemVariant} className="md:col-span-2 h-full">
            <Card className="h-full relative" isViewable>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-rose-400/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-accent-rose" />
                </div>
                <CardTitle className="text-xl">{extraServices[1].title}</CardTitle>
                <CardDescription>{extraServices[1].description}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
