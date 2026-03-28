'use client';

import { motion } from 'framer-motion';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { TechMarquee } from '@/components/ui/tech-marquee';
import { Services } from '@/components/sections/services';
import { CaseStudies } from '@/components/sections/case-studies';
import { Team } from '@/components/sections/team';
import { Advantage } from '@/components/sections/advantage';
import { Contact } from '@/components/sections/contact';
import { SectionTracker } from '@/components/ui/section-tracker';

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <motion.main 
        id="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <SectionTracker />
        <Hero />
        <TechMarquee />
        <Services />
        <CaseStudies />
        <Team />
        <Advantage />
        <Contact />
      </motion.main>
      <Footer />
    </SmoothScrollProvider>
  );
}
