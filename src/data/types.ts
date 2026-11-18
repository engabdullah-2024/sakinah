export type CategoryId =
  | 'morning' | 'evening' | 'sleep' | 'waking' | 'home' | 'toilet'
  | 'eating' | 'mosque' | 'travel' | 'worry' | 'forgiveness' | 'quran';

export type Bilingual = { en: string; so: string };

export type Dua = {
  id: string;
  categories: CategoryId[];
  title: Bilingual;
  arabic: string;
  transliteration: string;
  english: string;
  somali: string;
  /** false until a qualified reviewer approves the Somali meaning */
  somaliReviewed: boolean;
  reference: string;
  repeat: number;
  virtue: string | null;
};

export type Category = {
  id: CategoryId;
  title: Bilingual;
  /** when to read, shown under the title */
  hint: Bilingual;
  icon: IconName;
  tone: 'mint' | 'sand';
};

export type IconName =
  | 'home' | 'heart' | 'sliders' | 'search' | 'back' | 'forward' | 'share' | 'sun' | 'moon'
  | 'sunrise' | 'house' | 'utensils' | 'mosque' | 'plane' | 'wind' | 'drop' | 'book' | 'beads'
  | 'check' | 'clock' | 'undo' | 'reset' | 'vibrate' | 'target' | 'lock' | 'user' | 'info' | 'pin'
  | 'play' | 'repeat' | 'shield' | 'door' | 'code' | 'type' | 'globe' | 'close' | 'grid' | 'star';
