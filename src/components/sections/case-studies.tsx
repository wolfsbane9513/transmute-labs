'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Bot, Briefcase, Target, Github, ExternalLink } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fadeInUp, fadeIn, staggerContainer } from '@/lib/animations';
import { caseStudies, stats } from '@/lib/constants';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Bot,
  Briefcase,
  Target,
  Github,
  ExternalLink,
};

export function CaseStudies() {
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = shouldReduceMotion ? fadeIn : fadeInUp;

  return (
    <Section id="projects" bg="base">
      <Container>
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariant}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Success Stories & Case Studies
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
            Real projects delivering measurable business impact
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          {caseStudies.map((study) => {
            const Icon = iconMap[study.icon];
            const LinkIcon = iconMap[study.link.icon];
            return (
              <motion.div key={study.title} variants={itemVariant} whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      {Icon && <Icon className="h-8 w-8 text-accent-amber" />}
                      <Badge variant={study.badge.variant}>{study.badge.text}</Badge>
                    </div>
                    <CardTitle>{study.title}</CardTitle>
                    <CardDescription>{study.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      {study.stats.map((stat) => (
                        <div key={stat.label} className="flex justify-between">
                          <span className="text-text-muted text-sm">{stat.label}</span>
                          <span className={stat.value.includes('%') || stat.value.includes('x') || stat.value.includes('Live')
                            ? 'text-accent-amber font-semibold text-sm'
                            : 'text-text-primary text-sm'
                          }>
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <a
                      href={study.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-accent-amber hover:text-amber-300 transition-colors text-sm"
                    >
                      {LinkIcon && <LinkIcon className="mr-2 h-4 w-4" />}
                      {study.link.text}
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          className="mt-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariant}
        >
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-accent-amber/10 to-accent-purple/10 border-amber-400/30">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-text-primary mb-6">Proven Track Record</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-accent-amber mb-2">{stat.value}</div>
                    <div className="text-text-secondary text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Section>
  );
}
