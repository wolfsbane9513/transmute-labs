'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Bot, TrendingUp, Code, CheckCircle } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { fadeInUp, fadeIn, staggerContainer } from '@/lib/animations';
import { services } from '@/lib/constants';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Bot,
  TrendingUp,
  Code,
};

export function Services() {
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = shouldReduceMotion ? fadeIn : fadeInUp;

  return (
    <Section id="services">
      <Container>
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariant}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Proven AI Solutions for Business Growth
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
            We don&apos;t just build AI systems—we deliver measurable business transformations
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div key={service.title} variants={itemVariant} whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                <Card className="h-full">
                  <CardHeader>
                    {Icon && <Icon className="h-12 w-12 text-accent-amber mb-4" />}
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-accent-amber flex-shrink-0" />
                          <span className="text-text-secondary text-sm">{feature}</span>
                        </div>
                      ))}
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
