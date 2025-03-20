import { EmotionData } from '../types/emotion';

export const emotionsData: Record<string, EmotionData> = {
  'शांति (Peaceful)': {
    name: 'Peaceful',
    songs: [
      {
        title: 'Kun Faya Kun',
        artist: 'A.R. Rahman',
        youtubeId: 'T94PHkuydcw',
        thumbnail: 'https://img.youtube.com/vi/T94PHkuydcw/maxresdefault.jpg'
      },
      {
        title: 'Tum Hi Ho',
        artist: 'Arijit Singh',
        youtubeId: 'Umqb9KENgmk',
        thumbnail: 'https://img.youtube.com/vi/Umqb9KENgmk/maxresdefault.jpg'
      },
      {
        title: 'Ae Watan',
        artist: 'Arijit Singh',
        youtubeId: 'BEMaH9Sm3lQ',
        thumbnail: 'https://img.youtube.com/vi/BEMaH9Sm3lQ/maxresdefault.jpg'
      },
      {
        title: 'Luka Chuppi',
        artist: 'A.R. Rahman',
        youtubeId: 'IeX8k0Lfk9s',
        thumbnail: 'https://img.youtube.com/vi/IeX8k0Lfk9s/maxresdefault.jpg'
      }
    ],
    quotes: [
      '"शांति का पथ, ज्ञान का पथ है।" - Buddha',
      '"मन की शांति ही सबसे बड़ी संपत्ति है।" - Ancient Indian Wisdom'
    ],
    color: 'from-blue-400 to-green-400',
    activities: [
      {
        title: 'Meditation',
        description: 'Practice mindfulness meditation for inner peace',
        benefits: ['Reduces stress', 'Improves focus', 'Enhances emotional balance'],
        duration: '15-30 minutes'
      },
      {
        title: 'Yoga',
        description: 'Gentle yoga poses for relaxation',
        benefits: ['Physical flexibility', 'Mental clarity', 'Stress relief'],
        duration: '30-45 minutes'
      }
    ],
    questions: [
      {
        id: 'peace1',
        text: 'How often do you feel overwhelmed by your thoughts?',
        options: ['Rarely', 'Sometimes', 'Often', 'Very Often']
      },
      {
        id: 'peace2',
        text: 'Do you practice any form of meditation?',
        options: ['Daily', 'Weekly', 'Occasionally', 'Never']
      }
    ],
    analysis: {
      strengths: ['Natural ability to remain calm', 'Good at conflict resolution'],
      challenges: ['May appear detached', 'Could be too passive'],
      recommendations: ['Practice active communication', 'Balance peace with assertiveness']
    }
  },
  'खुशी (Joy)': {
    name: 'Joy',
    songs: [
      {
        title: 'Badtameez Dil',
        artist: 'Benny Dayal',
        youtubeId: 'II2EO3Nw4m0',
        thumbnail: 'https://img.youtube.com/vi/II2EO3Nw4m0/maxresdefault.jpg'
      },
      {
        title: 'Rang De Basanti',
        artist: 'A.R. Rahman',
        youtubeId: 'BjmZbO4lXPI',
        thumbnail: 'https://img.youtube.com/vi/BjmZbO4lXPI/maxresdefault.jpg'
      },
      {
        title: 'Ullu Ka Pattha',
        artist: 'Arijit Singh',
        youtubeId: 'DJztXj2GPfk',
        thumbnail: 'https://img.youtube.com/vi/DJztXj2GPfk/maxresdefault.jpg'
      },
      {
        title: 'London Thumakda',
        artist: 'Labh Janjua',
        youtubeId: 'udra3Mfw2oo',
        thumbnail: 'https://img.youtube.com/vi/udra3Mfw2oo/maxresdefault.jpg'
      }
    ],
    quotes: [
      '"आनंद ही जीवन का सार है।" - Ancient Indian Proverb',
      '"खुशी बांटने से बढ़ती है।" - Indian Wisdom'
    ],
    color: 'from-yellow-400 to-orange-400',
    activities: [
      {
        title: 'Dance',
        description: 'Express joy through movement',
        benefits: ['Physical exercise', 'Emotional expression', 'Social connection'],
        duration: '30 minutes'
      },
      {
        title: 'Creative Art',
        description: 'Express yourself through colors and shapes',
        benefits: ['Self-expression', 'Stress relief', 'Mental stimulation'],
        duration: '45 minutes'
      }
    ],
    questions: [
      {
        id: 'joy1',
        text: 'What brings you the most happiness in daily life?',
        options: ['Relationships', 'Achievements', 'Hobbies', 'Nature']
      },
      {
        id: 'joy2',
        text: 'How do you typically celebrate your successes?',
        options: ['With friends/family', 'Personal reflection', 'Treating yourself', 'Setting new goals']
      }
    ],
    analysis: {
      strengths: ['Natural optimism', 'Ability to uplift others'],
      challenges: ['May overlook serious issues', 'Could be too carefree'],
      recommendations: ['Balance joy with responsibility', 'Share positivity mindfully']
    }
  }
  // ... Similar detailed data for other emotions
};