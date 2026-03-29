export interface WuduStep {
  step: number;
  titleTr: string;
  titleEn: string;
  descTr: string;
  descEn: string;
  icon: string;
}

export interface PrayerStep {
  step: number;
  nameTr: string;
  nameEn: string;
  descTr: string;
  descEn: string;
  reciteTr: string;
  reciteEn: string;
  icon: string;
}

export const wuduSteps: WuduStep[] = [
  {
    step: 1,
    titleTr: 'Niyet',
    titleEn: 'Intention',
    descTr: 'Kalbinizde abdest almaya niyet edin. "Abdest almaya niyet ettim" diyebilirsiniz. Niyet kalple yapılır, dille söylemek sünnet.',
    descEn: 'Make the intention to perform wudu in your heart. You can say "I intend to make wudu." Intention is made with the heart; saying it aloud is Sunnah.',
    icon: 'heart',
  },
  {
    step: 2,
    titleTr: 'Bismillah',
    titleEn: 'Bismillah',
    descTr: '"Bismillahirrahmanirrahim" deyin. Rahman ve Rahim olan Allah\'ın adıyla başlıyoruz. Bu, her hayırlı işin başlangıcıdır.',
    descEn: 'Say "Bismillahirrahmanirrahim." We begin in the name of Allah, the Most Gracious, the Most Merciful. This is the beginning of every good action.',
    icon: 'star',
  },
  {
    step: 3,
    titleTr: 'Elleri Yıkama',
    titleEn: 'Washing Hands',
    descTr: 'Her iki eli bileklere kadar 3 kez yıkayın. Parmaklarınızın aralarına da su geçirmeyi unutmayın.',
    descEn: 'Wash both hands up to the wrists 3 times. Make sure water passes between your fingers as well.',
    icon: 'hand-right',
  },
  {
    step: 4,
    titleTr: 'Ağzı Yıkama',
    titleEn: 'Rinsing Mouth',
    descTr: 'Ağzınıza 3 kez su alıp çalkalayın (Mazmaza). Ağzınızın tüm kısımlarına su ulaşsın.',
    descEn: 'Take water into your mouth and swirl it 3 times (Madmada). Make sure water reaches all parts of your mouth.',
    icon: 'water',
  },
  {
    step: 5,
    titleTr: 'Burnu Temizleme',
    titleEn: 'Cleaning Nose',
    descTr: '3 kez burnunuza su çekip temizleyin (İstinşak). Sağ elle suyu çekin, sol elle temizleyin.',
    descEn: 'Sniff water into your nose 3 times and clean it out (Istinshaq). Sniff with right hand, clean with left hand.',
    icon: 'medical',
  },
  {
    step: 6,
    titleTr: 'Yüzü Yıkama',
    titleEn: 'Washing Face',
    descTr: 'Yüzünüzü alından çeneye, kulaktan kulağa 3 kez yıkayın. Sakalınız varsa parmaklarınızı içinden geçirin.',
    descEn: 'Wash your face 3 times, from forehead to chin and from ear to ear. If you have a beard, pass your fingers through it.',
    icon: 'person',
  },
  {
    step: 7,
    titleTr: 'Kolları Yıkama',
    titleEn: 'Washing Arms',
    descTr: 'Önce sağ kolu parmak uçlarından dirseğe kadar 3 kez yıkayın. Sonra sol kolu aynı şekilde 3 kez yıkayın. Dirsekler dahil.',
    descEn: 'First wash the right arm from fingertips to elbow 3 times. Then wash the left arm the same way 3 times. Elbows are included.',
    icon: 'fitness',
  },
  {
    step: 8,
    titleTr: 'Başı Meshetmek',
    titleEn: 'Wiping Head',
    descTr: 'Islak ellerle başınızın tamamını öne-arkaya ve arkaya-öne 1 kez meshedin (silin). Her iki elin parmakları birlikte.',
    descEn: 'With wet hands, wipe your entire head from front to back and back to front 1 time. Use the fingers of both hands together.',
    icon: 'body',
  },
  {
    step: 9,
    titleTr: 'Kulakları Meshetmek',
    titleEn: 'Wiping Ears',
    descTr: 'Işlak baş parmak ve işaret parmaklarıyla kulakların içini ve dışını 1 kez meshedin.',
    descEn: 'With wet thumbs and index fingers, wipe the inside and outside of the ears 1 time.',
    icon: 'ear',
  },
  {
    step: 10,
    titleTr: 'Ayakları Yıkama',
    titleEn: 'Washing Feet',
    descTr: 'Önce sağ ayağı parmak aralarından topuğa kadar 3 kez yıkayın. Sonra sol ayağı 3 kez. Topuklar dahil. Abdestiniz tamamdır!',
    descEn: 'First wash the right foot from between the toes to the heel 3 times. Then the left foot 3 times. Heels included. Your wudu is complete!',
    icon: 'walk',
  },
];

