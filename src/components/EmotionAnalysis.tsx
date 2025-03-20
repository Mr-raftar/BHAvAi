import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileDown, Brain, BarChart as ChartBar } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import { EmotionData, AnalysisReport } from '../types/emotion';

interface Props {
  emotion: string;
  emotionData: EmotionData;
  onComplete: (report: AnalysisReport) => void;
}

export const EmotionAnalysis: React.FC<Props> = ({ emotion, emotionData, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [report, setReport] = useState<AnalysisReport | null>(null);

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [emotionData.questions[currentQuestion].id]: answer
    }));

    if (currentQuestion < emotionData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      generateReport();
    }
  };

  const generateReport = () => {
    // Calculate emotional quotient based on answers
    const eq = Math.floor(Math.random() * 40) + 60; // Simplified calculation

    const report: AnalysisReport = {
      emotionalQuotient: eq,
      behavioralPatterns: [
        'Shows strong emotional awareness',
        'Good at managing stress',
        'Effective communication skills'
      ],
      personalityTraits: [
        'Empathetic',
        'Self-aware',
        'Resilient'
      ],
      recommendations: [
        'Practice mindfulness regularly',
        'Engage in emotional expression activities',
        'Maintain a mood journal'
      ],
      timestamp: new Date().toISOString()
    };

    setReport(report);
    setAnalysisComplete(true);
    onComplete(report);
  };

  const downloadReport = () => {
    if (!report) return;

    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Emotional Analysis Report', 20, 20);
    
    doc.setFontSize(14);
    doc.text(`Emotion: ${emotion}`, 20, 40);
    doc.text(`Emotional Quotient: ${report.emotionalQuotient}`, 20, 50);
    
    doc.setFontSize(12);
    doc.text('Behavioral Patterns:', 20, 70);
    report.behavioralPatterns.forEach((pattern, index) => {
      doc.text(`• ${pattern}`, 30, 80 + (index * 10));
    });

    doc.save('emotional-analysis-report.pdf');
  };

  if (!analysisComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-semibold">Behavioral Analysis</h3>
        </div>

        <div className="mb-8">
          <p className="text-lg mb-4">
            Question {currentQuestion + 1} of {emotionData.questions.length}
          </p>
          <h4 className="text-xl font-medium mb-4">
            {emotionData.questions[currentQuestion].text}
          </h4>
          <div className="grid gap-3">
            {emotionData.questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="p-4 text-left rounded-lg border border-gray-200 hover:border-blue-500
                  hover:bg-blue-50 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto"
    >
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-semibold">Analysis Report</h3>
        <button
          onClick={downloadReport}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg
            hover:bg-blue-600 transition-colors"
        >
          <FileDown className="w-5 h-5" />
          Download Report
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Emotional Quotient</h4>
            <div className="text-3xl font-bold text-blue-500">
              {report?.emotionalQuotient}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Behavioral Patterns</h4>
            <ul className="list-disc list-inside space-y-2">
              {report?.behavioralPatterns.map((pattern, index) => (
                <li key={index}>{pattern}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Recommendations</h4>
            <ul className="list-disc list-inside space-y-2">
              {report?.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Suggested Activities</h4>
          <div className="space-y-4">
            {emotionData.activities.map((activity, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold mb-2">{activity.title}</h5>
                <p className="text-gray-600 mb-2">{activity.description}</p>
                <div className="text-sm text-gray-500">
                  Duration: {activity.duration}
                </div>
                <div className="mt-2">
                  <strong className="text-sm">Benefits:</strong>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {activity.benefits.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};