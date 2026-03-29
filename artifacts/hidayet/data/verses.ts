export interface DailyVerse {
  id: number;
  arabic: string;
  transliteration: string;
  turkish: string;
  english: string;
  surahTr: string;
  surahEn: string;
  ref: string;
}

export interface DailyDua {
  id: number;
  arabic: string;
  transliteration: string;
  turkish: string;
  english: string;
  occasionTr: string;
  occasionEn: string;
}

export const dailyVerses: DailyVerse[] = [
  {
    id: 0,
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    transliteration: 'Bismillāhir-raḥmānir-raḥīm',
    turkish: 'Rahman ve Rahim olan Allah\'ın adıyla.',
    english: 'In the name of Allah, the Most Gracious, the Most Merciful.',
    surahTr: 'Fatiha Suresi',
    surahEn: 'Surah Al-Fatiha',
    ref: '1:1',
  },
  {
    id: 1,
    arabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
    transliteration: 'Lā yukallifullāhu nafsan illā wus\'ahā',
    turkish: 'Allah kimseye gücünün yeteceğinden fazlasını yüklemez.',
    english: 'Allah does not burden a soul beyond that it can bear.',
    surahTr: 'Bakara Suresi',
    surahEn: 'Surah Al-Baqarah',
    ref: '2:286',
  },
  {
    id: 2,
    arabic: 'وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ',
    transliteration: 'Wa lā tahinū wa lā taḥzanū wa antumul-a\'lawn',
    turkish: 'Gevşemeyin, üzülmeyin! Eğer inanıyorsanız, üstün olan sizsiniz.',
    english: 'Do not lose heart or grieve — you will have the upper hand if you are true believers.',
    surahTr: 'Al-i İmran Suresi',
    surahEn: 'Surah Al-Imran',
    ref: '3:139',
  },
  {
    id: 3,
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ',
    transliteration: 'Qul huwallāhu aḥad. Allāhuṣ-ṣamad.',
    turkish: 'De ki: O Allah tektir. Allah her şeyden müstağni, her şey O\'na muhtaçtır.',
    english: 'Say: He is Allah, the One. Allah, the Eternal, Absolute.',
    surahTr: 'İhlas Suresi',
    surahEn: 'Surah Al-Ikhlas',
    ref: '112:1-2',
  },
  {
    id: 4,
    arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ',
    transliteration: 'Qul a\'ūdhu birabbin-nās. Malikin-nās. Ilāhin-nās.',
    turkish: 'De ki: İnsanların Rabbine, insanların Melikine, insanların İlahına sığınırım.',
    english: 'Say: I seek refuge in the Lord of mankind, the Sovereign of mankind, the God of mankind.',
    surahTr: 'Nas Suresi',
    surahEn: 'Surah An-Nas',
    ref: '114:1-3',
  },
  {
    id: 5,
    arabic: 'وَالْعَصْرِ ۝ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ ۝ إِلَّا الَّذِينَ آمَنُوا',
    transliteration: 'Wal-\'aṣr. Innal-insāna lafī khusr. Illal-ladhīna āmanū',
    turkish: 'Asra yemin olsun ki insan gerçekten hüsran içindedir. Ancak iman edip salih ameller işleyenler müstesna.',
    english: 'By time, indeed mankind is in loss. Except for those who have believed and done righteous deeds.',
    surahTr: 'Asr Suresi',
    surahEn: 'Surah Al-Asr',
    ref: '103:1-3',
  },
  {
    id: 6,
    arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    transliteration: 'Iyyāka na\'budu wa iyyāka nasta\'īn',
    turkish: 'Yalnız Sana ibadet ederiz ve yalnız Senden yardım dileriz.',
    english: 'It is You we worship and You we ask for help.',
    surahTr: 'Fatiha Suresi',
    surahEn: 'Surah Al-Fatiha',
    ref: '1:5',
  },
  {
    id: 7,
    arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
    transliteration: 'Fadhkurūnī adhkurkum wash-kurū lī wa lā takfurūn',
    turkish: 'Siz beni zikredin, ben de sizi zikredeyim. Bana şükredin, nankörlük etmeyin.',
    english: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.',
    surahTr: 'Bakara Suresi',
    surahEn: 'Surah Al-Baqarah',
    ref: '2:152',
  },
  {
    id: 8,
    arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    transliteration: 'Fa-inna ma\'al-\'usri yusrā. Inna ma\'al-\'usri yusrā.',
    turkish: 'Gerçekten güçlükle birlikte kolaylık vardır. Evet, gerçekten güçlükle birlikte kolaylık vardır.',
    english: 'For indeed, with hardship will be ease. Indeed, with hardship will be ease.',
    surahTr: 'İnşirah Suresi',
    surahEn: 'Surah Al-Inshirah',
    ref: '94:5-6',
  },
  {
    id: 9,
    arabic: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
    transliteration: 'Wa man yatawakkal \'alallāhi fa-huwa ḥasbuh',
    turkish: 'Kim Allah\'a tevekkül ederse O ona yeter.',
    english: 'And whoever relies upon Allah — then He is sufficient for him.',
    surahTr: 'Talak Suresi',
    surahEn: 'Surah At-Talaq',
    ref: '65:3',
  },
];