export const prayerSteps: PrayerStep[] = [
  {
    step: 1,
    nameTr: 'Niyet ve İftitah Tekbiri',
    nameEn: 'Intention & Opening Takbeer',
    descTr: 'Kıbleye dönün, kılacağınız namaza niyet edin. Elleri kulak hizasına kaldırarak "Allahu Ekber" deyin.',
    descEn: 'Face the Qibla and make intention for the prayer. Raise hands to ear level and say "Allahu Akbar."',
    reciteTr: 'Allahu Ekber (نِيَّت ve tekbir)',
    reciteEn: 'Allahu Akbar (Intention and takbeer)',
    icon: 'arrow-up',
  },
  {
    step: 2,
    nameTr: 'Kıyam — Ayakta Duruş',
    nameEn: 'Qiyam — Standing',
    descTr: 'Sağ eli sol el üstüne koyarak göğüste tutun. Sübhaneke, Fatiha, ardından kısa bir sure okuyun.',
    descEn: 'Place right hand over left on chest. Recite Subhanaka, Al-Fatiha, then a short surah.',
    reciteTr: 'Sübhaneke → Fatiha → Kısa Sure',
    reciteEn: 'Subhanaka → Al-Fatiha → Short Surah',
    icon: 'person',
  },
  {
    step: 3,
    nameTr: 'Rükû — Öne Eğilme',
    nameEn: 'Ruku — Bowing',
    descTr: '"Allahu Ekber" deyip eğilin. Sırtınız düz, elleriniz dizlerinizde. En az 3 kez tesbih okuyun.',
    descEn: 'Say "Allahu Akbar" and bow. Back straight, hands on knees. Recite the tasbih at least 3 times.',
    reciteTr: 'Sübhâne Rabbiyel Azîm (3 kez)',
    reciteEn: 'Subhana Rabbiyal Azeem (3 times)',
    icon: 'chevron-down',
  },
  {
    step: 4,
    nameTr: 'İtidal — Doğrulma',
    nameEn: 'I\'tidal — Rising',
    descTr: '"Semiallahu limen hamideh" diyerek doğrulun. Ardından "Rabbena ve lekel hamd" deyin.',
    descEn: 'Rise saying "Sami\'allahu liman hamidah." Then say "Rabbana wa lakal hamd."',
    reciteTr: 'Semiallahu limen hamideh → Rabbena ve lekel hamd',
    reciteEn: 'Sami\'allahu liman hamidah → Rabbana wa lakal hamd',
    icon: 'remove',
  },
  {
    step: 5,
    nameTr: 'Secde — Yere Kapanma (1)',
    nameEn: 'Sujood — Prostration (1)',
    descTr: '"Allahu Ekber" deyip yere kapanın. Alın, burun, iki el, iki diz, iki ayak ucu — 7 uzuv yerde. En az 3 kez tesbih.',
    descEn: 'Say "Allahu Akbar" and prostrate. Forehead, nose, both hands, both knees, and toes — 7 points on ground. Recite tasbih at least 3 times.',
    reciteTr: 'Sübhâne Rabbiyel A\'lâ (3 kez)',
    reciteEn: 'Subhana Rabbiyal A\'la (3 times)',
    icon: 'chevron-down',
  },
  {
    step: 6,
    nameTr: 'Celse — Oturma',
    nameEn: 'Jalsa — Sitting',
    descTr: '"Allahu Ekber" deyip kısa oturun. İki secde arasındaki oturma.',
    descEn: 'Say "Allahu Akbar" and sit briefly. This is the sitting between the two prostrations.',
    reciteTr: 'Allahu Ekber (kısa duraklama)',
    reciteEn: 'Allahu Akbar (brief pause)',
    icon: 'menu',
  },
  {
    step: 7,
    nameTr: 'Secde — Yere Kapanma (2)',
    nameEn: 'Sujood — Prostration (2)',
    descTr: 'İkinci kez "Allahu Ekber" deyip yere kapanın. Tekrar 3 kez tesbih okuyun.',
    descEn: 'Say "Allahu Akbar" again and prostrate a second time. Recite the tasbih 3 times again.',
    reciteTr: 'Sübhâne Rabbiyel A\'lâ (3 kez)',
    reciteEn: 'Subhana Rabbiyal A\'la (3 times)',
    icon: 'chevron-down',
  },
  {
    step: 8,
    nameTr: 'Teşehhüd — Son Oturuş',
    nameEn: 'Tashahhud — Final Sitting',
    descTr: 'İkinci rekatin sonunda oturun. Et-Tahiyyat ve Salavat okuyun. Şehadet parmağınızı kaldırın.',
    descEn: 'At the end of the second rakat, sit. Recite At-Tahiyyat and Salawat. Raise your index finger.',
    reciteTr: 'Et-Tahiyyat → Allahümme salli → Allahümme barik',
    reciteEn: 'At-Tahiyyat → Allahumma salli → Allahumma barik',
    icon: 'hand-right',
  },
  {
    step: 9,
    nameTr: 'Selam',
    nameEn: 'Salam',
    descTr: 'Başınızı önce sağa "Esselamü aleyküm ve rahmetullah" sonra sola "Esselamü aleyküm ve rahmetullah" diyerek çevirin.',
    descEn: 'Turn your head to the right saying "Assalamu alaykum wa rahmatullah" then to the left saying the same.',
    reciteTr: 'Esselamü aleyküm ve rahmetullah (sağa ve sola)',
    reciteEn: 'Assalamu alaykum wa rahmatullah (right then left)',
    icon: 'checkmark-circle',
  },
];
