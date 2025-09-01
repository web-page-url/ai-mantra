'use client';

import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Shield } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Free',
    price: '0',
    period: 'forever',
    description: 'Perfect for trying out Ai-Mantra',
    icon: Star,
    color: 'from-gray-500 to-gray-600',
    borderColor: 'border-gray-500/20',
    features: [
      '10 AI comparisons per day',
      '2 AI models (GPT-4 & Claude)',
      'Basic response comparison',
      'Standard support',
      'Export to text'
    ],
    limitations: [
      'Limited daily usage',
      'Basic models only'
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '19',
    period: 'month',
    description: 'For professionals and creators',
    icon: Zap,
    color: 'from-blue-500 to-purple-500',
    borderColor: 'border-blue-500/30',
    features: [
      '500 AI comparisons per day',
      '6+ AI models available',
      'Advanced comparison tools',
      'Priority support',
      'Export to PDF & JSON',
      'Response analytics',
      'Custom prompts library',
      'API access (basic)'
    ],
    limitations: [],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    name: 'Ultimate',
    price: '49',
    period: 'month',
    description: 'For teams and enterprises',
    icon: Crown,
    color: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-500/30',
    features: [
      'Unlimited AI comparisons',
      'All AI models + new releases',
      'Advanced analytics dashboard',
      '24/7 priority support',
      'All export formats',
      'Team collaboration tools',
      'Custom AI model fine-tuning',
      'Full API access',
      'White-label options',
      'Dedicated account manager'
    ],
    limitations: [],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/30 to-black" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="neon-text">Simple Pricing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Choose the perfect plan for your AI exploration journey. 
            Start free and upgrade as you grow.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                ease: 'easeOut'
              }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative group ${plan.popular ? 'lg:scale-105' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </div>
                </motion.div>
              )}

              {/* Card */}
              <div className={`card-glass h-full p-8 relative overflow-hidden ${plan.borderColor} border-2`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${plan.color}`} />
                
                {/* Header */}
                <div className="relative z-10 text-center mb-8">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.2 + 0.4,
                      type: 'spring',
                      stiffness: 200
                    }}
                    className="mb-4 flex justify-center"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                      <plan.icon className="w-full h-full text-white" />
                    </div>
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>

                {/* Price */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                  className="text-center mb-8"
                >
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400">/{plan.period}</span>
                  </div>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
                  className="space-y-4 mb-8"
                >
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.2 + 0.8 + featureIndex * 0.1 
                      }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </motion.div>
                  ))}

                  {plan.limitations.map((limitation, limitIndex) => (
                    <motion.div
                      key={limitation}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.2 + 0.8 + (plan.features.length + limitIndex) * 0.1 
                      }}
                      className="flex items-center gap-3 opacity-60"
                    >
                      <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-400 text-xs">×</span>
                      </div>
                      <span className="text-gray-400 text-sm line-through">{limitation}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 1.2 }}
                  className="relative z-10"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
                      plan.popular
                        ? `bg-gradient-to-r ${plan.color} hover:shadow-lg hover:shadow-blue-500/25`
                        : `border-2 ${plan.borderColor} bg-transparent hover:bg-gradient-to-r hover:${plan.color} hover:border-transparent`
                    }`}
                  >
                    {plan.cta}
                  </motion.button>
                </motion.div>

                {/* Hover Effect Border */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${plan.color} opacity-0 group-hover:opacity-10`}
                  initial={false}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16 space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Shield className="w-5 h-5" />
            <span>30-day money-back guarantee on all paid plans</span>
          </div>
          <p className="text-sm text-gray-500">
            All plans include SSL security, 99.9% uptime guarantee, and regular feature updates.
          </p>
        </motion.div>
      </div>
    </section>
  );
}