'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Bot, TrendingUp, Code, CheckCircle, ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fadeInUp, fadeIn, staggerContainer } from '@/lib/animations';
import { useParallax } from '@/lib/hooks';
import { services } from '@/lib/constants';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Bot, TrendingUp, Code,
};

const cardAccents = [
  'from-blue-500/20 to-cyan-500/20',
  'from-amber-500/20 to-orange-500/20',
  'from-purple-500/20 to-pink-500/20',
];

export function Services() {
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = shouldReduceMotion ? fadeIn : fadeInUp;
  const { ref: parallaxRef, y } = useParallax(30);

  return (
    <Section id="services" divider>
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
            We don&apos;t just build AI systems — we deliver measurable business transformations
            backed by 12+ years of enterprise experience.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          ref={parallaxRef}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.title}
                variants={itemVariant}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group"
              >
                <Card className="h-full relative">
                  {/* Top accent glow */}
                  <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${cardAccents[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      {Icon && <Icon className="h-7 w-7 text-accent-amber" />}
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-3 group/item">
                          <CheckCircle className="h-4 w-4 text-accent-amber/70 flex-shrink-0 group-hover/item:text-accent-amber transition-colors" />
                          <span className="text-text-secondary text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-5 border-t border-white/[0.06]">
                      <span className="text-amber-400/70 text-sm font-medium inline-flex items-center group-hover:text-amber-400 transition-colors">
                        Learn more
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
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
