'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Calculator, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function ROICalculator() {
  const [manualHours, setManualHours] = useState(20);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [efficiency, setEfficiency] = useState(40);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    const annualHours = manualHours * 52;
    const currentCost = annualHours * hourlyRate;
    const annualSavings = currentCost * (efficiency / 100);
    setSavings(Math.floor(annualSavings));
  }, [manualHours, hourlyRate, efficiency]);

  return (
    <Card className="w-full max-w-xl mx-auto border-amber-400/20 shadow-2xl shadow-amber-500/5">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2 text-accent-amber mb-2">
          <Calculator className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-widest">Interactive Simulation</span>
        </div>
        <CardTitle className="text-2xl">AI ROI Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-6">
          {/* Manual Hours */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Manual Tasks (hrs/week)</span>
              <span className="text-text-primary font-bold">{manualHours}h</span>
            </div>
            <input
              type="range"
              min="5"
              max="160"
              value={manualHours}
              onChange={(e) => setManualHours(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

          {/* Hourly Rate */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Average Hourly Rate ($)</span>
              <span className="text-text-primary font-bold">${hourlyRate}/hr</span>
            </div>
            <input
              type="range"
              min="20"
              max="200"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

          {/* Efficiency */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Expected Efficiency Gain</span>
              <span className="text-text-primary font-bold">{efficiency}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              value={efficiency}
              onChange={(e) => setEfficiency(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>
        </div>

        {/* Result */}
        <div className="pt-6 border-t border-white/10">
          <div className="text-center space-y-2">
            <span className="text-text-muted text-sm uppercase tracking-wider">Estimated Annual Savings</span>
            <div className="relative inline-block">
              <motion.div
                key={savings}
                initial={{ scale: 1.1, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl md:text-5xl font-bold text-gradient"
              >
                ${savings.toLocaleString()}
              </motion.div>
              <AnimatePresence>
                {savings > 20000 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute -top-4 -right-8 text-amber-400"
                  >
                    <Sparkles className="h-6 w-6 animate-pulse" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
