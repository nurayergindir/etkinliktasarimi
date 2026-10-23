import { EducationalQuote, ResourceItem, EducationalGame } from '../types';

export const INITIAL_RESOURCES: ResourceItem[] = [
  // DERS PLANLARIM (Includes User's Provided Google Drive Link!)
  {
    id: 'plan-drive-1',
    category: 'plans',
    title: 'Yıllık Planlarım (Google Drive)',
    description: 'Tüm sınıf düzeyleri için yıllık çalışma ve ders planları arşivi. Doğrudan Google Drive üzerinden erişilebilir.',
    url: 'https://drive.google.com/drive/folders/1WyKNTHTRKQH4tGeYHbg_-WgG4qbm8Alo?usp=drive_link',
    dateAdded: '2024-09-10',
    tags: ['Yıllık Plan', 'Google Drive', '2024-2025', 'Müfredat'],
    isPinned: true,
    isDriveFolder: true,
    type: 'drive'
  },
  {
    id: 'plan-meb-2',
    category: 'plans',
    title: 'MEB 2024-2025 Çalışma Takvimi',
    description: 'Milli Eğitim Bakanlığı resmi iş takvimi, ara tatiller ve resmi tatil günleri.',
    url: 'https://ogmmateryal.eba.gov.tr',
    dateAdded: '2024-09-01',
    tags: ['MEB', 'Takvim', 'Dönem Planı'],
    isPinned: false,
    type: 'link'
  },
  {
    id: 'plan-template-3',
    category: 'plans',
    title: 'Günlük Ders Akış & Kazanım Şablonu',
    description: 'Etkinlik temelli öğrenme modellerine uygun hazırlanmış günlük ders planı formu.',
    url: 'https://orgm.meb.gov.tr',
    dateAdded: '2024-09-15',
    tags: ['Günlük Plan', 'Kazanım', 'Şablon'],
    isPinned: false,
    type: 'document'
  },
  {
    id: 'plan-bep-4',
    category: 'plans',
    title: 'Bireyselleştirilmiş Eğitim Planı (BEP) Çerçevesi',
    description: 'Kaynaştırma ve özel gereksinimli öğrenciler için BEP hazırlama rehberi ve kılavuzları.',
    url: 'https://orgm.meb.gov.tr/meb_iys_dosyalar/2020_06/03154817_BEP_Rehberi.pdf',
    dateAdded: '2024-09-20',
    tags: ['BEP', 'Özel Eğitim', 'Rehber'],
    isPinned: false,
    type: 'pdf'
  },

  // SINAVLARIM
  {
    id: 'exam-1',
    category: 'exams',
    title: '1. Dönem Ortak Yazılı Sınav Soruları & Cevap Anahtarları',
    description: 'MEB yeni ölçme değerlendirme yönetmeliğine uygun açık uçlu ortak sınav örnekleri ve dereceli puanlama anahtarı (rubrik).',
    url: 'https://odsgm.meb.gov.tr',
    dateAdded: '2024-10-15',
    tags: ['Ortak Sınav', 'Açık Uçlu', 'Rubrik'],
    isPinned: true,
    type: 'document'
  },
  {
    id: 'exam-2',
    category: 'exams',
    title: 'Kazanım Değerlendirme & Test Havuzu',
    description: 'Ünite sonu tarama testleri, çoktan seçmeli sorular ve anlık yoklama soruları.',
    url: 'https://odsgm.meb.gov.tr/kurslar/',
    dateAdded: '2024-10-05',
    tags: ['Soru Havuzu', 'Kazanım', 'Test'],
    isPinned: false,
    type: 'link'
  },
  {
    id: 'exam-3',
    category: 'exams',
    title: 'Sınav Analiz & Başarı Çizelgesi Şablonu',
    description: 'Kazanım bazlı sınıf başarı grafiği, madde güçlüğü ve soru ayırt ediciliği analiz tablosu.',
    url: 'https://docs.google.com/spreadsheets',
    dateAdded: '2024-09-28',
    tags: ['Sınav Analizi', 'Excel', 'İstatistik'],
    isPinned: false,
    type: 'drive'
  },

  // DERS KAYNAKLARIM
  {
    id: 'res-1',
    category: 'resources',
    title: 'EBA (Eğitim Bilişim Ağı) Öğretmen Modülü',
    description: 'Ders kitapları, sesli içerikler, animasyonlar ve interaktif akıllı tahta uygulamaları.',
    url: 'https://www.eba.gov.tr',
    dateAdded: '2024-09-01',
    tags: ['EBA', 'Akıllı Tahta', 'Ders Kitabı'],
    isPinned: true,
    type: 'link'
  },
  {
    id: 'res-2',
    category: 'resources',
    title: 'OGM Materyal - İnteraktif Kitaplar & 3D Modeller',
    description: 'Ortaöğretim ve temel eğitim için 3 boyutlu deneyler, etkileşimli deney tahtaları.',
    url: 'https://ogmmateryal.eba.gov.tr',
    dateAdded: '2024-09-05',
    tags: ['3D Model', 'Simülasyon', 'Materyal'],
    isPinned: false,
    type: 'link'
  },
  {
    id: 'res-3',
    category: 'resources',
    title: 'Canva Eğitim Şablonları & Sunumlar',
    description: 'Görsel ders materyalleri, çalışma yaprakları, infografikler ve zihin haritaları hazırlama alanı.',
    url: 'https://www.canva.com/education/',
    dateAdded: '2024-09-12',
    tags: ['Görsel', 'Sunum', 'Tasarım'],
    isPinned: false,
    type: 'app'
  },

  // ÖĞRETMEN DOSYALARIM
  {
    id: 'doc-1',
    category: 'documents',
    title: 'Zümre Öğretmenler Kurulu Tutanakları',
    description: 'Sene başı, dönem arası ve yıl sonu zümre kararları, gündem maddeleri ve imza sirküleri.',
    url: 'https://drive.google.com',
    dateAdded: '2024-09-03',
    tags: ['Zümre', 'Resmi Evrak', 'Toplantı'],
    isPinned: true,
    type: 'document'
  },
  {
    id: 'doc-2',
    category: 'documents',
    title: 'Sınıf Rehberlik & Kulüp Dosyası',
    description: 'Öğrenci tanıma fişleri, kulüp tüzüğü, yıllık sosyal etkinlik planı ve veli görüşme formları.',
    url: 'https://orgm.meb.gov.tr',
    dateAdded: '2024-09-18',
    tags: ['Rehberlik', 'Kulüp', 'Veli Formu'],
    isPinned: false,
    type: 'document'
  },
  {
    id: 'doc-3',
    category: 'documents',
    title: 'Haftalık Ders Dağıtım & Nöbet Çizelgesi',
    description: 'Öğretmen ders programı, nöbet yerleri ve ders saatleri dağılım tablosu.',
    url: 'https://mebbis.meb.gov.tr',
    dateAdded: '2024-09-08',
    tags: ['Nöbet', 'Program', 'MEBBİS'],
    isPinned: false,
    type: 'document'
  },

  // OYUNLARIM
  {
    id: 'game-ref-1',
    category: 'games',
    title: 'Sınıf İçi Eğitsel Kutu Oyunları Listesi',
    description: 'Derste kullanılabilecek dikkat geliştirici, hafıza ve iş birliği oyunlarının kural ve materyal rehberi.',
    url: 'https://egitimdeiyiornekler.org',
    dateAdded: '2024-09-22',
    tags: ['Kutu Oyunu', 'Sınıf İçi', 'İş Birliği'],
    isPinned: true,
    type: 'document'
  },
  {
    id: 'game-ref-2',
    category: 'games',
    title: 'Wordwall Sınıf Testleri & Oyun Çarkları',
    description: 'Hızlı kelime bulmaca, eşleştirme kartları ve tekerlek oyunları koleksiyonu.',
    url: 'https://wordwall.net/tr',
    dateAdded: '2024-09-25',
    tags: ['Wordwall', 'İnteraktif', 'Çark'],
    isPinned: false,
    type: 'link'
  }
];

