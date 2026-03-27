'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
    <Section id="about" bg="base" divider>
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
            <p className="text-lg text-text-secondary mb-10 leading-relaxed">
              While large firms take months to deliver theoretical frameworks, we deploy
              working AI systems in weeks — with founder-level attention on every engagement.
            </p>

            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-amber-400/[0.06] to-transparent border border-amber-400/10 mb-8">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center flex-shrink-0">
                <Zap className="h-6 w-6 text-accent-amber" />
              </div>
              <span className="text-lg font-semibold text-text-primary">Speed &times; Quality &times; Results</span>
            </div>

            <Button
              variant="outline"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start a Conversation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          {/* Right column — floating card with parallax glow */}
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

            <Card className="relative">
              <CardContent className="p-8 sm:p-10">
                <h3 className="text-2xl font-bold text-text-primary mb-8">Why Choose Us?</h3>
                <motion.div
                  className="space-y-5"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  {advantages.map((advantage, i) => (
                    <motion.div
                      key={advantage.title}
                      variants={itemVariant}
                      className="flex items-start space-x-4 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400/20 to-amber-400/5 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <span className="text-amber-400 text-sm font-bold">{i + 1}</span>
                      </div>
                      <div>
                        <div className="text-text-primary font-semibold mb-1">{advantage.title}</div>
                        <div className="text-text-muted text-sm leading-relaxed">{advantage.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
