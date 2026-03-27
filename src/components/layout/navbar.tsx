'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Beaker, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { navLinks } from '@/lib/constants';
import { slideInRight } from '@/lib/animations';
import { cn } from '@/lib/cn';

export function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.08]);

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
      <motion.nav
        className="fixed top-0 w-full z-50"
        style={{
          backgroundColor: useTransform(bgOpacity, (v) => `rgba(5, 5, 16, ${v * 0.85})`),
          borderBottom: useTransform(borderOpacity, (v) => `1px solid rgba(255, 255, 255, ${v})`),
          backdropFilter: useTransform(bgOpacity, (v) => `blur(${v * 20}px)`),
        }}
      >
        <Container>
          <div className="flex items-center justify-between h-18 sm:h-20">
            <a href="#" className="flex items-center space-x-2.5 group">
              <div className="relative">
                <Beaker className="h-7 w-7 sm:h-8 sm:w-8 text-accent-amber transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                Transmute <span className="text-gradient">Labs</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={activeSection === link.href ? 'page' : undefined}
                  className={cn(
                    'nav-link px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg',
                    activeSection === link.href
                      ? 'text-amber-400'
                      : 'text-text-secondary hover:text-text-primary',
                  )}
                >
                  {link.label}
                </a>
              ))}
              <div className="ml-4">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Book Strategy Call
                </Button>
              </div>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden flex items-center justify-center w-11 h-11 text-text-primary cursor-pointer rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 bg-deep/95 backdrop-blur-xl border-l border-white/[0.06] z-50 lg:hidden flex flex-col"
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                <span className="text-lg font-bold text-text-primary">Menu</span>
                <button
                  className="flex items-center justify-center w-11 h-11 text-text-primary cursor-pointer rounded-lg hover:bg-white/5 transition-colors"
                  onClick={closeDrawer}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col p-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={closeDrawer}
                    aria-current={activeSection === link.href ? 'page' : undefined}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className={cn(
                      'px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200',
                      activeSection === link.href
                        ? 'text-amber-400 bg-amber-400/[0.08]'
                        : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.04]',
                    )}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              <div className="p-5 mt-auto">
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
