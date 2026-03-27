'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Users, Award, Star, TrendingUp, CheckCircle, Zap, Bot, Globe, Linkedin, ArrowUpRight,
} from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fadeInUp, fadeIn, staggerContainer } from '@/lib/animations';
import { teamMembers, expertise } from '@/lib/constants';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Award, Star, TrendingUp, CheckCircle, Zap, Bot, Globe,
};

const memberGradients = [
  'from-blue-500/10 to-cyan-500/10',
  'from-amber-500/10 to-orange-500/10',
  'from-purple-500/10 to-pink-500/10',
  'from-green-500/10 to-emerald-500/10',
];

export function Team() {
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = shouldReduceMotion ? fadeIn : fadeInUp;

  return (
    <Section id="team" divider>
      <Container>
        <motion.div
          className="max-w-2xl mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariant}
        >
          <Badge variant="purple" className="mb-4">Our Team</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-5 leading-tight">
            Built by{' '}
            <span className="text-gradient">experts</span>
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            Deep AI, ML, and fintech experience delivering production-ready solutions for enterprise clients.
          </p>
        </motion.div>

        {/* Team grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              variants={itemVariant}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group"
            >
              <Card className="h-full text-center">
                <CardHeader className="pb-4">
                  {/* Avatar placeholder with gradient */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${memberGradients[i]} flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300`}>
                    <Users className="h-10 w-10 text-text-secondary/60" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-amber-400/80 text-xs font-medium tracking-wide uppercase">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2.5 mb-5">
                    {member.achievements.map((achievement) => {
                      const Icon = iconMap[achievement.icon];
                      return (
                        <div key={achievement.text} className="flex items-center space-x-2">
                          {Icon && <Icon className="h-3.5 w-3.5 text-accent-amber/60" />}
                          <span className="text-text-muted text-xs">{achievement.text}</span>
                        </div>
                      );
                    })}
                  </div>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-text-muted hover:text-amber-400 transition-colors text-xs font-medium group/link"
                  >
                    <Linkedin className="mr-1.5 h-3.5 w-3.5" />
                    Connect
                    <ArrowUpRight className="ml-0.5 h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Expertise matrix */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={itemVariant}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.04]">
            {expertise.map((category, i) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <h4 className="text-amber-400 font-semibold mb-4 text-sm tracking-wide uppercase">{category.title}</h4>
                <ul className="text-text-secondary text-sm space-y-2.5">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-center space-x-2">
                      <div className="w-1 h-1 rounded-full bg-text-muted" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
