import type { Category, CategoryId } from './types';

export const CATEGORIES: Category[] = [
  { id: 'morning', title: { en: 'Morning adhkar', so: 'Adkaarta subaxa' }, hint: { en: 'After Fajr', so: 'Fajarka kadib' }, icon: 'sunrise', tone: 'sand' },
  { id: 'evening', title: { en: 'Evening adhkar', so: 'Adkaarta fiidka' }, hint: { en: 'After Asr', so: 'Casarka kadib' }, icon: 'moon', tone: 'mint' },
  { id: 'sleep', title: { en: 'Sleep', so: 'Hurdo' }, hint: { en: 'At bedtime', so: 'Marka la seexanayo' }, icon: 'star', tone: 'mint' },
  { id: 'waking', title: { en: 'Waking up', so: 'Toosid' }, hint: { en: 'On waking', so: 'Marka la toosayo' }, icon: 'sun', tone: 'sand' },
  { id: 'home', title: { en: 'Home', so: 'Guriga' }, hint: { en: 'Leaving and entering', so: 'Bixid iyo gelid' }, icon: 'house', tone: 'mint' },
  { id: 'eating', title: { en: 'Eating and drinking', so: 'Cunto iyo cabbitaan' }, hint: { en: 'Before and after meals', so: 'Cuntada kahor iyo kadib' }, icon: 'utensils', tone: 'sand' },
  { id: 'mosque', title: { en: 'Mosque and prayer', so: 'Masjidka iyo salaadda' }, hint: { en: 'Entering, leaving, after prayer', so: 'Gelid, bixid, salaadda kadib' }, icon: 'mosque', tone: 'mint' },
  { id: 'travel', title: { en: 'Travel', so: 'Safar' }, hint: { en: 'On the road', so: 'Waddada' }, icon: 'plane', tone: 'sand' },
  { id: 'worry', title: { en: 'Worry and distress', so: 'Walwal iyo murugo' }, hint: { en: 'When the heart is heavy', so: 'Marka qalbigu culus yahay' }, icon: 'wind', tone: 'mint' },
  { id: 'forgiveness', title: { en: 'Forgiveness', so: 'Dambi-dhaaf' }, hint: { en: 'Istighfar and repentance', so: 'Istighfaar iyo toobad' }, icon: 'drop', tone: 'sand' },
  { id: 'quran', title: { en: 'Duas from the Qur’an', so: 'Ducooyinka Qur’aanka' }, hint: { en: 'Rabbana duas', so: 'Ducooyinka Rabbanaa' }, icon: 'book', tone: 'mint' },
  { id: 'toilet', title: { en: 'Toilet', so: 'Musqusha' }, hint: { en: 'Entering and leaving', so: 'Gelid iyo bixid' }, icon: 'door', tone: 'sand' },
];

const BY_ID = new Map(CATEGORIES.map((c) => [c.id, c]));

export function getCategory(id: string): Category | undefined {
  return BY_ID.get(id as CategoryId);
}

export function isCategoryId(id: string): id is CategoryId {
  return BY_ID.has(id as CategoryId);
}