export const dailyDuas: DailyDua[] = [
  {
    id: 0,
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
    transliteration: 'Bismillāhir-raḥmānir-raḥīm',
    turkish: 'Rahman ve Rahim olan Allah\'ın adıyla.',
    english: 'In the name of Allah, the Most Gracious, the Most Merciful.',
    occasionTr: 'Her işe başlarken',
    occasionEn: 'Before starting anything',
  },
  {
    id: 1,
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى',
    transliteration: 'Allāhumma innī as\'alukal-hudā wat-tuqā wal-\'afāfa wal-ghinā',
    turkish: 'Allah\'ım! Senden hidayet, takva, iffet ve gönül zenginliği istiyorum.',
    english: 'O Allah! I ask You for guidance, piety, chastity, and self-sufficiency.',
    occasionTr: 'Sabah duası',
    occasionEn: 'Morning prayer',
  },
  {
    id: 2,
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: 'Rabbanā ātinā fid-dunyā ḥasanatan wa fil-ākhirati ḥasanatan wa qinā \'adhāban-nār',
    turkish: 'Rabbimiz! Bize dünyada da iyilik ver, ahirette de iyilik ver ve bizi ateşin azabından koru.',
    english: 'Our Lord! Grant us good in this world and good in the Hereafter, and save us from the torment of the Fire.',
    occasionTr: 'Genel dua',
    occasionEn: 'General supplication',
  },
  {
    id: 3,
    arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
    transliteration: 'Allāhumma a\'innī \'alā dhikrika wa shukrika wa ḥusni \'ibādatik',
    turkish: 'Allah\'ım! Seni zikretmem, Sana şükretmem ve Sana güzelce ibadet etmem için bana yardım et.',
    english: 'O Allah! Help me to remember You, to be grateful to You, and to worship You in the best manner.',
    occasionTr: 'Namaz sonrası',
    occasionEn: 'After prayer',
  },
  {
    id: 4,
    arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
    transliteration: 'Allāhumma innaka \'afuwwun tuḥibbul-\'afwa fa\'fu \'annī',
    turkish: 'Allah\'ım! Sen affedicisin, affı seversin, beni de affet.',
    english: 'O Allah! You are forgiving, You love forgiveness, so forgive me.',
    occasionTr: 'Kadir gecesi ve her zaman',
    occasionEn: 'Laylatul Qadr and always',
  },
  {
    id: 5,
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
    transliteration: 'Rabbish-raḥ lī ṣadrī wa yassir lī amrī',
    turkish: 'Rabbim! Göğsümü genişlet ve işimi kolaylaştır.',
    english: 'My Lord! Expand my chest and ease my task for me.',
    occasionTr: 'Zorluk anında',
    occasionEn: 'In times of difficulty',
  },
  {
    id: 6,
    arabic: 'اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَاهْدِنِي وَعَافِنِي وَارْزُقْنِي',
    transliteration: 'Allāhummagh-fir lī war-ḥamnī wahdini wa \'āfinī warzuqnī',
    turkish: 'Allah\'ım! Beni bağışla, bana merhamet et, bana hidayet ver, beni afiyet içinde kıl ve beni rızıklandır.',
    english: 'O Allah! Forgive me, have mercy on me, guide me, give me health and grant me provision.',
    occasionTr: 'Günlük dua',
    occasionEn: 'Daily prayer',
  },
  {
    id: 7,
    arabic: 'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ',
    transliteration: 'Ḥasbiyallāhu lā ilāha illā huwa \'alayhi tawakkaltu',
    turkish: 'Allah bana yeter. O\'ndan başka ilah yoktur. Yalnız O\'na güvendim.',
    english: 'Allah is sufficient for me. There is no god but Him. In Him I place my trust.',
    occasionTr: 'Sıkıntı ve kaygı anında',
    occasionEn: 'In times of worry and anxiety',
  },
  {
    id: 8,
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ',
    transliteration: 'Subḥānallāhi wa biḥamdihī, subḥānallāhil-\'aẓīm',
    turkish: 'Allah\'ı tüm eksikliklerden tenzih eder ve O\'na hamdederim. Yüce Allah\'ı tesbih ederim.',
    english: 'Glory be to Allah and praise be to Him. Glory be to Allah, the Magnificent.',
    occasionTr: 'Çok sevaplı bir zikir',
    occasionEn: 'A highly rewarded dhikr',
  },
  {
    id: 9,
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'Lā ḥawla wa lā quwwata illā billāh',
    turkish: 'Güç ve kuvvet yalnızca Allah\'tandır.',
    english: 'There is no might nor power except with Allah.',
    occasionTr: 'Her zaman ve zorlukta',
    occasionEn: 'Always and in hardship',
  },
];
