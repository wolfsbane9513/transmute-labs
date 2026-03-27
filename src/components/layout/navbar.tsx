'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { navLinks } from '@/lib/constants';
import { slideInRight } from '@/lib/animations';
import { cn } from '@/lib/cn';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isDrawerOpen]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          isScrolled
            ? 'bg-deep/80 backdrop-blur-[12px] border-b border-white/[0.08]'
            : 'bg-transparent',
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-16 sm:h-20">
            <a href="#" className="flex items-center space-x-2">
              <Beaker className="h-7 w-7 sm:h-8 sm:w-8 text-accent-amber" />
              <span className="text-xl sm:text-2xl font-bold text-text-primary">Transmute Labs</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={activeSection === link.href ? 'page' : undefined}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    activeSection === link.href
                      ? 'text-accent-amber'
                      : 'text-text-secondary hover:text-text-primary',
                  )}
                >
                  {link.label}
                </a>
              ))}
              <Button variant="primary" size="sm" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Book Strategy Call
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden flex items-center justify-center w-11 h-11 text-text-primary cursor-pointer"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-72 bg-deep border-l border-white/[0.08] z-50 lg:hidden flex flex-col"
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/[0.08]">
                <span className="text-lg font-bold text-text-primary">Menu</span>
                <button
                  className="flex items-center justify-center w-11 h-11 text-text-primary cursor-pointer"
                  onClick={closeDrawer}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-col p-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeDrawer}
                    aria-current={activeSection === link.href ? 'page' : undefined}
                    className={cn(
                      'px-4 py-3 rounded-lg text-base font-medium transition-colors',
                      activeSection === link.href
                        ? 'text-accent-amber bg-white/5'
                        : 'text-text-secondary hover:text-text-primary hover:bg-white/5',
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="p-4 mt-auto">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    closeDrawer();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Book Strategy Call
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
