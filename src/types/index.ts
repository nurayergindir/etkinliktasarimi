export type TeacherCategory = 'exams' | 'resources' | 'plans' | 'documents' | 'games';

export interface ResourceItem {
  id: string;
  category: TeacherCategory;
  title: string;
  description: string;
  url: string;
  dateAdded: string;
  tags: string[];
  isPinned?: boolean;
  isDriveFolder?: boolean;
  type?: 'drive' | 'link' | 'document' | 'pdf' | 'app';
}

export interface EducationalQuote {
  id: string;
  quote: string;
  author: string;
  title: string;
  era?: string;
  tags: string[];
  category: 'vizyon' | 'öğretmenlik' | 'öğrenme' | 'rehberlik' | 'çaba';
}

export type GameSubject = 'all' | 'matematik' | 'fen' | 'turkce' | 'sosyal' | 'mantik' | 'kodlama';
export type GradeLevel = 'all' | 'ilkokul' | 'ortaokul' | 'lise';

export interface EducationalGame {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  subject: Exclude<GameSubject, 'all'>;
  gradeLevels: string[];
  durationMinutes: number;
  colorGradient: string;
  accentColor: string;
  iconName: string;
  badgeText: string;
  isPlayableInApp: boolean;
  inAppGameId?: 'math-sprint' | 'word-hunter' | 'trivia-quiz' | 'memory-match';
  externalUrl?: string;
  skillsLearned: string[];
  rating: number;
  playCount: number;
}