export const EDUCATIONAL_QUOTES: EducationalQuote[] = [
  {
    id: 'q1',
    quote: 'Öğretmenler! Yeni nesil sizin eseriniz olacaktır.',
    author: 'Mustafa Kemal Atatürk',
    title: 'Türkiye Cumhuriyeti’nin Kurucusu ve Başöğretmen',
    era: '1881 - 1938',
    tags: ['Öğretmenlik', 'Gelecek', 'Cumhuriyet'],
    category: 'öğretmenlik'
  },
  {
    id: 'q2',
    quote: 'Eğitimdir ki bir milleti ya hür, bağımsız, şanlı, yüksek bir topluluk halinde yaşatır; ya da milleti esaret ve sefalete terk eder.',
    author: 'Mustafa Kemal Atatürk',
    title: 'Başöğretmen',
    era: '1881 - 1938',
    tags: ['Eğitim', 'Bağımsızlık', 'Vizyon'],
    category: 'vizyon'
  },
  {
    id: 'q3',
    quote: 'Çocuğun eline dokunduğunuzda, onun zihnine dokunursunuz.',
    author: 'Maria Montessori',
    title: 'Eğitim Bilimci ve Hekim',
    era: '1870 - 1952',
    tags: ['Çocuk Gelişimi', 'Montessori', 'Keşif'],
    category: 'öğrenme'
  },
  {
    id: 'q4',
    quote: 'Eğitim hayata hazırlık değil, hayatın ta kendisidir.',
    author: 'John Dewey',
    title: 'Filozof ve Eğitim Reformcusu',
    era: '1859 - 1952',
    tags: ['Deneyim', 'Yaşam', 'İlerlemecilik'],
    category: 'öğrenme'
  },
  {
    id: 'q5',
    quote: 'Çalışmak için müsait gün ve saat bekleme. Bil ki her gün ve her saat çalışmanın en müsait vaktidir.',
    author: 'Ord. Prof. Dr. Ali Fuad Başgil',
    title: 'Hukukçu ve Düşünür (Gençlerle Başbaşa)',
    era: '1893 - 1967',
    tags: ['Disiplin', 'Çaba', 'Azim'],
    category: 'çaba'
  },
  {
    id: 'q6',
    quote: 'Dünle beraber gitti cancağzım ne kadar söz varsa düne ait; şimdi yeni şeyler söylemek lazım.',
    author: 'Mevlana Celaleddin-i Rumi',
    title: 'Düşünür, Şair ve Mutasavvıf',
    era: '1207 - 1273',
    tags: ['Yenilik', 'Gelişim', 'İlham'],
    category: 'vizyon'
  },
  {
    id: 'q7',
    quote: 'Eğitim, kıvılcımla ateş yakmaktır; içi boş bir kabı doldurmak değil.',
    author: 'Sokrates',
    title: 'Antik Yunan Filozofu',
    era: 'M.Ö. 470 - 399',
    tags: ['Merak', 'Sorgulama', 'Kıvılcım'],
    category: 'öğrenme'
  },
  {
    id: 'q8',
    quote: 'Çoğu insan zekaya inanır, ben inanmıyorum. Bizi birbirimizden ayıran emektir; ben sadece çalışmaya inanıyorum.',
    author: 'Prof. Dr. Aziz Sancar',
    title: 'Nobel Kimya Ödüllü Türk Bilim İnsanı',
    era: '1946 - Günümüz',
    tags: ['Emek', 'Bilim', 'Çalışkanlık'],
    category: 'çaba'
  },
  {
    id: 'q9',
    quote: 'Eğitimin temel amacı; başkalarının yaptıklarını tekrarlamayan, yeni şeyler yapabilen yaratıcı insanlar yetiştirmektir.',
    author: 'Jean Piaget',
    title: 'İsviçreli Psikolog ve Gelişim Kuramcısı',
    era: '1896 - 1980',
    tags: ['Yaratıcılık', 'Bilişsel Gelişim', 'Özgünlük'],
    category: 'vizyon'
  },
  {
    id: 'q10',
    quote: 'Eğitim, okulda öğrenilen her şey unutulduktan sonra geriye kalandır.',
    author: 'Albert Einstein',
    title: 'Teorik Fizikçi, Nobel Fizik Ödülü Sahibi',
    era: '1879 - 1955',
    tags: ['Kalıcı Öğrenme', 'Düşünme Becerisi'],
    category: 'öğrenme'
  },
  {
    id: 'q11',
    quote: 'Duyarsam unuturum, görürsem hatırlarım, yaparsam anlarım.',
    author: 'Konfüçyüs',
    title: 'Antik Çin Filozofu',
    era: 'M.Ö. 551 - 479',
    tags: ['Uygulamalı Eğitim', 'Deneyimsel Öğrenme'],
    category: 'öğrenme'
  },
  {
    id: 'q12',
    quote: 'Öğrenme isteği uyandırmadan öğretmeye kalkan, soğuk demiri dövmeye çalışır.',
    author: 'Horace Mann',
    title: 'Modern Eğitimin Öncüsü',
    era: '1796 - 1859',
    tags: ['Motivasyon', 'İlgi', 'Rehberlik'],
    category: 'rehberlik'
  },
  {
    id: 'q13',
    quote: 'Bir mum diğer mumu tutuşturmakla ışığından hiçbir şey kaybetmez.',
    author: 'Mevlana Celaleddin-i Rumi',
    title: 'Felsefeci ve Düşünür',
    era: '1207 - 1273',
    tags: ['Paylaşım', 'Bilgi', 'Öğretmen Ruhu'],
    category: 'öğretmenlik'
  },
  {
    id: 'q14',
    quote: 'Eğitim, dünyayı değiştirmek için kullanabileceğiniz en güçlü silahtır.',
    author: 'Nelson Mandela',
    title: 'Lider ve Barış Elçisi',
    era: '1918 - 2013',
    tags: ['Toplumsal Değişim', 'Gelecek', 'Güç'],
    category: 'vizyon'
  },
  {
    id: 'q15',
    quote: 'Geleceğin güvencesi sağlam temellere dayalı bir eğitime, eğitim ise öğretmene dayalıdır.',
    author: 'Mustafa Kemal Atatürk',
    title: 'Cumhuriyetimizin Kurucusu',
    era: '1881 - 1938',
    tags: ['Gelecek', 'Öğretmen', 'Güven'],
    category: 'öğretmenlik'
  },
  {
    id: 'q16',
    quote: 'Çocuğun bugün bir yetişkin rehberliğinde yapabildiğini, yarın kendi başına yapacaktır.',
    author: 'Lev Vygotsky',
    title: 'Gelişim Psikoloğu (Yakınsak Gelişim Alanı)',
    era: '1896 - 1934',
    tags: ['İskele Kurma', 'Rehberlik', 'Potansiyel'],
    category: 'rehberlik'
  },
  {
    id: 'q17',
    quote: 'Aklın ve bilimin rehberliğinde yürümeyen milletlerin geleceği karanlıktır.',
    author: 'Prof. Dr. Gazi Yaşargil',
    title: 'Yüzyılın Beyin Cerrahı',
    era: '1925 - Günümüz',
    tags: ['Bilim', 'Akılcılık', 'Araştırma'],
    category: 'vizyon'
  },
  {
    id: 'q18',
    quote: 'Bana bir harf öğretenin kırk yıl kölesi olurum.',
    author: 'Hz. Ali',
    title: 'İlim Kapısı',
    era: '599 - 661',
    tags: ['Vefa', 'Öğretmen Saygısı', 'İlim'],
    category: 'öğretmenlik'
  }
];

