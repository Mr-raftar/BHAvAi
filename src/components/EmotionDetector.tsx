import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, Music, Quote, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { emotionsData } from '../data/emotionsData';
import { EmotionAnalysis } from './EmotionAnalysis';
import type { AnalysisReport } from '../types/emotion';

export const EmotionDetector: React.FC = () => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number>(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisReport, setAnalysisReport] = useState<AnalysisReport | null>(null);

  const handleDetection = () => {
    setIsDetecting(true);
    setTimeout(() => {
      const emotions = Object.keys(emotionsData);
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      const randomConfidence = Math.floor(Math.random() * 20 + 80);
      setCurrentEmotion(randomEmotion);
      setConfidence(randomConfidence);
      setIsDetecting(false);
      setShowAnalysis(true);
    }, 2000);
  };

  const handleAnalysisComplete = (report: AnalysisReport) => {
    setAnalysisReport(report);
  };

  const refreshSongs = () => {
    if (currentEmotion) {
      const data = emotionsData[currentEmotion];
      // Simulate refreshing songs by re-rendering
      setAnalysisReport({ ...analysisReport! });
    }
  };

  const renderSongRecommendations = (emotion: string) => {
    const data = emotionsData[emotion];
    return (
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Music className="w-5 h-5" />
            Recommended Songs for {data.name}
          </h3>
          <button
            onClick={refreshSongs}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors"
          >
            <RefreshCcw className="w-5 h-5" />
            Refresh Songs
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.songs.map((song, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={song.thumbnail}
                alt={song.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold text-lg">{song.title}</h4>
                <p className="text-gray-600">{song.artist}</p>
                <a
                  href={`https://www.youtube.com/watch?v=${song.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Play on YouTube
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderQuotes = (emotion: string) => {
    const data = emotionsData[emotion];
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Quote className="w-5 h-5" />
          Wisdom for {data.name}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <p className="text-lg italic">{quote}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="relative">
        <Webcam
          className="w-full rounded-2xl shadow-xl"
          mirrored
          screenshotFormat="image/jpeg"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3"
        >
          <Camera className="w-6 h-6 text-gray-700" />
        </motion.div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <button
          onClick={handleDetection}
          disabled={isDetecting}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full
            font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isDetecting ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Analyzing Expression...
            </>
          ) : (
            <>
              <Camera className="w-5 h-5" />
              Detect Emotion
            </>
          )}
        </button>

        <AnimatePresence>
          {currentEmotion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 text-center"
            >
              <h3 className="text-2xl font-bold text-gray-800">
                Detected Emotion:
              </h3>
              <p className={`text-4xl font-bold bg-gradient-to-r ${emotionsData[currentEmotion].color} 
                bg-clip-text text-transparent mt-2`}>
                {currentEmotion}
              </p>
              <p className="text-gray-600 mt-2">
                Confidence: {confidence}%
              </p>

              {showAnalysis && !analysisReport && (
                <EmotionAnalysis
                  emotion={currentEmotion}
                  emotionData={emotionsData[currentEmotion]}
                  onComplete={handleAnalysisComplete}
                />
              )}

              {analysisReport && (
                <>
                  {renderSongRecommendations(currentEmotion)}
                  {renderQuotes(currentEmotion)}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};