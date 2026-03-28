'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ROICalculator } from '@/components/ui/roi-calculator';
import { fadeInUp, fadeIn, slideInLeft, staggerContainer } from '@/lib/animations';
import { advantages } from '@/lib/constants';

export function Advantage() {
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = shouldReduceMotion ? fadeIn : fadeInUp;
  const leftVariant = shouldReduceMotion ? fadeIn : slideInLeft;

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const glowX = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <Section id="about" bg="base" divider backgroundVariant="advantage">
      <Container>
        <div ref={sectionRef} className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={leftVariant}
          >
            <Badge className="mb-4">Why Us</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-8 leading-tight">
              The Transmute Labs{' '}
              <span className="text-gradient">Advantage</span>
            </h2>
            <p className="text-lg text-text-secondary mb-6 leading-relaxed">
              We&apos;re not another AI consulting firm. Our founding team combines proven data science
              expertise with deep enterprise experience in fintech and AI innovation.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {advantages.map((adv) => (
                <div key={adv.title} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-accent-amber" />
                    <span className="text-text-primary font-bold text-sm">{adv.title}</span>
                  </div>
                  <p className="text-text-muted text-xs leading-relaxed">{adv.description}</p>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              isMagnetic
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start a Conversation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          {/* Right column — ROI Calculator */}
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={itemVariant}
          >
            {/* Parallax glow */}
            <motion.div
              className="absolute -inset-8 bg-gradient-to-r from-amber-400/[0.08] via-purple-500/[0.06] to-blue-500/[0.08] rounded-[2rem] blur-2xl"
              style={shouldReduceMotion ? {} : { x: glowX, scale: glowScale }}
            />

            <ROICalculator />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