export const INITIAL_GAMES: EducationalGame[] = [
  {
    id: 'game-math-sprint',
    title: 'Matematik Hız Yarışı',
    shortDescription: 'Canlı zamanlayıcı ve kombo serileriyle dört işlem refleksini güçlendir.',
    longDescription: 'Toplama, çıkarma, çarpma ve bölme işlemlerini süre bitmeden doğru yanıtlayarak sınıf rekorunu kır. Zorluk seviyeleri ile her yaşa uygun.',
    subject: 'matematik',
    gradeLevels: ['İlkokul', 'Ortaokul', 'Lise'],
    durationMinutes: 3,
    colorGradient: 'from-amber-500 via-orange-500 to-rose-500',
    accentColor: 'text-amber-600',
    iconName: 'Calculator',
    badgeText: 'Hemen Oyna',
    isPlayableInApp: true,
    inAppGameId: 'math-sprint',
    skillsLearned: ['Zihinden İşlem', 'Hızlı Karar Verme', 'Odaklanma', 'Aritmetik'],
    rating: 4.9,
    playCount: 1420
  },
  {
    id: 'game-word-hunter',
    title: 'Kelime & Kavram Avcısı',
    shortDescription: 'Eğitsel ipuçlarından yola çıkarak saklı terimleri harf harf bul.',
    longDescription: 'Türkçe söz varlığı, fen bilimleri kavramları, tarih terimleri ve deyimler arasından gizlenmiş kelimeyi ipuçlarını takip ederek keşfet.',
    subject: 'turkce',
    gradeLevels: ['İlkokul', 'Ortaokul', 'Lise'],
    durationMinutes: 5,
    colorGradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    accentColor: 'text-emerald-600',
    iconName: 'Sparkles',
    badgeText: 'Hemen Oyna',
    isPlayableInApp: true,
    inAppGameId: 'word-hunter',
    skillsLearned: ['Kelime Dağarcığı', 'Akıl Yürütme', 'Analiz', 'Dil Becerisi'],
    rating: 4.8,
    playCount: 980
  },
  {
    id: 'game-trivia-quiz',
    title: 'Genel Kültür & Bilim Çarkı',
    shortDescription: 'Fen, Coğrafya, Tarih ve Sanat sorularıyla bilginizi test edin.',
    longDescription: 'Müfredata uygun ve genel kültür zenginleştirici çoktan seçmeli sorularla anında geri bildirim alın, doğru cevapların açıklamalarını öğrenin.',
    subject: 'fen',
    gradeLevels: ['Ortaokul', 'Lise'],
    durationMinutes: 4,
    colorGradient: 'from-indigo-500 via-purple-500 to-pink-500',
    accentColor: 'text-indigo-600',
    iconName: 'BrainCircuit',
    badgeText: 'Hemen Oyna',
    isPlayableInApp: true,
    inAppGameId: 'trivia-quiz',
    skillsLearned: ['Fen Bilinci', 'Tarih Bilgisi', 'Coğrafi Algı', 'Genel Kültür'],
    rating: 4.9,
    playCount: 1210
  },
  {
    id: 'game-memory-match',
    title: 'Hafıza & Kavram Eşleştirme',
    shortDescription: 'Kartları çevir; elementler, zıt anlamlılar ve formülleri eşleştir.',
    longDescription: 'Görsel hafızayı ve kavram bilgisini aynı anda geliştiren etkileşimli kart eşleştirme oyunu. Hamle sayısı ve süre rekoru takibi.',
    subject: 'mantik',
    gradeLevels: ['İlkokul', 'Ortaokul'],
    durationMinutes: 3,
    colorGradient: 'from-blue-500 via-indigo-600 to-violet-700',
    accentColor: 'text-blue-600',
    iconName: 'Grid3x3',
    badgeText: 'Hemen Oyna',
    isPlayableInApp: true,
    inAppGameId: 'memory-match',
    skillsLearned: ['Görsel Hafıza', 'Kavram Tanıma', 'Konsantrasyon', 'Eşleştirme'],
    rating: 4.7,
    playCount: 840
  },
  {
    id: 'game-phet-sims',
    title: 'PhET İnteraktif Fen & Matematik',
    shortDescription: 'Colorado Üniversitesi tarafından geliştirilen dünyaca ünlü simülasyonlar.',
    longDescription: 'Elektrik devreleri, yer çekimi, optik, kesirler ve molekül yapıları üzerinde deneyler yapabileceğiniz interaktif laboratuvar ortamı.',
    subject: 'fen',
    gradeLevels: ['İlkokul', 'Ortaokul', 'Lise'],
    durationMinutes: 15,
    colorGradient: 'from-cyan-500 via-blue-600 to-indigo-600',
    accentColor: 'text-cyan-600',
    iconName: 'FlaskConical',
    badgeText: 'Keşfet & Oyna',
    isPlayableInApp: false,
    externalUrl: 'https://phet.colorado.edu/tr/',
    skillsLearned: ['Bilimsel Deney', 'Fizik & Kimya', 'Gözlem', 'Hipotez Testi'],
    rating: 5.0,
    playCount: 2300
  },
  {
    id: 'game-geogebra',
    title: 'GeoGebra Görsel Geometri & Matematik',
    shortDescription: 'Grafikler, fonksiyonlar ve 3D geometri şekillerini dinamik incele.',
    longDescription: 'Öğrencilerin soyut matematik ve geometri kavramlarını dinamik olarak manipüle ederek görselleştirmesini sağlayan güçlü dijital araç.',
    subject: 'matematik',
    gradeLevels: ['Ortaokul', 'Lise'],
    durationMinutes: 10,
    colorGradient: 'from-violet-500 via-purple-600 to-fuchsia-600',
    accentColor: 'text-violet-600',
    iconName: 'Shapes',
    badgeText: 'Dersinde Kullan',
    isPlayableInApp: false,
    externalUrl: 'https://www.geogebra.org/?lang=tr',
    skillsLearned: ['Geometrik Düşünme', 'Grafik Okuma', 'Fonksiyonlar', 'Uzamsal Algı'],
    rating: 4.9,
    playCount: 1650
  },
  {
    id: 'game-scratch',
    title: 'Scratch Kodlama Dünyası',
    shortDescription: 'MIT tarafından tasarlanan eğlenceli blok tabanlı programlama alanı.',
    longDescription: 'Öğrencilerin kendi animasyonlarını, hikayelerini ve oyunlarını blokları birleştirerek tasarladığı algoritma geliştirme platformu.',
    subject: 'kodlama',
    gradeLevels: ['İlkokul', 'Ortaokul'],
    durationMinutes: 20,
    colorGradient: 'from-amber-500 via-yellow-500 to-orange-600',
    accentColor: 'text-yellow-600',
    iconName: 'CodeXml',
    badgeText: 'Proje Geliştir',
    isPlayableInApp: false,
    externalUrl: 'https://scratch.mit.edu',
    skillsLearned: ['Algoritmik Düşünme', 'Problem Çözme', 'Mantıksal Sıralama', 'Yaratıcılık'],
    rating: 4.9,
    playCount: 1980
  },
  {
    id: 'game-wordwall',
    title: 'Wordwall Sınıf Oyunları Şablonları',
    shortDescription: 'Köstebek vurmaca, labirent kovalamaca, çarkıfelek ve bilgi yarışması.',
    longDescription: 'Saniyeler içinde kendi sorularınızla eğitsel mini oyunlar oluşturup akıllı tahtada oynatabileceğiniz zengin etkinlik kütüphanesi.',
    subject: 'sosyal',
    gradeLevels: ['İlkokul', 'Ortaokul', 'Lise'],
    durationMinutes: 8,
    colorGradient: 'from-rose-500 via-pink-600 to-purple-600',
    accentColor: 'text-rose-600',
    iconName: 'Gamepad2',
    badgeText: 'Şablon Seç',
    isPlayableInApp: false,
    externalUrl: 'https://wordwall.net/tr',
    skillsLearned: ['Hızlı Hatırlama', 'Sınıf Katılımı', 'Öğrenme Motivasyonu'],
    rating: 4.8,
    playCount: 3100
  }
];
