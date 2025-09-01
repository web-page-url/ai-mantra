'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, Zap } from 'lucide-react';

// Pre-defined positions to avoid hydration mismatch
const PARTICLE_POSITIONS = [
  { left: 23.4, top: 12.1 }, { left: 67.8, top: 45.2 }, { left: 12.9, top: 78.3 },
  { left: 89.1, top: 23.4 }, { left: 45.6, top: 67.8 }, { left: 78.2, top: 34.5 },
  { left: 34.7, top: 89.6 }, { left: 56.3, top: 12.7 }, { left: 91.8, top: 56.9 },
  { left: 18.4, top: 73.2 }, { left: 72.6, top: 28.8 }, { left: 39.1, top: 84.7 },
  { left: 83.5, top: 41.3 }, { left: 27.9, top: 65.1 }, { left: 64.2, top: 19.7 },
  { left: 15.8, top: 52.4 }, { left: 76.3, top: 37.9 }, { left: 52.7, top: 81.6 },
  { left: 95.1, top: 26.3 }, { left: 41.8, top: 72.8 }, { left: 68.4, top: 14.9 },
  { left: 22.6, top: 59.7 }, { left: 87.9, top: 33.1 }, { left: 35.2, top: 76.4 },
  { left: 71.8, top: 48.6 }, { left: 58.3, top: 91.2 }, { left: 14.7, top: 25.8 },
  { left: 79.6, top: 62.3 }, { left: 46.1, top: 17.9 }, { left: 92.4, top: 54.7 },
  { left: 29.8, top: 83.1 }, { left: 65.9, top: 39.4 }, { left: 38.7, top: 71.6 },
  { left: 82.1, top: 27.2 }, { left: 54.8, top: 64.9 }, { left: 19.3, top: 46.5 },
  { left: 75.2, top: 18.7 }, { left: 43.6, top: 57.3 }, { left: 86.8, top: 32.8 },
  { left: 32.4, top: 79.1 }, { left: 69.7, top: 44.7 }, { left: 51.9, top: 87.4 },
  { left: 16.5, top: 23.6 }, { left: 77.8, top: 61.2 }, { left: 44.2, top: 36.8 },
  { left: 91.6, top: 74.5 }, { left: 28.1, top: 49.9 }, { left: 63.4, top: 85.3 },
  { left: 85.7, top: 21.4 }, { left: 42.9, top: 68.7 }
];

export default function Hero() {
  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-blue-900/20" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {PARTICLE_POSITIONS.map((position, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30"
              style={{
                left: `${position.left}%`,
                top: `${position.top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + (i % 3), // Deterministic duration based on index
                repeat: Infinity,
                delay: (i % 5) * 0.4, // Deterministic delay based on index
              }}
            />
          ))}
        </div>

        {/* Gradient Waves */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 50%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(147,51,234,0.1) 0%, transparent 50%)',
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="space-y-8"
        >
          {/* Logo/Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-center animate-glow">
                <Sparkles className="w-10 h-10 text-blue-400" />
              </div>
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Zap className="w-3 h-3 text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight"
          >
            <span className="neon-text">Ai</span>
            <span className="text-white">-</span>
            <span className="neon-text">Mantra</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl sm:text-2xl lg:text-3xl font-medium text-gradient max-w-4xl mx-auto leading-relaxed"
          >
            Your Daily AI Mantra — Compare, Create, Conquer.
          </motion.p>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the power of multiple AI models working together. Compare responses side by side, 
            explore creative possibilities, and discover the perfect AI companion for every task.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <motion.button
              onClick={scrollToDemo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-10 py-4 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Try Demo
                <ArrowDown className="w-5 h-5 group-hover:animate-bounce" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
                layoutId="button-bg"
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-lg px-10 py-4 group"
            >
              <span className="flex items-center gap-2">
                Get Started
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-gray-400 cursor-pointer"
              onClick={scrollToDemo}
            >
              <span className="text-sm font-medium">Explore More</span>
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" />
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" />
      <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" />
    </section>
  );
}