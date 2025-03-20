export interface Song {
  title: string;
  artist: string;
  youtubeId: string;
  thumbnail: string;
}

export interface Activity {
  title: string;
  description: string;
  benefits: string[];
  duration: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
}

export interface EmotionData {
  name: string;
  songs: Song[];
  quotes: string[];
  color: string;
  activities: Activity[];
  questions: Question[];
  analysis: {
    strengths: string[];
    challenges: string[];
    recommendations: string[];
  };
}

export interface AnalysisReport {
  emotionalQuotient: number;
  behavioralPatterns: string[];
  personalityTraits: string[];
  recommendations: string[];
  timestamp: string;
}