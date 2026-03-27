'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { fadeInUp, fadeIn } from '@/lib/animations';
import { advantages } from '@/lib/constants';

export function Advantage() {
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = shouldReduceMotion ? fadeIn : fadeInUp;

  return (
    <Section id="about" bg="base">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={itemVariant}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
              The Transmute Labs Advantage
            </h2>
            <p className="text-lg text-text-secondary mb-6 leading-relaxed">
              We&apos;re not just another AI consulting firm. Our founding team combines proven data science
              expertise with deep enterprise experience in fintech and AI innovation. We deliver
              production-ready solutions that create immediate business value.
            </p>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              While large consulting firms take months to deliver theoretical frameworks, we deploy
              working AI systems in weeks. Our boutique approach means you get founder-level attention
              with hands-on technical implementation.
            </p>
            <div className="flex items-center space-x-4">
              <Zap className="h-8 w-8 text-accent-amber" />
              <span className="text-xl font-semibold text-text-primary">Speed &times; Quality &times; Results</span>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={itemVariant}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-purple-600/20 rounded-2xl blur-xl" />
            <Card className="relative">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-text-primary mb-6">Why Choose Us?</h3>
                <div className="space-y-4">
                  {advantages.map((advantage) => (
                    <div key={advantage.title} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent-amber rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <div className="text-text-primary font-semibold">{advantage.title}</div>
                        <div className="text-text-muted text-sm">{advantage.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
