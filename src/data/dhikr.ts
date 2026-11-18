export type Dhikr = { id: string; name: string; arabic: string; english: string; somali: string };

export const DHIKR: Dhikr[] = [
  { id: 'subhanallah', name: 'SubhanAllah', arabic: 'سُبْحَانَ اللَّهِ', english: 'Glory be to Allah', somali: 'Allaah waa nasahan yahay' },
  { id: 'alhamdulillah', name: 'Alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', english: 'All praise is for Allah', somali: 'Mahad oo dhan waxaa leh Allaah' },
  { id: 'allahuakbar', name: 'Allahu Akbar', arabic: 'اللَّهُ أَكْبَرُ', english: 'Allah is the Greatest', somali: 'Allaah ayaa ka weyn wax walba' },
  { id: 'tahlil', name: 'La ilaha illallah', arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ', english: 'There is no god but Allah', somali: 'Ilaah xaq lagu caabudo ma jiro Allaah mooyee' },
  { id: 'istighfar', name: 'Astaghfirullah', arabic: 'أَسْتَغْفِرُ اللَّهَ', english: 'I seek Allah’s forgiveness', somali: 'Allaah ayaan dambi-dhaaf weydiisanayaa' },
  { id: 'salawat', name: 'Salawat', arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', english: 'O Allah, send blessings upon Muhammad', somali: 'Allow naxariis ku yeel Nabi Muxammad' },
];

export const TASBIH_TARGETS = [33, 99, 100] as const;
export type TasbihTarget = (typeof TASBIH_TARGETS)[number];
