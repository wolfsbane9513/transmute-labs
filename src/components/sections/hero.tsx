'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, ExternalLink, CheckCircle, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/ui/container';
import { fadeInUp, fadeIn } from '@/lib/animations';
import { trustIndicators } from '@/lib/constants';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  CheckCircle,
  TrendingUp,
  Clock,
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const animVariant = shouldReduceMotion ? fadeIn : fadeInUp;

  return (
    <section className="relative min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-blue-900/30 blur-3xl animate-blob1 will-change-transform"
        />
        <div
          className="absolute top-1/3 right-1/4 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full bg-violet-700/20 blur-3xl animate-blob2 will-change-transform"
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] rounded-full bg-indigo-900/25 blur-3xl animate-blob3 will-change-transform"
        />
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={animVariant}
        >
          <Badge variant="outline" className="mb-6">
            AI-Powered Business Transformation
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 leading-tight">
            Turn AI Innovation Into{' '}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Business Results
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto">
            Transmute Labs delivers production-ready AI solutions that drive measurable business impact.
            From enterprise chatbots to predictive analytics, we transform ambitious ideas into competitive
            advantages—in weeks, not months.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button
              size="lg"
              variant="primary"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book Free AI Strategy Call
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Success Stories
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-text-muted text-sm">
            {trustIndicators.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <div key={item.text} className="flex items-center space-x-2">
                  {Icon && <Icon className="h-4 w-4 text-accent-amber" />}
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
