'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Users, Award, Star, TrendingUp, CheckCircle, Zap, Bot, Globe, Linkedin,
} from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { fadeInUp, fadeIn, staggerContainer } from '@/lib/animations';
import { teamMembers, expertise } from '@/lib/constants';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Award, Star, TrendingUp, CheckCircle, Zap, Bot, Globe,
};

export function Team() {
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = shouldReduceMotion ? fadeIn : fadeInUp;

  return (
    <Section id="team">
      <Container>
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariant}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Meet Our Founding Team
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
            Expert founders and engineers with deep AI, ML, and fintech experience delivering production-ready solutions
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          {teamMembers.map((member) => (
            <motion.div key={member.name} variants={itemVariant} whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
              <Card className="h-full text-center">
                <CardHeader>
                  <Users className="h-12 w-12 text-accent-amber mx-auto mb-4" />
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {member.achievements.map((achievement) => {
                      const Icon = iconMap[achievement.icon];
                      return (
                        <div key={achievement.text} className="flex items-center justify-center space-x-2">
                          {Icon && <Icon className="h-4 w-4 text-accent-amber" />}
                          <span className="text-text-muted text-xs">{achievement.text}</span>
                        </div>
                      );
                    })}
                  </div>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-accent-amber hover:text-amber-300 transition-colors text-sm"
                  >
                    <Linkedin className="mr-1 h-3 w-3" />
                    LinkedIn Profile
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Expertise Matrix */}
        <motion.div
          className="mt-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariant}
        >
          <Card className="max-w-5xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-text-primary mb-6">
                Technical Expertise & Certifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                {expertise.map((category) => (
                  <div key={category.title}>
                    <h4 className="text-accent-amber font-semibold mb-3">{category.title}</h4>
                    <ul className="text-text-secondary text-sm space-y-1">
                      {category.items.map((item) => (
                        <li key={item}>&#8226; {item}</li>
                      ))}
                    </ul>
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
