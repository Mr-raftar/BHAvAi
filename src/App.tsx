import React, { useState } from 'react';
import { Brain, Github, Mail, Phone, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { EmotionDetector } from './components/EmotionDetector';
import { BehaviorAnalysis } from './components/BehaviorAnalysis';

function App() {
  const [activeFeature, setActiveFeature] = useState<'emotion' | 'behavior' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <Brain className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 
                bg-clip-text text-transparent">
                BhavaAI
              </h1>
            </motion.div>
            
            <div className="flex items-center gap-6">
              <a
                href="mailto:emotion123@gmail.com"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="hidden sm:inline">emotion123@gmail.com</span>
              </a>
              <a
                href="tel:+918530381804"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="hidden sm:inline">+91 8530381804</span>
              </a>
              <a
                href="https://github.com/Mr-raftar/Emotion2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </div>
          </div>

          <nav className="flex gap-4">
            <button
              onClick={() => setActiveFeature('emotion')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeFeature === 'emotion'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Emotion Detection
            </button>
            <button
              onClick={() => setActiveFeature('behavior')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeFeature === 'behavior'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Behavior Analysis
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {!activeFeature && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              भाव पहचान (Emotion Recognition)
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the power of AI-driven emotion recognition with an Indian cultural context. 
              Choose a feature from the menu above to begin your emotional journey.
            </p>
          </motion.div>
        )}

        {activeFeature === 'emotion' && <EmotionDetector />}
        {activeFeature === 'behavior' && <BehaviorAnalysis />}

        {!activeFeature && (
          <section className="mt-20">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Real-time भाव Analysis',
                  description: 'Instant emotion detection through your webcam with Indian emotional context',
                  icon: '⚡'
                },
                {
                  title: 'Cultural Connection',
                  description: 'Curated songs and ancient wisdom based on your emotional state',
                  icon: '🎵'
                },
                {
                  title: 'Privacy First',
                  description: 'All processing happens locally in your browser with complete privacy',
                  icon: '🔒'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="bg-white mt-20 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>© 2024 BhavaAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;