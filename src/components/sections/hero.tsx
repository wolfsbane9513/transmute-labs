'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/ui/container';
import { DynamicBackground } from '@/components/ui/dynamic-background';
import { NeuralEngine } from '@/components/ui/illustrations/neural-engine';
import { fadeIn, textRevealContainer, textRevealWord } from '@/lib/animations';

const headlineWords = 'Turn AI Innovation Into Business Results'.split(' ');

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: layers move at different speeds
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Dynamic background layer */}
      <DynamicBackground variant="hero" />

      {/* Content layer with parallax */}
      <motion.div
        className="relative z-10 w-full pt-20 pb-12"
        style={shouldReduceMotion ? {} : { y: contentY, opacity, scale }}
      >
        <Container className="max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge variant="outline" className="mb-8 backdrop-blur-sm">
                  AI-Powered Business Transformation
                </Badge>
              </motion.div>

              {/* Headline with word-by-word reveal */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-8 leading-[1.1] tracking-tight"
                initial="hidden"
                animate="visible"
                variants={shouldReduceMotion ? fadeIn : textRevealContainer}
              >
                {headlineWords.map((word, i) => (
                  <motion.span
                    key={i}
                    className={`inline-block mr-[0.25em] ${
                      word === 'Business' || word === 'Results'
                        ? 'text-gradient'
                        : ''
                    }`}
                    variants={shouldReduceMotion ? fadeIn : textRevealWord}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-12 leading-relaxed max-w-3xl mx-auto lg:mx-0 font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                Production-ready AI solutions that drive measurable impact.
                Enterprise chatbots to predictive analytics — in weeks, not months.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <Button
                  size="lg"
                  variant="primary"
                  isMagnetic
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Book Free Strategy Call
                  <Calendar className="ml-2.5 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  isMagnetic
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Our Work
                </Button>
              </motion.div>

              {/* Trust metrics */}
              <motion.div
                className="flex flex-wrap justify-center lg:justify-start items-center gap-8 sm:gap-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                {[
                  { value: '12+', label: 'Years Experience' },
                  { value: '$180K+', label: 'Savings Delivered' },
                  { value: '50%', label: 'Faster Than Firms' },
                ].map((item) => (
                  <div key={item.label} className="text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-gradient">{item.value}</div>
                    <div className="text-xs sm:text-sm text-text-muted mt-1 tracking-wide uppercase">{item.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column: Neural Engine Illustration */}
            <motion.div
              className="hidden lg:block relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <NeuralEngine />
            </motion.div>
          </div>
        </Container>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity }}
      >
        <span className="text-text-muted text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4 text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
