'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Copy, ThumbsUp, ThumbsDown, Sparkles, Bot, Loader2 } from 'lucide-react';

interface AIResponse {
  model: string;
  response: string;
  loading: boolean;
  icon: string;
  color: string;
}

const aiModels = [
  { name: 'GPT-4', icon: '🤖', color: 'from-green-500 to-emerald-500' },
  { name: 'Claude', icon: '🧠', color: 'from-blue-500 to-cyan-500' },
  { name: 'Gemini', icon: '💎', color: 'from-purple-500 to-pink-500' },
  { name: 'Llama', icon: '🦙', color: 'from-orange-500 to-red-500' },
];

export default function Demo() {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    
    // Initialize responses with loading state
    const initialResponses = aiModels.map(model => ({
      model: model.name,
      response: '',
      loading: true,
      icon: model.icon,
      color: model.color,
    }));
    
    setResponses(initialResponses);

    try {
      // Simulate API call to our backend
      const response = await fetch('/api/ai-compare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Simulate staggered responses
        data.responses.forEach((resp: any, index: number) => {
          setTimeout(() => {
            setResponses(prev => prev.map((item, i) => 
              i === index 
                ? { ...item, response: resp.response, loading: false }
                : item
            ));
          }, (index + 1) * 1000);
        });
      } else {
        // Fallback to demo responses
        simulateDemoResponses();
      }
    } catch (error) {
      console.error('Error:', error);
      simulateDemoResponses();
    }

    setIsGenerating(false);
  };

  const simulateDemoResponses = () => {
    const demoResponses = [
      "I'd be happy to help you with that! This is a comprehensive approach that considers multiple perspectives and provides actionable insights.",
      "Here's my take on your question. I'll break this down into clear, manageable steps that you can follow easily.",
      "Great question! Let me provide you with a detailed analysis that covers the key aspects you should consider.",
      "I understand what you're looking for. Here's a thoughtful response that addresses your specific needs and requirements.",
    ];

    demoResponses.forEach((resp, index) => {
      setTimeout(() => {
        setResponses(prev => prev.map((item, i) => 
          i === index 
            ? { ...item, response: resp, loading: false }
            : item
        ));
      }, (index + 1) * 1500);
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <section id="demo" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/10 to-blue-900/10" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="neon-text">Try It Live</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the power of multiple AI models working simultaneously. 
            Enter a prompt and watch as different AI models provide their unique perspectives.
          </motion.p>
        </motion.div>

        {/* Demo Interface */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Input Form */}
          <div className="card-glass mb-12 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask anything... Compare how different AI models respond to your prompt!"
                  className="w-full p-6 bg-black/30 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 resize-none min-h-[120px] text-lg"
                  disabled={isGenerating}
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <span className="text-sm text-gray-500">
                    {prompt.length}/500
                  </span>
                </div>
              </div>
              
              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  disabled={!prompt.trim() || isGenerating}
                  whileHover={{ scale: prompt.trim() && !isGenerating ? 1.05 : 1 }}
                  whileTap={{ scale: prompt.trim() && !isGenerating ? 0.95 : 1 }}
                  className="btn-primary px-10 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        Compare AI Models
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </form>
          </div>

          {/* AI Responses Grid */}
          {responses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {responses.map((response, index) => (
                <motion.div
                  key={response.model}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="card-glass relative overflow-hidden"
                >
                  {/* Model Header */}
                  <div className="flex items-center gap-3 p-6 pb-4 border-b border-white/10">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${response.color} flex items-center justify-center text-lg`}>
                      {response.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">{response.model}</h3>
                      <p className="text-sm text-gray-400">AI Model Response</p>
                    </div>
                    {response.loading && (
                      <div className="ml-auto">
                        <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                      </div>
                    )}
                  </div>

                  {/* Response Content */}
                  <div className="p-6 pt-4">
                    {response.loading ? (
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-700 rounded animate-pulse" />
                        <div className="h-4 bg-gray-700 rounded animate-pulse w-4/5" />
                        <div className="h-4 bg-gray-700 rounded animate-pulse w-3/5" />
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-300 leading-relaxed mb-6">
                          {response.response}
                        </p>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => copyToClipboard(response.response)}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 transition-all duration-300"
                          >
                            <Copy className="w-4 h-4" />
                            Copy
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-500/30 rounded-lg text-sm text-gray-300 hover:text-green-400 transition-all duration-300"
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 rounded-lg text-sm text-gray-300 hover:text-red-400 transition-all duration-300"
                          >
                            <ThumbsDown className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Loading Overlay */}
                  {response.loading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-pulse" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Demo Suggestions */}
          {responses.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <p className="text-gray-400 mb-6">Try these example prompts:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Explain quantum computing in simple terms",
                  "Write a creative story about AI",
                  "How to learn programming effectively?",
                  "What's the future of renewable energy?"
                ].map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPrompt(suggestion)}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm text-gray-300 transition-all duration-300"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}