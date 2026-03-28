'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Bot, Briefcase, Target, Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fadeInUp, fadeIn, staggerContainer } from '@/lib/animations';
import { useCountUp } from '@/lib/hooks';
import { caseStudies, stats } from '@/lib/constants';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Bot, Briefcase, Target, Github, ExternalLink,
};

function StatCounter({ value, label }: { value: string; label: string }) {
  const numMatch = value.match(/(\d+)/);
  const num = numMatch ? parseInt(numMatch[1]) : 0;
  const prefix = value.match(/^\$/)?.[0] || '';
  const suffix = value.replace(/^\$?\d+/, '');
  const { ref, count } = useCountUp(num, 2000);

  return (
    <div ref={ref} className="text-center relative group">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-2">
        {prefix}{count}{suffix}
      </div>
      <div className="text-text-muted text-sm tracking-wide">{label}</div>
    </div>
  );
}

export function CaseStudies() {
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = shouldReduceMotion ? fadeIn : fadeInUp;

  return (
    <Section id="projects" bg="base" divider backgroundVariant="case-studies">
      <Container>
        <motion.div
          className="max-w-2xl mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariant}
        >
          <Badge variant="blue" className="mb-4">Case Studies</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-5 leading-tight">
            Real projects, real{' '}
            <span className="text-gradient">impact</span>
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            Every project comes with measurable outcomes. Here&apos;s what we&apos;ve built.
          </p>
        </motion.div>

        {/* Stats banner */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 py-12 px-8 rounded-3xl bg-gradient-to-r from-white/[0.02] to-white/[0.01] border border-white/[0.04]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariant}>
              <StatCounter value={stat.value} label={stat.label} />
            </motion.div>
          ))}
        </motion.div>

        {/* Case study cards */}
        <motion.div
          className="grid lg:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {caseStudies.map((study) => {
            const Icon = iconMap[study.icon];
            const LinkIcon = iconMap[study.link.icon];
            return (
              <motion.div
                key={study.title}
                variants={itemVariant}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group"
              >
                <Card className="h-full" isViewable>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] flex items-center justify-center">
                        {Icon && <Icon className="h-6 w-6 text-accent-amber" />}
                      </div>
                      <Badge variant={study.badge.variant}>{study.badge.text}</Badge>
                    </div>
                    <CardTitle className="text-xl">{study.title}</CardTitle>
                    <CardDescription className="text-base">{study.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {study.stats.map((stat) => (
                        <div key={stat.label} className="flex justify-between items-center py-1.5 border-b border-white/[0.04] last:border-0">
                          <span className="text-text-muted text-sm">{stat.label}</span>
                          <span className="text-text-primary font-medium text-sm">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                    <a
                      href={study.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-amber-400/80 hover:text-amber-400 transition-all text-sm font-medium group/link"
                    >
                      {study.link.text}
                      <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
