export interface FAQ {
  id: string;
  questionTr: string;
  questionEn: string;
  answerTr: string;
  answerEn: string;
}

export const faqs: FAQ[] = [
  {
    id: '1',
    questionTr: 'Müslüman olmak için ne yapmalıyım?',
    questionEn: 'What do I need to do to become Muslim?',
    answerTr: 'Kalbinizde "Allah\'tan başka ilah yoktur ve Hz. Muhammed O\'nun elçisidir" inancını taşıyorsanız, zaten Müslümansınız. Kelime-i Şehadet getirmek güzel ama zorunlu değil. Şahit olması da tavsiye edilir ancak şart değildir.',
    answerEn: 'If you hold in your heart the belief that "there is no god but Allah and Muhammad is His messenger," you are already Muslim. Saying the Shahada is beautiful but not strictly required. Having a witness is recommended but not obligatory.',
  },
  {
    id: '2',
    questionTr: 'Namazlarımı Türkçe veya İngilizce kılabilir miyim?',
    questionEn: 'Can I pray in Turkish or English?',
    answerTr: 'Başlangıçta evet, niyet önemlidir. Farzlar (Fatiha ve tesbihatlar) zamanla Arapça öğrenilmeli. Ama Allah niyetinizi bilir ve öğrenme sürecinizi değerlendirir. Secdede kendi dilinizde dua etmek her zaman caizdir.',
    answerEn: 'In the beginning, yes — intention is what matters. The obligatory parts (Al-Fatiha and tasbihat) should be learned in Arabic over time. But Allah knows your intention and values your learning process. Making du\'a in sujood in your own language is always permissible.',
  },
  {
    id: '3',
    questionTr: 'Ailem Müslüman değil, ne yapmalıyım?',
    questionEn: 'My family isn\'t Muslim — what should I do?',
    answerTr: 'İslam, gayrimüslim ebeveynlere de saygı ve sevgiyle davranmayı emreder. Onları zorlamayın. Yaşayarak örnek olun. Allah\'ın emri açık: "Onlara öf bile deme." Sabır ve sevgiyle yaklaşın — zamanla değişim kendiliğinden gelir.',
    answerEn: 'Islam commands treating non-Muslim parents with respect and love as well. Do not force them. Lead by example. Allah\'s command is clear: "Do not even say \'ugh\' to them." Approach with patience and love — change comes naturally over time.',
  },
  {
    id: '4',
    questionTr: 'Geçmişte yaptığım günahlar ne olacak?',
    questionEn: 'What about the sins I committed in the past?',
    answerTr: 'Hz. Peygamber (s.a.v.) şöyle buyurmuştur: "İslam, öncesindeki her şeyi siler." Müslüman olduğunuzda tüm geçmiş günahlarınız silinir. Tertemiz bir sayfa açılır. Bu, Allah\'ın size olan büyük lütfudur. Geçmişi düşünmeyi bırakın, şimdiye odaklanın.',
    answerEn: 'The Prophet (pbuh) said: "Islam erases what came before it." When you become Muslim, all your past sins are erased. A completely clean slate opens. This is Allah\'s great grace toward you. Stop dwelling on the past and focus on the present.',
  },
  {
    id: '5',
    questionTr: 'Haram bir şeyi yanlışlıkla yersem ne olur?',
    questionEn: 'What if I accidentally eat something haram?',
    answerTr: 'Bilmeden yapılan hata günah değildir. Allah şöyle buyurmuştur: "Allah size dinde güçlük çıkarmak istemez." Öğrendikten sonra o şeyden uzak durmanız yeterlidir. Allah affedicidir ve merhamet sahibidir.',
    answerEn: 'A mistake made unknowingly is not a sin. Allah said: "Allah does not want to impose difficulty on you in the religion." After learning, simply avoiding that thing is sufficient. Allah is forgiving and merciful.',
  },
  {
    id: '6',
    questionTr: 'Sünnet olmak şart mı?',
    questionEn: 'Is circumcision mandatory?',
    answerTr: 'Erkekler için sünnet sünnettir (tavsiye edilir) ancak farz (zorunlu) değildir. Alimler arasında tartışmalıdır. Yetişkin biri için sağlık durumu da gözetilmeli. Acele etmeyin, danışın.',
    answerEn: 'For men, circumcision is Sunnah (recommended) but not fard (obligatory). There is scholarly discussion on this. For an adult, health conditions should also be considered. Don\'t rush — consult a scholar.',
  },
  {
    id: '7',
    questionTr: 'Hangi mezhep seçmeliyim?',
    questionEn: 'Which Islamic school should I follow?',
    answerTr: 'Başlangıçta mezhep düşünmeyin. Temelleri öğrenin: namaz, oruç, zekat, Kur\'an. Zamanla kendinizi bir toplulukta bulacaksınız. Dört büyük mezhep (Hanefi, Maliki, Şafii, Hanbeli) hepsinin temel meselelerde görüşleri birbirine yakındır.',
    answerEn: 'In the beginning, don\'t think about madhabs (schools). Learn the fundamentals: prayer, fasting, zakat, Quran. Over time you will find yourself in a community. The four major schools (Hanafi, Maliki, Shafi\'i, Hanbali) are largely aligned on fundamental matters.',
  },
  {
    id: '8',
    questionTr: 'İslam\'da müzik dinlemek caiz mi?',
    questionEn: 'Is listening to music permissible in Islam?',
    answerTr: 'Bu, alimler arasında tartışmalı bir konudur. Genel olarak kabul edilen: müstehcen, içki/uyuşturucu içerikli veya harama teşvik eden müzik yasaktır. Enstrümantal veya makul sözlü müziğin hükmü ihtilaflıdır. Başlangıçta bu konuyu bir alime sorun.',
    answerEn: 'This is a debated topic among scholars. Generally accepted: obscene music or that promoting haram is forbidden. The ruling on instrumental or reasonably-worded music is disputed. In the beginning, ask a scholar about this.',
  },
  {
    id: '9',
    questionTr: 'Namaz kılarken ne giysem?',
    questionEn: 'What should I wear when praying?',
    answerTr: 'Erkekler için avret (örtülmesi gereken yer) göbek ile diz arası. Kadınlar için yüz ve eller dışındaki tüm vücut örtülmeli. Giysiler temiz ve namaza uygun (bol, örtücü) olmalı. Özel bir kıyafet gerekmez.',
    answerEn: 'For men, the awrah (area to be covered) is between navel and knees. For women, the entire body except face and hands must be covered. Clothes should be clean and appropriate for prayer (loose, covering). No special clothing is required.',
  },
  {
    id: '10',
    questionTr: 'Cuma namazına katılmak neden önemli?',
    questionEn: 'Why is Friday prayer important to attend?',
    answerTr: 'Cuma namazı, erkekler için farzdır ve öğle namazının yerine geçer. Hz. Peygamber (s.a.v.) şöyle buyurmuştur: "Üç kez özürsüz Cuma namazını bırakan kişinin kalbi mühürlenir." Cuma aynı zamanda Müslüman topluluğuyla bir araya gelme, hutbe dinleme ve manevi şarj olma günüdür.',
    answerEn: 'Friday prayer is obligatory for men and takes the place of the midday prayer. The Prophet (pbuh) said: "The heart of the one who misses three Fridays without excuse is sealed." Friday is also a day to gather with the Muslim community, listen to the sermon, and spiritually recharge.',
  },
  {
    id: '11',
    questionTr: 'Evcil hayvanım varsa temizlik nasıl olur?',
    questionEn: 'If I have a pet, how does cleanliness work?',
    answerTr: 'Köpek salyanı ve idrarı necistir — bunun değdiği yerleri yıkamak gerekir. Kedi ise "yüksek" statüde görülür ve evde bulunabilir. Genel kural: namaz kılacağınız yerin ve kıyafetin temiz olması gerekir. Köpekle yaşamak yasak değildir ama sınırlamalar vardır.',
    answerEn: 'Dog saliva and urine are considered impure — areas they touch must be washed. Cats are considered "elevated" and can be in the home. General rule: the place you pray and your clothing must be clean. Living with a dog is not forbidden, but there are some restrictions.',
  },
  {
    id: '12',
    questionTr: 'Daha fazla nerede öğrenebilirim?',
    questionEn: 'Where can I learn more?',
    answerTr: 'Güvenilir kaynaklar: islamqa.info, sunnah.com (hadisler), quran.com. Yerel caminizdeki imam veya hoca size yardımcı olabilir. "Yeni Müslüman" veya "Revert Muslim" grupları online olarak bulunabilir. Kitap: Martin Lings - Hz. Muhammed (Siyeri).',
    answerEn: 'Reliable sources: islamqa.info, sunnah.com (hadith), quran.com. The imam or teacher at your local mosque can help you. "New Muslim" or "Revert Muslim" groups can be found online. Book: Martin Lings - Muhammad (His Life Based on the Earliest Sources).',
  },
];
