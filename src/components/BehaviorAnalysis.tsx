import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, FileDown } from 'lucide-react';
import { jsPDF } from 'jspdf';

const questions = [
  {
    id: 'q1',
    text: 'How do you typically handle stressful situations?',
    options: [
      'Take a step back and analyze',
      'Act immediately to resolve',
      'Seek support from others',
      'Avoid the situation'
    ]
  },
  {
    id: 'q2',
    text: 'When working in a team, what role do you naturally assume?',
    options: [
      'Leader',
      'Mediator',
      'Creative thinker',
      'Detail-oriented executor'
    ]
  },
  {
    id: 'q3',
    text: 'How do you prefer to learn new information?',
    options: [
      'Visual aids and diagrams',
      'Reading and writing',
      'Hands-on practice',
      'Discussion and verbal explanation'
    ]
  },
  {
    id: 'q4',
    text: 'What motivates you the most?',
    options: [
      'Personal achievement',
      'Recognition from others',
      'Making a difference',
      'Learning and growth'
    ]
  }
];

export const BehaviorAnalysis: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [report, setReport] = useState<{
    personalityType: string;
    strengths: string[];
    challenges: string[];
    recommendations: string[];
    emotionalIQ: number;
  } | null>(null);

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      generateReport();
    }
  };

  const generateReport = () => {
    // This is a simplified analysis - in a real app, you'd have more sophisticated logic
    const personalityTypes = ['Analytical', 'Leader', 'Creative', 'Supportive'];
    const randomType = personalityTypes[Math.floor(Math.random() * personalityTypes.length)];
    
    const report = {
      personalityType: randomType,
      strengths: [
        'Strong emotional awareness',
        'Excellent problem-solving skills',
        'Natural leadership abilities'
      ],
      challenges: [
        'May overthink decisions',
        'Could be too perfectionist',
        'Might struggle with work-life balance'
      ],
      recommendations: [
        'Practice mindfulness meditation',
        'Set clear boundaries',
        'Engage in regular physical exercise',
        'Maintain a reflection journal'
      ],
      emotionalIQ: Math.floor(Math.random() * 40) + 60 // Random EQ between 60-100
    };

    setReport(report);
    setAnalysisComplete(true);
  };

  const downloadReport = () => {
    if (!report) return;

    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(20);
    doc.text('Behavioral Analysis Report', 20, 20);
    
    // Add personality type
    doc.setFontSize(16);
    doc.text(`Personality Type: ${report.personalityType}`, 20, 40);
    doc.text(`Emotional Intelligence Score: ${report.emotionalIQ}`, 20, 50);
    
    // Add strengths
    doc.setFontSize(14);
    doc.text('Strengths:', 20, 70);
    report.strengths.forEach((strength, index) => {
      doc.text(`• ${strength}`, 30, 85 + (index * 10));
    });
    
    // Add challenges
    doc.text('Areas for Growth:', 20, 120);
    report.challenges.forEach((challenge, index) => {
      doc.text(`• ${challenge}`, 30, 135 + (index * 10));
    });
    
    // Add recommendations
    doc.text('Recommendations:', 20, 170);
    report.recommendations.forEach((rec, index) => {
      doc.text(`• ${rec}`, 30, 185 + (index * 10));
    });

    doc.save('behavioral-analysis-report.pdf');
  };

  if (!analysisComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8"
      >
        <div className="flex items-center gap-3 mb-8">
          <Brain className="w-8 h-8 text-blue-500" />
          <h2 className="text-2xl font-bold">Behavioral Analysis</h2>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-blue-500">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <h3 className="text-xl font-medium mb-6">
          {questions[currentQuestion].text}
        </h3>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full p-4 text-left rounded-lg border border-gray-200 hover:border-blue-500
                hover:bg-blue-50 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Your Analysis Results</h2>
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
            <h3 className="text-lg font-semibold mb-2">Personality Type</h3>
            <p className="text-3xl font-bold text-blue-500">
              {report?.personalityType}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Emotional Intelligence Score</h3>
            <div className="text-3xl font-bold text-green-500">
              {report?.emotionalIQ}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Key Strengths</h3>
            <ul className="list-disc list-inside space-y-2">
              {report?.strengths.map((strength, index) => (
                <li key={index} className="text-gray-700">{strength}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Areas for Growth</h3>
            <ul className="list-disc list-inside space-y-2">
              {report?.challenges.map((challenge, index) => (
                <li key={index} className="text-gray-700">{challenge}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {report?.recommendations.map((rec, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <p className="text-gray-700">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};