export interface Question {
  id: number;
  text: string;
  options: [string, string, string, string];
  correctIndex: number; // 0-3
  topic: string;
  year: number;
  explanation?: string;
}

export const TOPICS = [
  "Kulliyat",
  "Ilmul Advia",
  "Moalijat",
  "Tashreeh wa Wazaif",
  "Ilmul Amraz",
  "Jarahat",
  "Ilmul Qabalat",
  "Hifzane Sehat",
  "Tahaffuzi wa Samaji Tib",
  "Ilmul Nafsiyat",
  "Ilmul Saidla",
  "Niswan wa Atfal",
  "Ain, Uzn, Anf, Halaq",
  "Qanoon wa Tibb",
  "Nazariyat wa Usool",
  "Ilmul Tashkhees",
  "Mabadia wa Arkan",
  "Akhlat wa Mizaj",
  "Tadbeer wa Ilaj",
  "Amraz Jild",
  "Amraz Qalb wa Awiye Damawiya",
  "Amraz Kuliya wa Masalak Baul",
  "Amraz Jauz Hazm",
  "Amraz Asab",
  "Amraz Tifl",
  "Amraz Mushtaraka",
  "Khas Ilaj",
  "Marham wa Zimad",
  "Ilmul Haywanat",
  "Ilaj bil Tadbeer",
];

export const YEARS = [
  2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026,
];

export const questions: Question[] = [
  // Kulliyat
  {
    id: 1,
    text: "According to Unani system, the four primary qualities (Kaifiyat) are:",
    options: [
      "Hot, Cold, Moist, Dry",
      "Fire, Water, Air, Earth",
      "Blood, Phlegm, Yellow Bile, Black Bile",
      "Qalb, Dimagh, Jigar, Uns",
    ],
    correctIndex: 0,
    topic: "Kulliyat",
    year: 2019,
    explanation:
      "The four primary qualities (Kaifiyat-e-Awwaliya) in Unani medicine are Hot (Haar), Cold (Barid), Moist (Ratab), and Dry (Yabis).",
  },
  {
    id: 2,
    text: "The concept of 'Mizaj' in Unani medicine refers to:",
    options: [
      "Diet and nutrition",
      "Temperament or constitution",
      "Pulse diagnosis",
      "Urine examination",
    ],
    correctIndex: 1,
    topic: "Kulliyat",
    year: 2018,
    explanation:
      "Mizaj refers to the temperament or constitution of an individual, formed by the interaction of the four elements and their qualities.",
  },
  {
    id: 3,
    text: "Which of the following is NOT one of the Arkan (elements) in Unani medicine?",
    options: ["Nar (Fire)", "Hawa (Air)", "Khak (Earth)", "Noor (Light)"],
    correctIndex: 3,
    topic: "Kulliyat",
    year: 2020,
    explanation:
      "The four Arkan (elements) in Unani medicine are Nar (Fire), Hawa (Air), Maa (Water), and Khak (Earth). Noor (Light) is not one of them.",
  },
  {
    id: 4,
    text: "The term 'Akhlat' in Unani medicine refers to:",
    options: ["Organs", "Humours", "Temperaments", "Vital forces"],
    correctIndex: 1,
    topic: "Kulliyat",
    year: 2017,
    explanation:
      "Akhlat refers to the four humours: Dam (Blood), Balgham (Phlegm), Safra (Yellow Bile), and Sauda (Black Bile).",
  },
  {
    id: 5,
    text: "According to Unani medicine, the seat of Rooh (vital spirit) is:",
    options: [
      "Jigar (Liver)",
      "Dimagh (Brain)",
      "Qalb (Heart)",
      "Tilli (Spleen)",
    ],
    correctIndex: 2,
    topic: "Kulliyat",
    year: 2021,
    explanation:
      "According to Unani medicine, Qalb (Heart) is the seat of Rooh (vital spirit/pneuma).",
  },
  {
    id: 6,
    text: "The process of digestion in Unani medicine is called:",
    options: ["Istehala", "Inhizam", "Ikhraj", "Imtisas"],
    correctIndex: 1,
    topic: "Kulliyat",
    year: 2022,
    explanation:
      "Inhizam refers to the process of digestion in Unani medicine, which occurs at multiple levels.",
  },
  {
    id: 7,
    text: "Which humour is associated with the season of Spring according to Unani medicine?",
    options: ["Sauda", "Balgham", "Dam", "Safra"],
    correctIndex: 2,
    topic: "Kulliyat",
    year: 2016,
    explanation:
      "Dam (Blood) is associated with Spring season. It is hot and moist in temperament, similar to the spring season.",
  },
  {
    id: 8,
    text: "The concept of 'Quwwat' (faculty/power) in Unani medicine includes all EXCEPT:",
    options: [
      "Quwwat-e-Tabiya",
      "Quwwat-e-Nafsania",
      "Quwwat-e-Haywania",
      "Quwwat-e-Ilahiya",
    ],
    correctIndex: 3,
    topic: "Kulliyat",
    year: 2023,
    explanation:
      "The three Quwwat (faculties) in Unani medicine are Tabiya (Natural), Nafsania (Psychic), and Haywania (Vital). Quwwat-e-Ilahiya is not a recognized faculty.",
  },

  // Ilmul Advia
  {
    id: 9,
    text: "The drug 'Afsanteen' (Artemisia absinthium) is primarily used for:",
    options: [
      "Cardiac disorders",
      "Digestive disorders and worm infestation",
      "Respiratory disorders",
      "Urinary disorders",
    ],
    correctIndex: 1,
    topic: "Ilmul Advia",
    year: 2019,
    explanation:
      "Afsanteen (Artemisia absinthium) is primarily used for digestive disorders and worm infestation due to its bitter and anthelmintic properties.",
  },
  {
    id: 10,
    text: "Which of the following is the Unani name for Terminalia chebula?",
    options: ["Bahera", "Amla", "Haritaki/Halela Zard", "Bael"],
    correctIndex: 2,
    topic: "Ilmul Advia",
    year: 2018,
    explanation:
      "Terminalia chebula is known as Halela Zard or Haritaki in Unani medicine. It is one of the three fruits in Triphala.",
  },
  {
    id: 11,
    text: "The Mizaj (temperament) of Zanjabeel (Zingiber officinale) is:",
    options: ["Cold and Dry", "Hot and Moist", "Hot and Dry", "Cold and Moist"],
    correctIndex: 2,
    topic: "Ilmul Advia",
    year: 2020,
    explanation:
      "Zanjabeel (Ginger) has a Hot and Dry temperament (Haar Yabis) in the third degree according to Unani pharmacology.",
  },
  {
    id: 12,
    text: "Which drug is known as 'Asl-us-Soos' in Unani medicine?",
    options: [
      "Glycyrrhiza glabra",
      "Acacia arabica",
      "Ficus benghalensis",
      "Withania somnifera",
    ],
    correctIndex: 0,
    topic: "Ilmul Advia",
    year: 2017,
    explanation:
      "Asl-us-Soos is the Unani name for Glycyrrhiza glabra (Licorice root), widely used for respiratory and digestive conditions.",
  },
  {
    id: 13,
    text: "The drug 'Tukhm-e-Kasoos' is obtained from which plant?",
    options: [
      "Cuscuta reflexa",
      "Cannabis sativa",
      "Carum carvi",
      "Cuminum cyminum",
    ],
    correctIndex: 0,
    topic: "Ilmul Advia",
    year: 2021,
    explanation:
      "Tukhm-e-Kasoos refers to the seeds of Cuscuta reflexa (Dodder), used in Unani medicine for liver and kidney disorders.",
  },
  {
    id: 14,
    text: "Which of the following is a Muqawwi-e-Bah (aphrodisiac) drug in Unani medicine?",
    options: ["Senna", "Ashwagandha (Asgand)", "Neem", "Tulsi"],
    correctIndex: 1,
    topic: "Ilmul Advia",
    year: 2022,
    explanation:
      "Asgand (Withania somnifera/Ashwagandha) is a well-known Muqawwi-e-Bah (aphrodisiac) and general tonic in Unani medicine.",
  },
  {
    id: 15,
    text: "The term 'Mudir-e-Baul' in Unani pharmacology refers to drugs that:",
    options: [
      "Promote sweating",
      "Promote urination",
      "Promote menstruation",
      "Promote digestion",
    ],
    correctIndex: 1,
    topic: "Ilmul Advia",
    year: 2023,
    explanation:
      "Mudir-e-Baul refers to diuretic drugs that promote urination in Unani medicine.",
  },
  {
    id: 16,
    text: "Qust (Saussurea lappa) is primarily classified as which type of drug in Unani medicine?",
    options: [
      "Musakkin (Sedative)",
      "Muqawwi-e-Meda (Gastric tonic)",
      "Muqawwi-e-Dimagh (Brain tonic)",
      "Mudir-e-Haiz (Emmenagogue)",
    ],
    correctIndex: 2,
    topic: "Ilmul Advia",
    year: 2016,
    explanation:
      "Qust (Saussurea lappa) is primarily classified as Muqawwi-e-Dimagh (Brain tonic) and is also used for respiratory conditions.",
  },

  // Moalijat
  {
    id: 17,
    text: "The Unani treatment principle 'Ilaj bil Zid' means:",
    options: [
      "Treatment by similars",
      "Treatment by opposites",
      "Treatment by diet",
      "Treatment by surgery",
    ],
    correctIndex: 1,
    topic: "Moalijat",
    year: 2019,
    explanation:
      "Ilaj bil Zid means treatment by opposites — treating a hot disease with cold remedies and vice versa, which is the fundamental principle of Unani therapeutics.",
  },
  {
    id: 18,
    text: "Which of the following is the Unani treatment for Humma-e-Ghib (Tertian fever)?",
    options: [
      "Musakkinat",
      "Munzijat and Mushilat-e-Safra",
      "Muqawwiyat-e-Qalb",
      "Mudirat-e-Baul",
    ],
    correctIndex: 1,
    topic: "Moalijat",
    year: 2018,
    explanation:
      "Humma-e-Ghib (Tertian fever) is caused by excess Safra (Yellow Bile). Treatment involves Munzijat (maturatives) and Mushilat-e-Safra (cholagogues/purgatives for bile).",
  },
  {
    id: 19,
    text: "In Unani medicine, 'Fasad' (venesection/bloodletting) is indicated in which condition?",
    options: [
      "Imtila-e-Dam (Plethora of blood)",
      "Balgham predominance",
      "Sauda predominance",
      "Weakness and debility",
    ],
    correctIndex: 0,
    topic: "Moalijat",
    year: 2020,
    explanation:
      "Fasad (venesection) is indicated in Imtila-e-Dam (plethora/excess of blood) to remove excess blood and restore humoral balance.",
  },
  {
    id: 20,
    text: "The Unani formulation 'Jawarish Jalinus' is primarily used for:",
    options: [
      "Cardiac disorders",
      "Gastric disorders",
      "Neurological disorders",
      "Respiratory disorders",
    ],
    correctIndex: 1,
    topic: "Moalijat",
    year: 2021,
    explanation:
      "Jawarish Jalinus is a classical Unani formulation primarily used for gastric disorders including dyspepsia and loss of appetite.",
  },
  {
    id: 21,
    text: "Which Unani regimen therapy involves the use of steam?",
    options: ["Hammam", "Dalk", "Taleeq", "Idrar"],
    correctIndex: 0,
    topic: "Moalijat",
    year: 2022,
    explanation:
      "Hammam (Turkish bath/steam bath) is a regimen therapy in Unani medicine that uses steam and heat for therapeutic purposes.",
  },
  {
    id: 22,
    text: "The Unani treatment 'Hijama' (cupping) is classified under:",
    options: [
      "Ilaj bil Dawa",
      "Ilaj bil Tadbeer",
      "Ilaj bil Ghiza",
      "Ilaj bil Yad",
    ],
    correctIndex: 1,
    topic: "Moalijat",
    year: 2023,
    explanation:
      "Hijama (cupping therapy) is classified under Ilaj bil Tadbeer (Regimenal therapy), one of the four modes of treatment in Unani medicine.",
  },
  {
    id: 23,
    text: "Sharbat Bazoori Motadil is used in Unani medicine for:",
    options: [
      "Fever",
      "Urinary disorders",
      "Cardiac weakness",
      "Skin diseases",
    ],
    correctIndex: 1,
    topic: "Moalijat",
    year: 2016,
    explanation:
      "Sharbat Bazoori Motadil is a classical Unani formulation used for urinary disorders including dysuria and urinary tract infections.",
  },
  {
    id: 24,
    text: "In Unani medicine, 'Munzij' drugs are used to:",
    options: [
      "Purge the body",
      "Mature the morbid matter before evacuation",
      "Strengthen the organs",
      "Reduce inflammation",
    ],
    correctIndex: 1,
    topic: "Moalijat",
    year: 2017,
    explanation:
      "Munzij (maturative) drugs are used to mature (ripen) the morbid matter (Maada-e-Fasida) before it can be evacuated from the body.",
  },

  // Tashreeh wa Wazaif
  {
    id: 25,
    text: "According to Unani anatomy, the liver (Jigar) produces which humour?",
    options: ["Safra", "Balgham", "Dam", "Sauda"],
    correctIndex: 2,
    topic: "Tashreeh wa Wazaif",
    year: 2019,
    explanation:
      "According to Unani physiology, the liver (Jigar) is the primary organ for the production of Dam (Blood) and is considered the seat of natural faculty.",
  },
  {
    id: 26,
    text: "The 'Nafs Nabatat' (vegetative soul) in Unani medicine is associated with which organ?",
    options: ["Heart", "Brain", "Liver", "Spleen"],
    correctIndex: 2,
    topic: "Tashreeh wa Wazaif",
    year: 2018,
    explanation:
      "The Nafs Nabatat (vegetative/natural soul) is associated with the Jigar (Liver), which governs nutrition, growth, and reproduction.",
  },
  {
    id: 27,
    text: "In Unani physiology, 'Ruh Haywani' (vital spirit) is produced in:",
    options: ["Liver", "Brain", "Heart", "Lungs"],
    correctIndex: 2,
    topic: "Tashreeh wa Wazaif",
    year: 2020,
    explanation:
      "Ruh Haywani (vital spirit) is produced in the Qalb (Heart) and is responsible for life, pulse, and vital functions.",
  },
  {
    id: 28,
    text: "The process of 'Hazm-e-Kabidi' (hepatic digestion) in Unani medicine occurs in:",
    options: ["Stomach", "Small intestine", "Liver", "Spleen"],
    correctIndex: 2,
    topic: "Tashreeh wa Wazaif",
    year: 2021,
    explanation:
      "Hazm-e-Kabidi (hepatic digestion) is the second stage of digestion occurring in the Jigar (Liver), where chyle is converted into blood.",
  },
  {
    id: 29,
    text: "According to Unani medicine, the number of bones in the human body is:",
    options: ["206", "248", "360", "300"],
    correctIndex: 1,
    topic: "Tashreeh wa Wazaif",
    year: 2022,
    explanation:
      "According to classical Unani anatomists, the human body has 248 bones, which differs from the modern count of 206.",
  },
  {
    id: 30,
    text: "The term 'Asab' in Unani anatomy refers to:",
    options: ["Muscles", "Nerves", "Bones", "Ligaments"],
    correctIndex: 1,
    topic: "Tashreeh wa Wazaif",
    year: 2023,
    explanation:
      "Asab refers to nerves in Unani anatomy. They are classified as Asab Hassasa (sensory nerves) and Asab Muharrika (motor nerves).",
  },

  // Ilmul Amraz
  {
    id: 31,
    text: "The Unani concept of 'Imtila' refers to:",
    options: [
      "Deficiency of humours",
      "Excess/fullness of humours",
      "Imbalance of temperament",
      "Obstruction of channels",
    ],
    correctIndex: 1,
    topic: "Ilmul Amraz",
    year: 2019,
    explanation:
      "Imtila refers to the excess or fullness of humours in the body, which is a major cause of disease in Unani pathology.",
  },
  {
    id: 32,
    text: "According to Unani medicine, 'Waram' (inflammation) is caused by:",
    options: [
      "Viral infection",
      "Accumulation of morbid matter in tissues",
      "Deficiency of vital force",
      "Imbalance of Mizaj",
    ],
    correctIndex: 1,
    topic: "Ilmul Amraz",
    year: 2018,
    explanation:
      "Waram (inflammation) in Unani pathology is caused by the accumulation of morbid matter (Maada-e-Fasida) in the tissues.",
  },
  {
    id: 33,
    text: "The Unani term for diabetes mellitus is:",
    options: ["Zatul Janb", "Ziabetus", "Istisqa", "Humma"],
    correctIndex: 1,
    topic: "Ilmul Amraz",
    year: 2020,
    explanation:
      "Ziabetus (also written as Ziabetes) is the Unani term for diabetes mellitus, characterized by excessive urination and thirst.",
  },
  {
    id: 34,
    text: "In Unani medicine, 'Suda' refers to:",
    options: ["Headache", "Fever", "Cough", "Diarrhea"],
    correctIndex: 0,
    topic: "Ilmul Amraz",
    year: 2021,
    explanation:
      "Suda refers to headache in Unani medicine. It can be caused by various factors including excess of humours, vapors, or external causes.",
  },
  {
    id: 35,
    text: "The Unani disease 'Zatul Janb' corresponds to which modern condition?",
    options: ["Pneumonia/Pleurisy", "Appendicitis", "Hepatitis", "Nephritis"],
    correctIndex: 0,
    topic: "Ilmul Amraz",
    year: 2022,
    explanation:
      "Zatul Janb in Unani medicine corresponds to Pneumonia or Pleurisy in modern medicine, characterized by chest pain and respiratory symptoms.",
  },
  {
    id: 36,
    text: "According to Unani pathology, 'Sue Mizaj Mufrid' refers to:",
    options: [
      "Simple temperamental disorder without humoral involvement",
      "Complex humoral disorder",
      "Structural disease",
      "Functional disorder",
    ],
    correctIndex: 0,
    topic: "Ilmul Amraz",
    year: 2023,
    explanation:
      "Sue Mizaj Mufrid (simple dycrasia) refers to a temperamental disorder without humoral involvement, affecting only the quality of the organ.",
  },
  {
    id: 37,
    text: "The Unani term 'Istisqa' corresponds to which modern condition?",
    options: ["Jaundice", "Ascites/Dropsy", "Anemia", "Hypertension"],
    correctIndex: 1,
    topic: "Ilmul Amraz",
    year: 2016,
    explanation:
      "Istisqa in Unani medicine corresponds to Ascites or Dropsy (edema) in modern medicine, characterized by abnormal fluid accumulation.",
  },

  // Jarahat
  {
    id: 38,
    text: "The Unani surgical procedure 'Shaq' refers to:",
    options: ["Cauterization", "Incision", "Cupping", "Leeching"],
    correctIndex: 1,
    topic: "Jarahat",
    year: 2019,
    explanation:
      "Shaq refers to incision (cutting) in Unani surgery, used to drain abscesses and treat various surgical conditions.",
  },
  {
    id: 39,
    text: "In Unani medicine, 'Kai' refers to:",
    options: ["Leeching", "Cauterization", "Venesection", "Cupping"],
    correctIndex: 1,
    topic: "Jarahat",
    year: 2018,
    explanation:
      "Kai refers to cauterization in Unani medicine, used as a last resort treatment for various conditions including tumors and chronic wounds.",
  },
  {
    id: 40,
    text: "The Unani term for wound healing is:",
    options: ["Tansheef", "Iltiam", "Tahleel", "Taqteer"],
    correctIndex: 1,
    topic: "Jarahat",
    year: 2020,
    explanation:
      "Iltiam refers to wound healing in Unani medicine. Drugs that promote wound healing are called Multaim.",
  },

  // Ilmul Qabalat
  {
    id: 41,
    text: "The Unani term for normal delivery is:",
    options: [
      "Wiladat-e-Aseer",
      "Wiladat-e-Tabii",
      "Wiladat-e-Qais",
      "Wiladat-e-Maqloob",
    ],
    correctIndex: 1,
    topic: "Ilmul Qabalat",
    year: 2021,
    explanation:
      "Wiladat-e-Tabii refers to normal/natural delivery in Unani obstetrics, where the baby is delivered in the vertex presentation.",
  },
  {
    id: 42,
    text: "According to Unani medicine, the duration of normal pregnancy is:",
    options: ["9 months", "270 days", "9 months and 9 days", "280 days"],
    correctIndex: 2,
    topic: "Ilmul Qabalat",
    year: 2022,
    explanation:
      "According to Unani medicine, the normal duration of pregnancy is 9 months and 9 days (approximately 279 days).",
  },
  {
    id: 43,
    text: "The Unani drug used to promote lactation is called:",
    options: [
      "Mudir-e-Haiz",
      "Mudir-e-Laban",
      "Muqawwi-e-Rahim",
      "Habis-e-Dam",
    ],
    correctIndex: 1,
    topic: "Ilmul Qabalat",
    year: 2023,
    explanation:
      "Mudir-e-Laban refers to galactagogue drugs that promote milk production (lactation) in Unani medicine.",
  },

  // Hifzane Sehat
  {
    id: 44,
    text: "The six essential factors for health maintenance in Unani medicine are called:",
    options: [
      "Arkan-e-Sitta",
      "Asbab-e-Sitta Zarooriya",
      "Quwwat-e-Sitta",
      "Akhlat-e-Sitta",
    ],
    correctIndex: 1,
    topic: "Hifzane Sehat",
    year: 2019,
    explanation:
      "Asbab-e-Sitta Zarooriya (Six Essential Factors) are the six non-naturals that must be regulated for maintaining health in Unani medicine.",
  },
  {
    id: 45,
    text: "Which of the following is NOT included in Asbab-e-Sitta Zarooriya?",
    options: [
      "Hawa (Air)",
      "Naum wa Yaqzah (Sleep and wakefulness)",
      "Dawa (Medicine)",
      "Harkat wa Sukoon-e-Nafsani (Mental activity and rest)",
    ],
    correctIndex: 2,
    topic: "Hifzane Sehat",
    year: 2018,
    explanation:
      "Dawa (Medicine) is not part of Asbab-e-Sitta Zarooriya. The six are: Hawa, Makool wa Mashroob, Naum wa Yaqzah, Harkat wa Sukoon Badani, Harkat wa Sukoon Nafsani, and Ihtibas wa Istifragh.",
  },
  {
    id: 46,
    text: "The Unani concept of 'Ihtibas wa Istifragh' refers to:",
    options: [
      "Sleep and wakefulness",
      "Retention and evacuation",
      "Exercise and rest",
      "Diet and nutrition",
    ],
    correctIndex: 1,
    topic: "Hifzane Sehat",
    year: 2020,
    explanation:
      "Ihtibas wa Istifragh refers to retention and evacuation — the balance between what is retained and what is excreted from the body, which is one of the six essential factors.",
  },
  {
    id: 47,
    text: "According to Unani medicine, the ideal season for Fasd (venesection) is:",
    options: ["Winter", "Summer", "Spring", "Autumn"],
    correctIndex: 2,
    topic: "Hifzane Sehat",
    year: 2017,
    explanation:
      "Spring is considered the ideal season for Fasd (venesection) in Unani medicine, as blood is at its peak during this season.",
  },
  {
    id: 48,
    text: "The Unani term 'Riyazat' refers to:",
    options: [
      "Massage therapy",
      "Physical exercise",
      "Dietary regimen",
      "Spiritual healing",
    ],
    correctIndex: 1,
    topic: "Hifzane Sehat",
    year: 2016,
    explanation:
      "Riyazat refers to physical exercise in Unani medicine, which is one of the important components of Asbab-e-Sitta Zarooriya (Harkat wa Sukoon Badani).",
  },

  // Tahaffuzi wa Samaji Tib
  {
    id: 49,
    text: "The Unani concept of preventive medicine is known as:",
    options: [
      "Ilaj bil Tadbeer",
      "Hifzane Sehat",
      "Tahaffuzi Tib",
      "Islah-e-Ghiza",
    ],
    correctIndex: 2,
    topic: "Tahaffuzi wa Samaji Tib",
    year: 2021,
    explanation:
      "Tahaffuzi Tib refers to preventive medicine in Unani system, which focuses on maintaining health and preventing disease.",
  },
  {
    id: 50,
    text: "Which of the following is a primary level of prevention in Unani medicine?",
    options: [
      "Early diagnosis",
      "Rehabilitation",
      "Maintaining Mizaj-e-Motadil (balanced temperament)",
      "Surgery",
    ],
    correctIndex: 2,
    topic: "Tahaffuzi wa Samaji Tib",
    year: 2022,
    explanation:
      "Maintaining Mizaj-e-Motadil (balanced temperament) through proper diet, lifestyle, and regimen is the primary level of prevention in Unani medicine.",
  },
  {
    id: 51,
    text: "The Unani term for epidemic disease is:",
    options: ["Waba", "Humma", "Taaun", "Fasad"],
    correctIndex: 0,
    topic: "Tahaffuzi wa Samaji Tib",
    year: 2023,
    explanation:
      "Waba refers to epidemic disease in Unani medicine, caused by corruption of air (Fasad-e-Hawa) and affecting large populations.",
  },
  {
    id: 52,
    text: "According to Unani medicine, 'Taaun' (plague) is caused by:",
    options: [
      "Excess of Dam (blood)",
      "Corruption of air and miasma",
      "Deficiency of Safra",
      "Excess of Balgham",
    ],
    correctIndex: 1,
    topic: "Tahaffuzi wa Samaji Tib",
    year: 2016,
    explanation:
      "Taaun (plague) in Unani medicine is attributed to corruption of air (Fasad-e-Hawa) and miasmatic factors, leading to epidemic spread.",
  },
  {
    id: 53,
    text: "The Unani concept of 'Islah-e-Hawa' (purification of air) is part of:",
    options: ["Ilaj bil Dawa", "Tahaffuzi Tib", "Jarahat", "Ilmul Advia"],
    correctIndex: 1,
    topic: "Tahaffuzi wa Samaji Tib",
    year: 2017,
    explanation:
      "Islah-e-Hawa (purification of air) is a preventive measure in Tahaffuzi Tib (preventive medicine) to prevent epidemic diseases.",
  },

  // ── NEW QUESTIONS ADDED BELOW (IDs 61–120) ──────────────────────────────────

  // Kulliyat – additional
  {
    id: 61,
    text: "The term 'Tabiyat' (Physis/Nature) in Unani medicine is best described as:",
    options: [
      "The soul of the body",
      "The innate healing power that maintains health",
      "The temperament of an organ",
      "The vital spirit produced in the heart",
    ],
    correctIndex: 1,
    topic: "Kulliyat",
    year: 2017,
    explanation:
      "Tabiyat (Physis) is the innate healing power or nature of the body that maintains health, regulates physiological processes, and fights disease in Unani medicine.",
  },
  {
    id: 62,
    text: "According to Unani medicine, 'Sauda' (Black Bile) is produced in which organ?",
    options: ["Liver", "Spleen", "Gallbladder", "Kidney"],
    correctIndex: 0,
    topic: "Kulliyat",
    year: 2016,
    explanation:
      "Sauda (Black Bile) is produced in the Jigar (Liver) as a sediment of blood formation. The Tilli (Spleen) is the reservoir of Sauda, not its site of production.",
  },
  {
    id: 63,
    text: "The Unani term 'Balgham' (Phlegm) is associated with which season?",
    options: ["Spring", "Summer", "Autumn", "Winter"],
    correctIndex: 3,
    topic: "Kulliyat",
    year: 2018,
    explanation:
      "Balgham (Phlegm) is associated with Winter season. It is cold and moist in temperament, similar to the winter season.",
  },
  {
    id: 64,
    text: "In Unani medicine, 'Arwah' (spirits) are classified into how many types?",
    options: ["Two", "Three", "Four", "Five"],
    correctIndex: 1,
    topic: "Kulliyat",
    year: 2020,
    explanation:
      "Arwah (spirits) in Unani medicine are classified into three types: Ruh Haywani (vital spirit), Ruh Nafsani (psychic spirit), and Ruh Tabii (natural spirit).",
  },
  {
    id: 65,
    text: "The concept of 'Mizaj-e-Motadil' (balanced temperament) in Unani medicine refers to:",
    options: [
      "Equal proportion of all four humours",
      "Ideal balance of qualities suited to the individual",
      "Absence of all disease",
      "Dominance of Dam (blood) humour",
    ],
    correctIndex: 1,
    topic: "Kulliyat",
    year: 2022,
    explanation:
      "Mizaj-e-Motadil refers to the ideal balanced temperament suited to the individual's constitution, not necessarily equal proportions of all humours.",
  },
  {
    id: 66,
    text: "According to Unani medicine, 'Safra' (Yellow Bile) is associated with which season?",
    options: ["Spring", "Summer", "Autumn", "Winter"],
    correctIndex: 1,
    topic: "Kulliyat",
    year: 2024,
    explanation:
      "Safra (Yellow Bile) is associated with Summer season. It is hot and dry in temperament, similar to the summer season.",
  },
  {
    id: 67,
    text: "The Unani term 'Uzw Rais' refers to:",
    options: [
      "Secondary organs",
      "Principal/Noble organs (Heart, Brain, Liver)",
      "Reproductive organs",
      "Digestive organs",
    ],
    correctIndex: 1,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "Uzw Rais refers to the principal or noble organs in Unani medicine: Qalb (Heart), Dimagh (Brain), and Jigar (Liver), which are the seats of the three faculties.",
  },

  // Ilmul Advia – additional
  {
    id: 68,
    text: "The Unani drug 'Behman Surkh' is obtained from:",
    options: [
      "Salvia haematodes",
      "Centaurea behen",
      "Moringa oleifera",
      "Nardostachys jatamansi",
    ],
    correctIndex: 1,
    topic: "Ilmul Advia",
    year: 2016,
    explanation:
      "Behman Surkh is obtained from Centaurea behen (Red Centaury). It is used as a cardiac and brain tonic in Unani medicine.",
  },
  {
    id: 69,
    text: "Which of the following is the botanical source of 'Tukhm-e-Khatmi' in Unani medicine?",
    options: [
      "Hibiscus rosa-sinensis",
      "Althaea officinalis",
      "Malva sylvestris",
      "Abelmoschus esculentus",
    ],
    correctIndex: 1,
    topic: "Ilmul Advia",
    year: 2017,
    explanation:
      "Tukhm-e-Khatmi refers to the seeds of Althaea officinalis (Marshmallow). It is used as a demulcent and emollient in Unani medicine.",
  },
  {
    id: 70,
    text: "The Unani drug 'Ushba' (Smilax china) is primarily used for:",
    options: [
      "Respiratory disorders",
      "Skin diseases and syphilis",
      "Cardiac disorders",
      "Urinary disorders",
    ],
    correctIndex: 1,
    topic: "Ilmul Advia",
    year: 2018,
    explanation:
      "Ushba (Smilax china/China root) is primarily used for skin diseases, syphilis, and as a blood purifier in Unani medicine.",
  },
  {
    id: 71,
    text: "The Mizaj (temperament) of Sandal Safaid (Santalum album) is:",
    options: ["Hot and Dry", "Hot and Moist", "Cold and Dry", "Cold and Moist"],
    correctIndex: 2,
    topic: "Ilmul Advia",
    year: 2019,
    explanation:
      "Sandal Safaid (White Sandalwood) has a Cold and Dry temperament in Unani pharmacology. It is used as a cardiac tonic and for fever.",
  },
  {
    id: 72,
    text: "Which Unani drug is known as 'Muqil' and is obtained from Commiphora mukul?",
    options: ["Kateera", "Guggul/Muqil", "Kundur", "Mastagi"],
    correctIndex: 1,
    topic: "Ilmul Advia",
    year: 2020,
    explanation:
      "Muqil is the Unani name for the resin obtained from Commiphora mukul (Guggul). It is used for arthritis, obesity, and lipid disorders.",
  },
  {
    id: 73,
    text: "The drug 'Rewand Chini' in Unani medicine is obtained from:",
    options: [
      "Rheum emodi",
      "Cassia angustifolia",
      "Aloe vera",
      "Operculina turpethum",
    ],
    correctIndex: 0,
    topic: "Ilmul Advia",
    year: 2021,
    explanation:
      "Rewand Chini is obtained from Rheum emodi (Indian Rhubarb). It is used as a mild purgative and liver tonic in Unani medicine.",
  },
  {
    id: 74,
    text: "The Unani term 'Mushil' refers to drugs that:",
    options: [
      "Promote sweating",
      "Act as purgatives/laxatives",
      "Promote urination",
      "Promote vomiting",
    ],
    correctIndex: 1,
    topic: "Ilmul Advia",
    year: 2022,
    explanation:
      "Mushil refers to purgative or laxative drugs in Unani medicine that promote evacuation of the bowels.",
  },
  {
    id: 75,
    text: "Which of the following is a 'Muqawwi-e-Qalb' (cardiac tonic) drug in Unani medicine?",
    options: ["Senna", "Arjun (Terminalia arjuna)", "Neem", "Harad"],
    correctIndex: 1,
    topic: "Ilmul Advia",
    year: 2023,
    explanation:
      "Arjun (Terminalia arjuna) is a well-known Muqawwi-e-Qalb (cardiac tonic) in Unani medicine, used for heart failure and cardiac weakness.",
  },
  {
    id: 76,
    text: "The Unani drug 'Tukhm-e-Sharbati' (Ocimum basilicum seeds) is primarily used as:",
    options: ["Purgative", "Demulcent and cooling agent", "Emetic", "Diuretic"],
    correctIndex: 1,
    topic: "Ilmul Advia",
    year: 2024,
    explanation:
      "Tukhm-e-Sharbati (Basil seeds/Sabja) is used as a demulcent and cooling agent in Unani medicine, commonly added to sherbets for urinary and digestive complaints.",
  },
  {
    id: 77,
    text: "The botanical source of 'Habb-ul-Aas' in Unani medicine is:",
    options: [
      "Myrtus communis",
      "Punica granatum",
      "Coriandrum sativum",
      "Foeniculum vulgare",
    ],
    correctIndex: 0,
    topic: "Ilmul Advia",
    year: 2025,
    explanation:
      "Habb-ul-Aas refers to the berries of Myrtus communis (Myrtle). It is used as an astringent and for diarrhea, dysentery, and urinary disorders.",
  },

  // Moalijat – additional
  {
    id: 78,
    text: "The Unani formulation 'Majoon Chobchini' is primarily used for:",
    options: [
      "Cardiac disorders",
      "Skin diseases and syphilis",
      "Respiratory disorders",
      "Neurological disorders",
    ],
    correctIndex: 1,
    topic: "Moalijat",
    year: 2016,
    explanation:
      "Majoon Chobchini is a classical Unani compound formulation primarily used for skin diseases, syphilis, and joint disorders.",
  },
  {
    id: 79,
    text: "In Unani medicine, 'Dalk' (massage) is classified under which mode of treatment?",
    options: [
      "Ilaj bil Dawa",
      "Ilaj bil Ghiza",
      "Ilaj bil Tadbeer",
      "Ilaj bil Yad",
    ],
    correctIndex: 2,
    topic: "Moalijat",
    year: 2017,
    explanation:
      "Dalk (massage) is classified under Ilaj bil Tadbeer (Regimenal therapy) in Unani medicine, along with other physical therapies.",
  },
  {
    id: 80,
    text: "The Unani formulation 'Tiryaq-e-Arba' is used for:",
    options: [
      "Fever",
      "Poisoning and as an antidote",
      "Cardiac weakness",
      "Skin diseases",
    ],
    correctIndex: 1,
    topic: "Moalijat",
    year: 2018,
    explanation:
      "Tiryaq-e-Arba is a classical Unani antidote formulation used for poisoning and as a general antidote (Tiryaq means antidote/theriac).",
  },
  {
    id: 81,
    text: "The Unani treatment for 'Humma-e-Ruba' (Quartan fever) involves:",
    options: [
      "Mushilat-e-Safra",
      "Mushilat-e-Sauda",
      "Mushilat-e-Balgham",
      "Mudirat-e-Baul",
    ],
    correctIndex: 1,
    topic: "Moalijat",
    year: 2019,
    explanation:
      "Humma-e-Ruba (Quartan fever) is caused by excess Sauda (Black Bile). Treatment involves Munzijat and Mushilat-e-Sauda (purgatives for black bile).",
  },
  {
    id: 82,
    text: "The Unani formulation 'Qurs Kafoor' is primarily used for:",
    options: [
      "Fever and as an antipyretic",
      "Cardiac disorders",
      "Urinary disorders",
      "Skin diseases",
    ],
    correctIndex: 0,
    topic: "Moalijat",
    year: 2020,
    explanation:
      "Qurs Kafoor is a classical Unani tablet formulation used as an antipyretic and for fever management.",
  },
  {
    id: 83,
    text: "In Unani medicine, 'Taleeq' (leeching) is used primarily for:",
    options: [
      "Removing excess Balgham",
      "Removing excess Dam (blood) from local areas",
      "Promoting digestion",
      "Strengthening organs",
    ],
    correctIndex: 1,
    topic: "Moalijat",
    year: 2021,
    explanation:
      "Taleeq (leeching/hirudotherapy) is used in Unani medicine to remove excess blood from local areas, especially where venesection is not feasible.",
  },
  {
    id: 84,
    text: "The Unani formulation 'Habbe Mumsik Tilai' is used for:",
    options: [
      "Premature ejaculation and sexual debility",
      "Cardiac weakness",
      "Respiratory disorders",
      "Urinary disorders",
    ],
    correctIndex: 0,
    topic: "Moalijat",
    year: 2022,
    explanation:
      "Habbe Mumsik Tilai is a classical Unani formulation used for premature ejaculation and sexual debility.",
  },
  {
    id: 85,
    text: "The Unani treatment principle 'Ilaj bil Mithl' means:",
    options: [
      "Treatment by opposites",
      "Treatment by similars",
      "Treatment by diet",
      "Treatment by surgery",
    ],
    correctIndex: 1,
    topic: "Moalijat",
    year: 2023,
    explanation:
      "Ilaj bil Mithl means treatment by similars — using drugs with similar qualities to the disease. This is less common than Ilaj bil Zid in Unani medicine.",
  },
  {
    id: 86,
    text: "The Unani formulation 'Sharbat-e-Dinar' is used for:",
    options: [
      "Urinary disorders",
      "Fever and as a cooling drink",
      "Cardiac weakness",
      "Respiratory disorders",
    ],
    correctIndex: 1,
    topic: "Moalijat",
    year: 2024,
    explanation:
      "Sharbat-e-Dinar is a classical Unani sherbet formulation used for fever and as a cooling drink in hot temperament conditions.",
  },

  // Tashreeh wa Wazaif – additional
  {
    id: 87,
    text: "According to Unani anatomy, 'Awraj' refers to:",
    options: ["Veins", "Arteries", "Nerves", "Lymphatics"],
    correctIndex: 1,
    topic: "Tashreeh wa Wazaif",
    year: 2016,
    explanation:
      "Awraj refers to arteries in Unani anatomy. They carry Ruh Haywani (vital spirit) along with blood from the heart.",
  },
  {
    id: 88,
    text: "The Unani term 'Urooq' refers to:",
    options: ["Arteries", "Veins", "Nerves", "Tendons"],
    correctIndex: 1,
    topic: "Tashreeh wa Wazaif",
    year: 2017,
    explanation:
      "Urooq refers to veins in Unani anatomy. They carry blood from the liver to nourish the body tissues.",
  },
  {
    id: 89,
    text: "According to Unani physiology, 'Hazm-e-Medi' (gastric digestion) converts food into:",
    options: ["Blood", "Chyle (Kyloos)", "Bile", "Urine"],
    correctIndex: 1,
    topic: "Tashreeh wa Wazaif",
    year: 2018,
    explanation:
      "Hazm-e-Medi (gastric digestion) converts food into Kyloos (chyle), which is then transported to the liver for further processing.",
  },
  {
    id: 90,
    text: "The Unani term 'Ruh Nafsani' (psychic spirit) is produced in:",
    options: ["Heart", "Liver", "Brain", "Spinal cord"],
    correctIndex: 2,
    topic: "Tashreeh wa Wazaif",
    year: 2019,
    explanation:
      "Ruh Nafsani (psychic spirit) is produced in the Dimagh (Brain) and is responsible for sensation, movement, and psychic functions.",
  },
  {
    id: 91,
    text: "According to Unani anatomy, the number of muscles in the human body is:",
    options: ["529", "639", "248", "365"],
    correctIndex: 0,
    topic: "Tashreeh wa Wazaif",
    year: 2020,
    explanation:
      "According to classical Unani anatomists, the human body has 529 muscles, which differs from the modern count.",
  },
  {
    id: 92,
    text: "The Unani term 'Ghudad' refers to:",
    options: ["Muscles", "Glands", "Bones", "Cartilage"],
    correctIndex: 1,
    topic: "Tashreeh wa Wazaif",
    year: 2021,
    explanation:
      "Ghudad refers to glands in Unani anatomy. They are considered to have protective and secretory functions.",
  },
  {
    id: 93,
    text: "According to Unani physiology, the fourth stage of digestion (Hazm-e-Uzwi) occurs in:",
    options: ["Stomach", "Liver", "Individual cells/tissues", "Intestines"],
    correctIndex: 2,
    topic: "Tashreeh wa Wazaif",
    year: 2022,
    explanation:
      "Hazm-e-Uzwi (tissue/cellular digestion) is the fourth and final stage of digestion occurring in individual cells and tissues, where nutrients are assimilated.",
  },
  {
    id: 94,
    text: "The Unani term 'Awtaar' refers to:",
    options: ["Nerves", "Tendons", "Ligaments", "Cartilage"],
    correctIndex: 1,
    topic: "Tashreeh wa Wazaif",
    year: 2023,
    explanation:
      "Awtaar refers to tendons in Unani anatomy, which connect muscles to bones and transmit muscular force.",
  },

  // Ilmul Amraz – additional
  {
    id: 95,
    text: "The Unani term 'Humma-e-Yawm' refers to:",
    options: [
      "Tertian fever",
      "Quartan fever",
      "Ephemeral/one-day fever",
      "Continuous fever",
    ],
    correctIndex: 2,
    topic: "Ilmul Amraz",
    year: 2016,
    explanation:
      "Humma-e-Yawm refers to ephemeral or one-day fever in Unani medicine, caused by external factors like excessive heat, fatigue, or emotional disturbance.",
  },
  {
    id: 96,
    text: "According to Unani pathology, 'Sue Mizaj Murakkab' refers to:",
    options: [
      "Simple temperamental disorder",
      "Compound temperamental disorder with humoral involvement",
      "Structural disease",
      "Congenital disorder",
    ],
    correctIndex: 1,
    topic: "Ilmul Amraz",
    year: 2017,
    explanation:
      "Sue Mizaj Murakkab (compound dycrasia) refers to a temperamental disorder with humoral involvement, where both quality and humour are affected.",
  },
  {
    id: 97,
    text: "The Unani disease 'Saratan' corresponds to which modern condition?",
    options: ["Tuberculosis", "Cancer/Malignant tumor", "Leprosy", "Syphilis"],
    correctIndex: 1,
    topic: "Ilmul Amraz",
    year: 2018,
    explanation:
      "Saratan in Unani medicine corresponds to Cancer or malignant tumor in modern medicine. The term literally means 'crab' due to the crab-like spread of the disease.",
  },
  {
    id: 98,
    text: "The Unani term 'Diq' corresponds to which modern condition?",
    options: ["Asthma", "Tuberculosis/Consumption", "Pneumonia", "Bronchitis"],
    correctIndex: 1,
    topic: "Ilmul Amraz",
    year: 2019,
    explanation:
      "Diq in Unani medicine corresponds to Tuberculosis or Consumption in modern medicine, characterized by wasting, fever, and cough.",
  },
  {
    id: 99,
    text: "According to Unani medicine, 'Waram-e-Haar' (hot inflammation) is characterized by:",
    options: [
      "Coldness, pallor, and hardness",
      "Redness, heat, pain, and swelling",
      "Itching and dryness",
      "Numbness and coldness",
    ],
    correctIndex: 1,
    topic: "Ilmul Amraz",
    year: 2020,
    explanation:
      "Waram-e-Haar (hot inflammation) is characterized by redness (Humra), heat (Hararat), pain (Waja), and swelling (Waram) — similar to the classical signs of inflammation.",
  },
  {
    id: 100,
    text: "The Unani term 'Falij' corresponds to which modern condition?",
    options: ["Epilepsy", "Hemiplegia/Paralysis", "Meningitis", "Migraine"],
    correctIndex: 1,
    topic: "Ilmul Amraz",
    year: 2021,
    explanation:
      "Falij in Unani medicine corresponds to Hemiplegia or Paralysis in modern medicine, caused by obstruction of Ruh Nafsani in the nerves.",
  },
  {
    id: 101,
    text: "The Unani disease 'Yaraqan' corresponds to which modern condition?",
    options: ["Anemia", "Jaundice", "Ascites", "Edema"],
    correctIndex: 1,
    topic: "Ilmul Amraz",
    year: 2022,
    explanation:
      "Yaraqan in Unani medicine corresponds to Jaundice in modern medicine, characterized by yellowish discoloration of skin and eyes due to excess Safra.",
  },
  {
    id: 102,
    text: "According to Unani pathology, the causes of disease are classified as:",
    options: [
      "Asbab Zarooriya and Asbab Ghair Zarooriya",
      "Asbab Badaniya and Asbab Nafsaniya",
      "Asbab Baadiya and Asbab Qaribiya",
      "Asbab Mufrid and Asbab Murakkab",
    ],
    correctIndex: 2,
    topic: "Ilmul Amraz",
    year: 2023,
    explanation:
      "In Unani pathology, causes of disease are classified as Asbab Baadiya (predisposing/remote causes) and Asbab Qaribiya (immediate/proximate causes).",
  },
  {
    id: 103,
    text: "The Unani term 'Khafqan' refers to:",
    options: ["Headache", "Palpitation of the heart", "Dizziness", "Fainting"],
    correctIndex: 1,
    topic: "Ilmul Amraz",
    year: 2024,
    explanation:
      "Khafqan refers to palpitation of the heart in Unani medicine, caused by weakness of the heart or excess of hot vapors reaching the heart.",
  },

  // Jarahat – additional
  {
    id: 104,
    text: "The Unani surgical procedure 'Batt' refers to:",
    options: [
      "Incision",
      "Lancing/opening of abscess",
      "Cauterization",
      "Amputation",
    ],
    correctIndex: 1,
    topic: "Jarahat",
    year: 2016,
    explanation:
      "Batt refers to lancing or opening of an abscess in Unani surgery to drain the accumulated pus.",
  },
  {
    id: 105,
    text: "The Unani term 'Dabboos' refers to which surgical instrument?",
    options: ["Scalpel", "Probe/sound", "Forceps", "Needle"],
    correctIndex: 1,
    topic: "Jarahat",
    year: 2017,
    explanation:
      "Dabboos refers to a probe or sound used in Unani surgery to explore wounds, fistulas, and body cavities.",
  },
  {
    id: 106,
    text: "In Unani surgery, 'Tadbeed' refers to:",
    options: [
      "Wound closure",
      "Scarification/superficial incisions",
      "Cauterization",
      "Amputation",
    ],
    correctIndex: 1,
    topic: "Jarahat",
    year: 2021,
    explanation:
      "Tadbeed refers to scarification or making multiple superficial incisions in Unani surgery, used to remove morbid matter from superficial tissues.",
  },
  {
    id: 107,
    text: "The Unani drug 'Marham-e-Dakhliyun' is used for:",
    options: [
      "Wound healing and ulcers",
      "Cardiac disorders",
      "Respiratory disorders",
      "Urinary disorders",
    ],
    correctIndex: 0,
    topic: "Jarahat",
    year: 2022,
    explanation:
      "Marham-e-Dakhliyun is a classical Unani ointment formulation used for wound healing, ulcers, and skin conditions.",
  },
  {
    id: 108,
    text: "According to Unani surgery, 'Waram-e-Balghami' (phlegmatic swelling) is characterized by:",
    options: [
      "Hot, red, and painful swelling",
      "Cold, white, soft, and painless swelling",
      "Hard and fixed swelling",
      "Fluctuant and tender swelling",
    ],
    correctIndex: 1,
    topic: "Jarahat",
    year: 2023,
    explanation:
      "Waram-e-Balghami (phlegmatic swelling) is characterized by cold, white, soft, and relatively painless swelling due to accumulation of Balgham (phlegm).",
  },

  // Ilmul Qabalat – additional
  {
    id: 109,
    text: "The Unani term 'Isqat' refers to:",
    options: [
      "Normal delivery",
      "Abortion/miscarriage",
      "Premature delivery",
      "Caesarean section",
    ],
    correctIndex: 1,
    topic: "Ilmul Qabalat",
    year: 2016,
    explanation:
      "Isqat refers to abortion or miscarriage in Unani obstetrics, which can be spontaneous or induced.",
  },
  {
    id: 110,
    text: "According to Unani medicine, 'Wiladat-e-Maqloob' refers to:",
    options: [
      "Normal vertex delivery",
      "Breech presentation delivery",
      "Caesarean delivery",
      "Forceps delivery",
    ],
    correctIndex: 1,
    topic: "Ilmul Qabalat",
    year: 2017,
    explanation:
      "Wiladat-e-Maqloob refers to breech presentation delivery in Unani obstetrics, where the baby is delivered feet or buttocks first.",
  },
  {
    id: 111,
    text: "The Unani drug 'Muqawwi-e-Rahim' is used to:",
    options: [
      "Promote lactation",
      "Strengthen the uterus",
      "Promote menstruation",
      "Prevent miscarriage",
    ],
    correctIndex: 1,
    topic: "Ilmul Qabalat",
    year: 2018,
    explanation:
      "Muqawwi-e-Rahim refers to uterine tonic drugs in Unani medicine that strengthen the uterus and are used for uterine weakness.",
  },
  {
    id: 112,
    text: "The Unani term 'Haiz' refers to:",
    options: ["Pregnancy", "Menstruation", "Lactation", "Menopause"],
    correctIndex: 1,
    topic: "Ilmul Qabalat",
    year: 2019,
    explanation:
      "Haiz refers to menstruation in Unani medicine. Disorders of menstruation are classified as Ihtibas-e-Haiz (amenorrhea), Kasrat-e-Haiz (menorrhagia), etc.",
  },
  {
    id: 113,
    text: "According to Unani medicine, the formation of the fetus begins with which substance?",
    options: [
      "Menstrual blood alone",
      "Semen alone",
      "Combination of male semen and female menstrual blood",
      "Vital spirit from the heart",
    ],
    correctIndex: 2,
    topic: "Ilmul Qabalat",
    year: 2020,
    explanation:
      "According to Unani embryology, the fetus is formed by the combination of male semen (Mani) and female menstrual blood (Dam-e-Haiz), with the male providing form and the female providing matter.",
  },

  // Hifzane Sehat – additional
  {
    id: 114,
    text: "The Unani concept of 'Makool wa Mashroob' (food and drink) as part of Asbab-e-Sitta Zarooriya emphasizes:",
    options: [
      "Only the quantity of food",
      "Quality, quantity, and timing of food and drink",
      "Only the type of food",
      "Only the temperature of food",
    ],
    correctIndex: 1,
    topic: "Hifzane Sehat",
    year: 2019,
    explanation:
      "Makool wa Mashroob (food and drink) as part of Asbab-e-Sitta Zarooriya emphasizes the quality, quantity, and timing of food and drink for maintaining health.",
  },
  {
    id: 115,
    text: "The Unani concept of 'Naum wa Yaqzah' (sleep and wakefulness) recommends how many hours of sleep for an adult?",
    options: ["4-5 hours", "6-8 hours", "9-10 hours", "10-12 hours"],
    correctIndex: 1,
    topic: "Hifzane Sehat",
    year: 2020,
    explanation:
      "According to Unani medicine, 6-8 hours of sleep is recommended for an adult to maintain health and restore vital energy.",
  },
  {
    id: 116,
    text: "The Unani preventive measure 'Tadbeer-e-Mufrid' refers to:",
    options: [
      "Preventive measures for the whole body",
      "Preventive measures for individual organs",
      "Preventive measures for specific seasons",
      "Preventive measures for specific age groups",
    ],
    correctIndex: 1,
    topic: "Hifzane Sehat",
    year: 2021,
    explanation:
      "Tadbeer-e-Mufrid refers to preventive measures for individual organs in Unani medicine, as opposed to Tadbeer-e-Kulliya for the whole body.",
  },
  {
    id: 117,
    text: "According to Unani medicine, the ideal time for Hammam (bath) is:",
    options: [
      "Early morning before breakfast",
      "After a full meal",
      "When the body is in a state of moderate warmth",
      "Late at night",
    ],
    correctIndex: 2,
    topic: "Hifzane Sehat",
    year: 2022,
    explanation:
      "According to Unani medicine, the ideal time for Hammam (bath) is when the body is in a state of moderate warmth, neither too hot nor too cold.",
  },

  // Tahaffuzi wa Samaji Tib – additional
  {
    id: 118,
    text: "The Unani concept of 'Fasad-e-Hawa' (corruption of air) is related to which modern concept?",
    options: [
      "Water pollution",
      "Air pollution and miasmatic theory of disease",
      "Food contamination",
      "Soil pollution",
    ],
    correctIndex: 1,
    topic: "Tahaffuzi wa Samaji Tib",
    year: 2018,
    explanation:
      "Fasad-e-Hawa (corruption of air) in Unani medicine is related to the miasmatic theory of disease and air pollution, which was considered a major cause of epidemic diseases.",
  },
  {
    id: 119,
    text: "The Unani approach to community health is based on which principle?",
    options: [
      "Individual treatment only",
      "Collective health through environmental and social measures",
      "Surgical intervention",
      "Pharmacological treatment only",
    ],
    correctIndex: 1,
    topic: "Tahaffuzi wa Samaji Tib",
    year: 2019,
    explanation:
      "The Unani approach to community health is based on collective health through environmental measures (Islah-e-Hawa, Islah-e-Maa), social measures, and preventive regimens.",
  },
  {
    id: 120,
    text: "The Unani term 'Hifzane Sehat' literally means:",
    options: [
      "Treatment of disease",
      "Preservation of health",
      "Diagnosis of disease",
      "Rehabilitation of patients",
    ],
    correctIndex: 1,
    topic: "Tahaffuzi wa Samaji Tib",
    year: 2020,
    explanation:
      "Hifzane Sehat literally means 'preservation of health' in Unani medicine, encompassing all preventive and promotive health measures.",
  },
  {
    id: 121,
    text: "According to Unani medicine, 'Islah-e-Maa' (purification of water) is important for preventing:",
    options: [
      "Respiratory diseases",
      "Waterborne diseases and epidemics",
      "Skin diseases",
      "Cardiac diseases",
    ],
    correctIndex: 1,
    topic: "Tahaffuzi wa Samaji Tib",
    year: 2021,
    explanation:
      "Islah-e-Maa (purification of water) is important for preventing waterborne diseases and epidemics in Unani preventive medicine.",
  },
  {
    id: 122,
    text: "The Unani concept of 'Quarantine' for epidemic diseases is mentioned in which classical text?",
    options: [
      "Kitab al-Hawi",
      "Al-Qanun fil Tib (Canon of Medicine)",
      "Zakhira-e-Khwarazm Shahi",
      "Makhzan-ul-Advia",
    ],
    correctIndex: 1,
    topic: "Tahaffuzi wa Samaji Tib",
    year: 2022,
    explanation:
      "The concept of quarantine and isolation for epidemic diseases is mentioned in Al-Qanun fil Tib (Canon of Medicine) by Ibn Sina (Avicenna).",
  },
  {
    id: 123,
    text: "The Unani preventive measure for Waba (epidemic) includes all EXCEPT:",
    options: [
      "Islah-e-Hawa (purification of air)",
      "Use of Tiryaq (antidotes)",
      "Isolation of patients",
      "Excessive physical exercise",
    ],
    correctIndex: 3,
    topic: "Tahaffuzi wa Samaji Tib",
    year: 2023,
    explanation:
      "Excessive physical exercise is NOT a preventive measure for Waba (epidemic). Prevention includes Islah-e-Hawa, use of Tiryaq, isolation, and dietary measures.",
  },
  {
    id: 124,
    text: "The Unani concept of 'Umr' (age) as a factor in health maintenance recognizes how many stages of life?",
    options: ["Three", "Four", "Five", "Six"],
    correctIndex: 1,
    topic: "Tahaffuzi wa Samaji Tib",
    year: 2024,
    explanation:
      "Unani medicine recognizes four stages of life (Umr): Sibyan (childhood), Shabab (youth), Wuqoof (middle age), and Shuyukh (old age), each requiring different preventive measures.",
  },
  {
    id: 125,
    text: "The Unani term 'Tadbeer-e-Mausim' refers to:",
    options: [
      "Dietary regimen",
      "Seasonal regimen for health maintenance",
      "Exercise regimen",
      "Sleep regimen",
    ],
    correctIndex: 1,
    topic: "Tahaffuzi wa Samaji Tib",
    year: 2025,
    explanation:
      "Tadbeer-e-Mausim refers to seasonal regimen in Unani medicine — specific dietary, lifestyle, and therapeutic measures recommended for each season to maintain health.",
  },

  // More Kulliyat questions
  {
    id: 126,
    text: "The Unani term 'Manafiz' refers to:",
    options: [
      "Organs of the body",
      "Channels/pores through which matter passes",
      "Vital spirits",
      "Humours",
    ],
    correctIndex: 1,
    topic: "Kulliyat",
    year: 2024,
    explanation:
      "Manafiz refers to channels or pores in Unani medicine through which matter (including humours and waste products) passes in and out of the body.",
  },
  {
    id: 127,
    text: "According to Unani medicine, 'Sauda' (Black Bile) is associated with which season?",
    options: ["Spring", "Summer", "Autumn", "Winter"],
    correctIndex: 2,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "Sauda (Black Bile) is associated with Autumn season. It is cold and dry in temperament, similar to the autumn season.",
  },
  {
    id: 128,
    text: "The Unani concept of 'Tabiyat-e-Mudabbira-e-Badan' refers to:",
    options: [
      "The soul",
      "The governing nature that manages the body",
      "The temperament",
      "The vital force",
    ],
    correctIndex: 1,
    topic: "Kulliyat",
    year: 2016,
    explanation:
      "Tabiyat-e-Mudabbira-e-Badan refers to the governing nature that manages and regulates all bodily functions in Unani medicine.",
  },
  {
    id: 129,
    text: "In Unani medicine, the concept of 'Istifragh' (evacuation) includes all EXCEPT:",
    options: ["Defecation", "Urination", "Sweating", "Respiration"],
    correctIndex: 3,
    topic: "Kulliyat",
    year: 2017,
    explanation:
      "Respiration is not classified under Istifragh (evacuation) in Unani medicine. Istifragh includes defecation, urination, sweating, vomiting, and menstruation.",
  },
  {
    id: 130,
    text: "The Unani term 'Mizaj-e-Haar Ratab' describes a temperament that is:",
    options: ["Hot and Dry", "Hot and Moist", "Cold and Dry", "Cold and Moist"],
    correctIndex: 1,
    topic: "Kulliyat",
    year: 2018,
    explanation:
      "Mizaj-e-Haar Ratab describes a Hot and Moist temperament in Unani medicine, associated with the Dam (Blood) humour and Spring season.",
  },

  // More Ilmul Advia questions
  {
    id: 131,
    text: "The Unani drug 'Tukhm-e-Hulba' (Trigonella foenum-graecum) is primarily used for:",
    options: [
      "Cardiac disorders",
      "Diabetes and digestive disorders",
      "Respiratory disorders",
      "Skin diseases",
    ],
    correctIndex: 1,
    topic: "Ilmul Advia",
    year: 2016,
    explanation:
      "Tukhm-e-Hulba (Fenugreek seeds) is primarily used for diabetes, digestive disorders, and as a galactagogue in Unani medicine.",
  },
  {
    id: 132,
    text: "The Unani drug 'Kalonji' (Nigella sativa) is described in Hadith as a cure for:",
    options: [
      "Only fever",
      "Everything except death",
      "Only digestive disorders",
      "Only skin diseases",
    ],
    correctIndex: 1,
    topic: "Ilmul Advia",
    year: 2017,
    explanation:
      "Kalonji (Nigella sativa/Black seed) is described in Hadith as a cure for everything except death (Maut). It has wide therapeutic applications in Unani medicine.",
  },
  {
    id: 133,
    text: "The Unani term 'Musakkin-e-Alam' refers to drugs that:",
    options: [
      "Promote digestion",
      "Relieve pain",
      "Promote urination",
      "Promote sweating",
    ],
    correctIndex: 1,
    topic: "Ilmul Advia",
    year: 2018,
    explanation:
      "Musakkin-e-Alam refers to analgesic or pain-relieving drugs in Unani medicine.",
  },
  {
    id: 134,
    text: "The botanical source of 'Tukhm-e-Gazar' in Unani medicine is:",
    options: [
      "Daucus carota",
      "Coriandrum sativum",
      "Foeniculum vulgare",
      "Carum carvi",
    ],
    correctIndex: 0,
    topic: "Ilmul Advia",
    year: 2019,
    explanation:
      "Tukhm-e-Gazar refers to the seeds of Daucus carota (Carrot). They are used as a diuretic and for urinary disorders in Unani medicine.",
  },
  {
    id: 135,
    text: "The Unani drug 'Abresham' (silk) is used primarily as:",
    options: ["Purgative", "Cardiac and brain tonic", "Diuretic", "Emetic"],
    correctIndex: 1,
    topic: "Ilmul Advia",
    year: 2020,
    explanation:
      "Abresham (silk) is used as a cardiac and brain tonic (Muqawwi-e-Qalb wa Dimagh) in Unani medicine.",
  },
  {
    id: 136,
    text: "The Unani term 'Muqawwi-e-Meda' refers to drugs that:",
    options: [
      "Strengthen the liver",
      "Strengthen the stomach",
      "Strengthen the heart",
      "Strengthen the brain",
    ],
    correctIndex: 1,
    topic: "Ilmul Advia",
    year: 2021,
    explanation:
      "Muqawwi-e-Meda refers to gastric tonic drugs that strengthen the stomach and improve its digestive function in Unani medicine.",
  },
  {
    id: 137,
    text: "The Unani drug 'Zafraan' (Crocus sativus/Saffron) is primarily classified as:",
    options: [
      "Musakkin (Sedative)",
      "Muqawwi-e-Qalb (Cardiac tonic) and Mufarrih (Exhilarant)",
      "Mushil (Purgative)",
      "Mudir-e-Baul (Diuretic)",
    ],
    correctIndex: 1,
    topic: "Ilmul Advia",
    year: 2022,
    explanation:
      "Zafraan (Saffron) is primarily classified as Muqawwi-e-Qalb (cardiac tonic) and Mufarrih (exhilarant/mood elevator) in Unani medicine.",
  },
  {
    id: 138,
    text: "The Unani drug 'Tukhm-e-Ispagol' (Plantago ovata) is used primarily for:",
    options: [
      "Fever",
      "Constipation and diarrhea (as a bulk laxative)",
      "Cardiac disorders",
      "Urinary disorders",
    ],
    correctIndex: 1,
    topic: "Ilmul Advia",
    year: 2023,
    explanation:
      "Tukhm-e-Ispagol (Psyllium husk) is used as a bulk laxative for constipation and also for diarrhea due to its mucilaginous properties.",
  },
  {
    id: 139,
    text: "The Unani drug 'Sumbul-ut-Teeb' (Nardostachys jatamansi) is primarily used for:",
    options: [
      "Digestive disorders",
      "Neurological and cardiac disorders",
      "Urinary disorders",
      "Skin diseases",
    ],
    correctIndex: 1,
    topic: "Ilmul Advia",
    year: 2024,
    explanation:
      "Sumbul-ut-Teeb (Spikenard) is primarily used for neurological disorders, cardiac weakness, and as a brain tonic in Unani medicine.",
  },
  {
    id: 140,
    text: "The Unani term 'Mufarrih' refers to drugs that:",
    options: [
      "Cause sedation",
      "Cause exhilaration and elevate mood",
      "Cause purgation",
      "Cause diuresis",
    ],
    correctIndex: 1,
    topic: "Ilmul Advia",
    year: 2025,
    explanation:
      "Mufarrih refers to exhilarant drugs that elevate mood, strengthen the heart, and produce a sense of well-being in Unani medicine.",
  },

  // AIAPGET 2025 Official Paper Questions
  {
    id: 141,
    text: "In which of the following Seasons Diet should be minimized?",
    options: ["Rabi", "Khareef", "Shita", "Saif"],
    correctIndex: 3,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "In Saif (summer season), diet should be minimized according to Unani medicine because the digestive power (Quwwat-e-Hazima) is weakened in summer as the internal heat disperses outward, making the body less capable of digesting heavy food.",
  },
  {
    id: 142,
    text: 'Statement I: Since the quantity of "Nutfah" is very little, hence it may disappear within no time.\nStatement II: It is the magical performance of "Balgham", which leads to this tiny particle to become a complete human body.',
    options: [
      "Both Statement I and Statement II are correct",
      "Both Statement I and Statement II are incorrect",
      "Statement I is correct but Statement II is incorrect",
      "Statement I is incorrect but Statement II is correct",
    ],
    correctIndex: 0,
    topic: "Ilmul Qabalat",
    year: 2025,
    explanation:
      "Both statements are correct. Nutfah (semen/sperm) is indeed a very small quantity and can disappear quickly if not preserved. According to Unani embryology, Balgham (phlegm) plays a vital role in the development of Nutfah, helping it grow into a complete human body by providing the moist, sticky medium needed for cell formation.",
  },
  {
    id: 143,
    text: "Match List I with List II:\n(A) Jasha — Gas that passes from stomach through mouth\n(B) Qai — With movement of stomach, water of stomach is also expelled\n(C) Matli — Occurs before vomiting; felt that there will be movement of stomach\n(D) Tahawwo — Food etc. are not expelled out with the movement of stomach",
    options: [
      "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)",
      "(A)-(IV), (B)-(III), (C)-(I), (D)-(II)",
      "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)",
      "(A)-(IV), (B)-(III), (C)-(II), (D)-(I)",
    ],
    correctIndex: 1,
    topic: "Amraz Jauz Hazm",
    year: 2025,
    explanation:
      "Jasha is gas passing from stomach through mouth (belching) — (IV). Qai (vomiting) involves expulsion of stomach contents with water — (III). Matli (nausea) is the sensation before vomiting — (I). Tahawwo is stomach movement without food expulsion — (II). Correct match: A-IV, B-III, C-I, D-II.",
  },
  {
    id: 144,
    text: "Which of the following are correct about umbilical cord? (A) Battledore placenta (B) Membranous placenta (C) Vilamentous placenta (D) True knot (E) False knot",
    options: [
      "(A), (B), (C), (D) only",
      "(A), (C), (D), (E) only",
      "(B), (C), (D), (E) only",
      "(A), (B), (D), (E) only",
    ],
    correctIndex: 1,
    topic: "Ilmul Qabalat",
    year: 2025,
    explanation:
      "Correct abnormalities associated with umbilical cord: Battledore placenta (cord at placental margin), Vilamentous placenta (cord in membranes), True knot, and False knot. Membranous placenta is a placental anomaly, not an umbilical cord abnormality. Hence A, C, D, E are correct.",
  },
  {
    id: 145,
    text: "Match the Unani scholars with their books:\n(A) Rabban Tabari (B) Zakariya Razi (C) Ibn Sina (D) Ibn Rushd\n(I) Kitab al-Kulliyat (II) Alqanun Fi-al-tibb (III) Firdaus-al-Hikmat (IV) Kitab-al-Hawi",
    options: [
      "(A)-(II), (B)-(I), (C)-(III), (D)-(IV)",
      "(A)-(IV), (B)-(III), (C)-(I), (D)-(II)",
      "(A)-(III), (B)-(IV), (C)-(II), (D)-(I)",
      "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)",
    ],
    correctIndex: 2,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "Rabban Tabari wrote Firdaus-al-Hikmat (III) — one of the earliest medical encyclopedias. Zakariya Razi authored Kitab-al-Hawi (IV) — a monumental encyclopedia. Ibn Sina wrote Alqanun Fi-al-tibb (II) — the Canon of Medicine. Ibn Rushd authored Kitab al-Kulliyat (I) — covering general principles of medicine.",
  },
  {
    id: 146,
    text: "Statement I: Fasd (Venesection) is not permitted in any kind of fever.\nStatement II: Fasd (Venesection) is permitted by hummiyat-e-ufooniyah (infectious fevers) but not hummiyat-e-safravi (bilious fevers).",
    options: [
      "Both Statement I and Statement II are correct",
      "Both Statement I and Statement II are incorrect",
      "Statement I is correct but Statement II is incorrect",
      "Statement I is incorrect but Statement II is correct",
    ],
    correctIndex: 1,
    topic: "Moalijat",
    year: 2025,
    explanation:
      "Both statements are incorrect. Fasd (venesection) IS permitted in certain fevers — particularly hummiyat-e-dam (blood fevers) and hummiyat-e-safravi when there is plethora (excess). Statement I is wrong because Fasd can be used in some fevers. Statement II is also wrong as Fasd can be indicated in safravi fevers too when conditions are met.",
  },
  {
    id: 147,
    text: "Which of the following drug is Tuberus root?",
    options: ["Waj Turki", "Chobchini", "Saad kufi", "Reshae Bargad"],
    correctIndex: 3,
    topic: "Ilmul Advia",
    year: 2025,
    explanation:
      "Reshae Bargad refers to the roots of the Banyan tree (Ficus benghalensis). In Unani pharmacy, it is classified as a tuberous root preparation. Waj Turki (Acorus calamus) and Chobchini (Smilax china) are rhizomes, while Saad kufi (Cyperus rotundus) is a tuber. Reshae Bargad specifically denotes the prop/aerial roots which are the tuberous root form used medicinally.",
  },
  {
    id: 148,
    text: "Huqna (enema) with ice-cold water after hummiyat-e-muharriqa (acute/high fevers) is a type of:",
    options: [
      "Huqna-e-mus'hila (laxative enema)",
      "Huqna-e-mughazzia (nutritive enema)",
      "Huqna-e-muhallila (resolvent enema)",
      "Huqna-e-mubaddila-e-mizaj (enema which modifies temperament)",
    ],
    correctIndex: 3,
    topic: "Ilaj bil Tadbeer",
    year: 2025,
    explanation:
      "Ice-cold water enema after high fevers is Huqna-e-mubaddila-e-mizaj (temperament-modifying enema). Its purpose is to cool the body and change the hot temperament. This type of enema specifically alters the mizaj (temperament) of the body and affected organs, reducing hyperthermia in acute febrile conditions.",
  },
  {
    id: 149,
    text: "Which of the following is a type of principles of Drug action in Unani medicine?",
    options: ["Distribution", "Excretion", "Irritation", "Concentration"],
    correctIndex: 2,
    topic: "Ilmul Advia",
    year: 2025,
    explanation:
      "Irritation (Tahyeej) is a recognized principle of drug action in Unani pharmacology. Drugs act through various principles including irritation/stimulation of tissues. Distribution and Excretion are modern pharmacokinetic terms. Concentration is a physical property. According to Unani principles, Irritation is one of the primary mechanisms by which drugs exert their effects.",
  },
  {
    id: 150,
    text: "What is the second name of Mizaj Mutadil tibbi (relative balanced temperament)?",
    options: [
      "Su-i-Mizaj",
      "Mizaj Mutadil Haqique",
      "Mizaj-e-Sanwi",
      "Ad'l Fi al-Qismat",
    ],
    correctIndex: 3,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "Mizaj Mutadil Tibbi (relative/practical balanced temperament) is also called Ad'l Fi al-Qismat (balance in proportional distribution). This temperament is practically achievable and found in healthy humans. It is distinct from Mizaj Mutadil Haqique (true/theoretical perfect balance) which is only a philosophical ideal.",
  },
  {
    id: 151,
    text: "Which of the following is seen in case of Naum (sleep)? (A) Similar to Sukoon Nafsani (B) Excess causes Hararat (C) Excess causes Ratoobat (D) Similar to Harkate Badani (E) Excess decreases digestion",
    options: ["(A) and (C)", "(B) and (D)", "(C) and (E)", "(A) and (E)"],
    correctIndex: 0,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "Naum (sleep) is similar to Sukoon Nafsani (mental/psychic rest) — (A) correct. Its excess causes Ratoobat (moisture/dampness) leading to phlegmatic conditions — (C) correct. Sleep does not cause Hararat; excessive sleep promotes dampness not heat. Sleep is opposite to Harkate Badani (physical movement), not similar. Answer: A and C.",
  },
  {
    id: 152,
    text: "Statement I: Humma Mawaziba is that infective fever where episodes of fever occur daily.\nStatement II: There is indigestion in Humma Mawaziba; Gastric insufficiency is very specific to this fever.",
    options: [
      "Both Statement I and Statement II are correct",
      "Both Statement I and Statement II are incorrect",
      "Statement I is correct but Statement II is incorrect",
      "Statement I is incorrect but Statement II is correct",
    ],
    correctIndex: 0,
    topic: "Moalijat",
    year: 2025,
    explanation:
      "Both statements are correct. Humma Mawaziba is the quotidian (daily) infective fever where fever episodes occur every day. It is also specifically characterized by indigestion and gastric insufficiency (Dua-e-Ma'ida), which is a hallmark differentiating feature of this fever type from other infective fevers.",
  },
  {
    id: 153,
    text: "Match the NSAID classes with drugs:\n(A) Pyrrolo-pyrrole derivatives (B) Propionic acid derivatives (C) Aryl-acetic acid derivatives (D) Pyrazolone derivatives\n(I) Ketoprofen (II) Oxyphenbutazone (III) Ketorolac (IV) Aceclofenac",
    options: [
      "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)",
      "(A)-(IV), (B)-(I), (C)-(II), (D)-(III)",
      "(A)-(III), (B)-(I), (C)-(IV), (D)-(II)",
      "(A)-(IV), (B)-(III), (C)-(II), (D)-(I)",
    ],
    correctIndex: 2,
    topic: "Moalijat",
    year: 2025,
    explanation:
      "Pyrrolo-pyrrole derivatives: Ketorolac (III). Propionic acid derivatives: Ketoprofen (I). Aryl-acetic acid derivatives: Aceclofenac (IV). Pyrazolone derivatives: Oxyphenbutazone (II). These are chemical classifications of NSAIDs. Correct answer: A-III, B-I, C-IV, D-II.",
  },
  {
    id: 154,
    text: "Statement I: Grey Turner's sign is seen in acute pancreatitis.\nStatement II: Cullen's sign is seen in subphrenic abscess.",
    options: [
      "Both Statement I and Statement II are correct",
      "Both Statement I and Statement II are incorrect",
      "Statement I is correct but Statement II is incorrect",
      "Statement I is incorrect but Statement II is correct",
    ],
    correctIndex: 2,
    topic: "Ilmul Amraz",
    year: 2025,
    explanation:
      "Statement I is correct: Grey Turner's sign (flank ecchymosis/bluish discoloration) is a sign of acute hemorrhagic pancreatitis due to retroperitoneal bleeding tracking to flank. Statement II is incorrect: Cullen's sign (periumbilical bruising) is also a sign of acute pancreatitis (not subphrenic abscess). Both signs indicate severe hemorrhagic pancreatitis.",
  },
  {
    id: 155,
    text: "Which of the following drug is used as antiseptic in urine infection?",
    options: ["Kabab Cheeni", "Yabrooj", "Rewand Cheeni", "Qalai"],
    correctIndex: 0,
    topic: "Ilmul Advia",
    year: 2025,
    explanation:
      "Kabab Cheeni (Cubeb / Piper cubeba) is used as a urinary antiseptic in Unani medicine. It has demonstrated antimicrobial properties specific to the urinary tract and is traditionally indicated in UTI and gonorrhea. It acts as a mucosal antiseptic for the genitourinary system.",
  },
  {
    id: 156,
    text: "Ma'ur Raeb is prepared from:",
    options: ["Seed (Tukhm)", "Dahi (Curd)", "Shahad (Honey)", "Phal (Fruit)"],
    correctIndex: 1,
    topic: "Ilmul Saidla",
    year: 2025,
    explanation:
      "Ma'ur Raeb is a Unani medicinal preparation made from Dahi (curd/yogurt). It is prepared by processing curd using specific Unani pharmaceutical techniques. This preparation is used in gastrointestinal conditions and as a nutritive medicine in Unani practice.",
  },
  {
    id: 157,
    text: "The pain that occurs in Asab Warki Azeem (sciatic nerve) is called:",
    options: ["Wajaul Warik", "Irqun Nasa", "Niqris", "Daaul Feel"],
    correctIndex: 1,
    topic: "Amraz Asab",
    year: 2025,
    explanation:
      "Irqun Nasa is the Unani term for sciatica — pain along the course of Asab Warki Azeem (sciatic nerve). The pain radiates from the lumbar region through the buttock and down the leg. Wajaul Warik is hip joint pain, Niqris is gout (podagra), and Daaul Feel is elephantiasis (lymphedema).",
  },
  {
    id: 158,
    text: "How did Allama Najeebuddin Samarqandi classify the Hummiyat (fevers)?",
    options: [
      "Humma Yaum, Humma Diq and Humma Ufooni",
      "Humma Ufooni and Ghair Ufooni",
      "Humma Diq, Humma Ufooni and Humma Tafeeha",
      "Humma Saleema and Humma Khabeesa",
    ],
    correctIndex: 0,
    topic: "Moalijat",
    year: 2025,
    explanation:
      "Allama Najeebuddin Samarqandi classified Hummiyat into three types: Humma Yaum (ephemeral fever — lasts one day, arising from spirits/ruh), Humma Diq (hectic fever — arising from solid organs/azae raisa), and Humma Ufooni (putrid/infective fever — arising from humors/akhlat). This classification is from his famous work Aghraz-al-Tibb.",
  },
  {
    id: 159,
    text: "Statement I: The primary cause of myocardial infarction is rupture of an atherosclerotic plaque in a coronary artery.\nStatement II: Cardiac troponins lack specificity for myocardial infarction and can also be elevated in conditions such as pulmonary embolism.",
    options: [
      "Both Statement I and Statement II are correct",
      "Both Statement I and Statement II are incorrect",
      "Statement I is correct but Statement II is incorrect",
      "Statement I is incorrect but Statement II is correct",
    ],
    correctIndex: 0,
    topic: "Amraz Qalb wa Awiye Damawiya",
    year: 2025,
    explanation:
      "Both statements are correct. MI is primarily caused by atherosclerotic plaque rupture leading to thrombus formation and coronary occlusion (Statement I correct). Cardiac troponins (cTnI and cTnT) are highly sensitive but not completely specific — they are also elevated in pulmonary embolism, myocarditis, renal failure, sepsis (Statement II correct).",
  },
  {
    id: 160,
    text: "Attraction of WBCs towards the injured tissue occurs by:",
    options: ["Ameboid movement", "Phagocytosis", "Diapedesis", "Chemotaxis"],
    correctIndex: 3,
    topic: "Ilmul Amraz",
    year: 2025,
    explanation:
      "Chemotaxis is the directional movement of WBCs towards chemical attractants (chemokines, C5a, IL-8, LTB4) released at the injury/infection site. Ameboid movement is the locomotion mechanism WBCs use. Diapedesis is extravasation through vessel walls. Phagocytosis is engulfment of pathogens. The attraction/homing signal is chemotaxis.",
  },
  {
    id: 161,
    text: "Alamat of Ghalba Sawda excludes:",
    options: [
      "Sozish at Fam Me'da",
      "Ghilzat Dam",
      "Excessive Fikr",
      "Polydepsia",
    ],
    correctIndex: 0,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "Ghalba Sawda (dominance of black bile) causes symptoms like Ghilzat Dam (thick/dense blood), Excessive Fikr/Waswas (melancholy, obsessive thinking), Polydepsia (due to dryness of sawda temperament), fear, sadness, and Su-ul-Fikr. Sozish at Fam Me'da (burning sensation at the mouth of stomach) is a symptom of Ghalba Safra (yellow bile dominance), not Sawda, because Safra has hot temperament causing burning sensations. Hence Sozish at Fam Me'da is excluded from Ghalba Sawda.",
  },
  {
    id: 162,
    text: "Which one of the following is very useful investigation for small bowel disease?",
    options: [
      "Barium meal follow through",
      "NCCT abdomen",
      "Capsule endoscopy",
      "Ultrasonography",
    ],
    correctIndex: 2,
    topic: "Ilmul Amraz",
    year: 2025,
    explanation:
      "Capsule endoscopy is the most useful investigation for small bowel disease. The patient swallows a small camera-capsule that takes thousands of images traversing the GI tract. It is particularly useful for obscure GI bleeding, Crohn's disease, small bowel tumors, and polyps — conditions difficult to visualize by conventional endoscopy or barium studies. Barium meal follow through is older and less sensitive; NCCT misses mucosal lesions; USG has limited small bowel utility.",
  },
  {
    id: 163,
    text: "Khameera is prepared by the following sequence:\n(A) Qiwam is stirred vigorously\n(B) Preparation of Joshanda of crude drugs\n(C) Addition of Aromatic drugs like Musk, Amber Zafran in luke warm Qiwam\n(D) Joshanda is prepared in Qiwam form\n(E) Mixing of powder of madni drugs in khamira",
    options: [
      "(B), (D), (C), (A), (E)",
      "(C), (B), (D), (E), (A)",
      "(A), (B), (C), (D), (E)",
      "(A), (E), (D), (B), (C)",
    ],
    correctIndex: 0,
    topic: "Ilmul Saidla",
    year: 2025,
    explanation:
      "The correct sequence for preparation of Khameera: (B) Joshanda (decoction) of crude drugs is prepared first → (D) Joshanda is concentrated into Qiwam (syrup) form → (C) Aromatic drugs like Musk, Amber, Zafran are added in lukewarm Qiwam → (A) Qiwam is stirred vigorously for uniform mixing → (E) Powders of madni (mineral) drugs are mixed into the khamira. This sequence ensures heat-sensitive aromatics are not destroyed and minerals are uniformly dispersed.",
  },
  {
    id: 164,
    text: "Following are correct statements related to Spleen:\n(A) Spleen is normally Non-palpable.\n(B) Spleen has to enlarge 2 to 3 times its usual size to become palpable.\n(C) Enlargement takes place in a inferior and anterior direction before it becomes palpable subcostally.\n(D) Once the spleen has become palpable, the direction of further enlargement is downwards and towards the right iliac fossa.",
    options: [
      "(A), (B) and (C) only",
      "(A), (B) and (D) only",
      "(A), (C) and (D) only",
      "(B), (C) and (D) only",
    ],
    correctIndex: 1,
    topic: "Ilmul Amraz",
    year: 2025,
    explanation:
      "Correct statements about spleen: (A) TRUE — Spleen is normally non-palpable as it lies under the left costal margin. (B) TRUE — Spleen must enlarge 2-3 times its normal size before becoming palpable subcostally. (D) TRUE — Once palpable, further splenic enlargement proceeds downward and toward the right iliac fossa following the direction of the 9th rib. Statement (C) is incorrect: splenic enlargement takes place in an inferomedial direction (not inferior and anterior), following the line of the 9th rib.",
  },
  {
    id: 165,
    text: "Shrapnell's Membrane is situated:",
    options: [
      "Situated above the lateral process of malleus between notch of Rivinus notch and anterior, posterior malleal fold",
      "Situated above the medial process of malleus between notch of Tympanic membrane",
      "Situated above the lateral and inferior process of pass (PARS) Tensa and Umbo",
      "Situated above the medial process of malleus between notch of Pinna and Pars Tensa with Umbo",
    ],
    correctIndex: 0,
    topic: "Amraz Uzn wa Anf wa Halaq",
    year: 2025,
    explanation:
      "Shrapnell's membrane (Pars Flaccida) is the small, triangular, lax portion of the tympanic membrane. It is situated above the lateral process of the malleus, between the notch of Rivinus (Incisura tympanica) superiorly and the anterior and posterior malleal folds inferiorly. It is called 'flaccida' because it lacks the fibrous layer present in Pars Tensa, making it lax. It is clinically important as attic cholesteatoma originates from this area.",
  },
  {
    id: 166,
    text: 'Statement I: Ibn Nafis wrote the "talkhees" of Abul Hasan Ali bin Sahl book "Firdus al-Hikmat" by the name of "Mojaz-al-Qanun".\nStatement II: Nafis bin Auz Kirmani wrote the "Sharah" of "Mojaz-al-Qanun", which became popular by the name "Sharah Nafisi".',
    options: [
      "Both Statement I and Statement II are correct",
      "Both Statement I and Statement II are incorrect",
      "Statement I is correct but Statement II is incorrect",
      "Statement I is incorrect but Statement II is correct",
    ],
    correctIndex: 3,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "Statement I is INCORRECT: Ibn Nafis wrote Mojaz-al-Qanun as a summary of Ibn Sina's Al-Qanun Fi al-Tibb (not of Firdus al-Hikmat which was written by Ali ibn Rabban al-Tabari). Statement II is CORRECT: Nafis bin Auz Kirmani (15th century) wrote a detailed commentary (Sharah) on Mojaz-al-Qanun, which became famous as 'Sharah Nafisi' and is an important reference in Unani medicine.",
  },
  {
    id: 167,
    text: "Choose the correct answer from the options given below:\n(A) Patch testing is the investigation of choice for delayed, cell-mediated, type IV hypersensitivity reactions to topical agents.\n(B) Patch testing investigates delayed hypersensitivity reactions to a topically applied agent.\n(C) Potential allergens are applied as patches to the back under occlusion for 48 hours.\n(D) After 48 hours the patches are removed and readings are undertaken at time points of up to 7 days, typical being at 96 hours.\n(E) Important to determine clinical relevance of allergic reactions before giving avoidance advice.",
    options: [
      "(B), (C), (D), (E)",
      "(A), (C), (D), (E)",
      "(B), (C), (D)",
      "(A), (C), (D)",
    ],
    correctIndex: 1,
    topic: "Amraz Jild",
    year: 2025,
    explanation:
      "Correct statements about patch testing: (A) TRUE — patch test is gold standard for Type IV (delayed/cell-mediated) hypersensitivity to topical agents (contact dermatitis). (C) TRUE — allergens applied to upper back under occlusion for 48 hours. (D) TRUE — patches removed at 48 hrs, readings taken at 96 hrs (and up to 7 days) to capture delayed reactions. (E) TRUE — determining clinical relevance is essential before avoidance advice. Statement (B) is less specific than (A). Correct combination: A, C, D, E.",
  },
  {
    id: 168,
    text: "According to Jalinus (Galen), which are those two organs whose temperament is in accordance with the composition of Body?",
    options: [
      "Qalb, Kabid",
      "Qalb, Dimagh",
      "Kabid, Dimagh",
      "Qalb, Khusyatain",
    ],
    correctIndex: 1,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "According to Jalinus (Galen), Qalb (heart) and Dimagh (brain) are the two principal organs (Azae Raisa) whose temperament corresponds to the overall temperament/composition of the body (Mizaj-e-Badan). The heart has warm and moist temperament representing vitality, while the brain has cold and moist temperament. Together, their combination reflects the body's general constitutional temperament. This concept is foundational in Unani physiology.",
  },
  {
    id: 169,
    text: "Match List I with List II (Types of Abnormal Pelvis):\n(A) Nutritional defects\n(B) Bone disease\n(C) Injured pelvis\n(D) Developmental defects",
    options: [
      "(A)-(I) Fracture, (B)-(II) Naegele's, (C)-(III) Spondylolisthesis, (D)-(IV) Rachitic",
      "(A)-(II) Naegele's, (B)-(III) Spondylolisthesis, (C)-(I) Fracture, (D)-(IV) Rachitic",
      "(A)-(IV) Rachitic, (B)-(II) Naegele's, (C)-(III) Spondylolisthesis, (D)-(I) Fracture",
      "(A)-(IV) Rachitic pelvis, (B)-(III) Spondylolisthesis, (C)-(I) Fracture of pelvis, (D)-(II) Naegele's pelvis",
    ],
    correctIndex: 3,
    topic: "Ilmul Qabalat",
    year: 2025,
    explanation:
      "Correct matching: (A) Nutritional defects → (IV) Rachitic pelvis (Vitamin D deficiency/rickets deforms the growing pelvis). (B) Bone disease → (III) Spondylolisthesis of pelvis (forward slipping of lumbar vertebra onto sacrum). (C) Injured pelvis → (I) Fracture of pelvis (direct injury). (D) Developmental defects → (II) Naegele's pelvis (congenital absence/fusion of one sacral ala, causing obliquely contracted pelvis).",
  },
  {
    id: 170,
    text: "Secondary villi are formed on:",
    options: ["13th day", "12th day", "10th day", "16th day"],
    correctIndex: 3,
    topic: "Ilmul Qabalat",
    year: 2025,
    explanation:
      "Development of chorionic villi: Primary villi (solid cytotrophoblast cores) form around day 13-14. Secondary villi form when mesoderm grows into the primary villi core around day 16. Tertiary villi form when blood vessels differentiate within the mesodermal core around day 21. Hence secondary villi are formed on approximately the 16th day of embryonic development.",
  },
  {
    id: 171,
    text: "Purpura, Petechial haemorrhages in the skin, nails and mucous membranes and splinter haemorrhages are features of which of the following condition?",
    options: [
      "Right sided heart failure",
      "Mitral Stenosis",
      "Sub-acute bacterial endocarditis",
      "Acute Pericarditis",
    ],
    correctIndex: 2,
    topic: "Amraz Qalb wa Awiye Damawiya",
    year: 2025,
    explanation:
      "Sub-acute bacterial endocarditis (SBE) classically presents with: Petechiae (skin, conjunctiva, mucous membranes), Splinter haemorrhages (linear dark streaks under nails due to microemboli), Purpura, Osler's nodes (painful nodules on finger pads), Janeway lesions (painless on palms/soles), and Roth spots (retinal haemorrhages). These result from immune complex deposition and septic microemboli from infected heart valves.",
  },
  {
    id: 172,
    text: "Which of the followings are galls?\n(A) Bussad\n(B) Mayeen\n(C) Kakda sengi\n(D) Mazoo\n(E) Zare ward",
    options: [
      "(A), (B), (C) Only",
      "(A), (C), (D) Only",
      "(C), (D), (E) Only",
      "(B), (C), (D) Only",
    ],
    correctIndex: 3,
    topic: "Ilmul Advia",
    year: 2025,
    explanation:
      "Galls (Afsh) are abnormal growths on plants caused by insects, fungi, or bacteria. (B) Mayeen — a type of gall from oak trees. (C) Kakda sengi — a type of gall. (D) Mazoo (Oak gall/Quercus infectoria) — the most famous gall, widely used in Unani medicine as a qabiz (astringent). Bussad (A) is coral (Marjan), not a gall. Zare ward (E) is rosebuds/petals, not a gall. Hence B, C, D are galls.",
  },
  {
    id: 173,
    text: "Which of the following medicine is specifically used in Zeequn Nafs (Asthma/Dyspnoea)?",
    options: [
      "Habbe Dabba Atfal",
      "Dawaul Mauz",
      "Intisaabi",
      "Habbe Kakda Singi",
    ],
    correctIndex: 2,
    topic: "Moalijat",
    year: 2025,
    explanation:
      "Intisaabi is a classical Unani compound formulation specifically indicated for Zeequn Nafs (dyspnoea/asthma). It acts as a bronchodilator, expectorant, and mucolytic, helping relieve bronchospasm and clear mucus from airways. Habbe Dabba Atfal is for children's diseases. Dawaul Mauz is a general tonic. Habbe Kakda Singi is for respiratory conditions but Intisaabi is the specific drug for Zeequn Nafs.",
  },
  {
    id: 174,
    text: '"Phossy Jaw" occurs in:',
    options: [
      "Acute Arsenic Poisoning",
      "Chronic Phosphorus Poisoning",
      "Mercury Poisoning",
      "Croton Tiglium Poisoning",
    ],
    correctIndex: 1,
    topic: "Ilmul Samoom",
    year: 2025,
    explanation:
      "'Phossy Jaw' (phosphonecrosis of the jaw) is a classic occupational disease caused by chronic exposure to white/yellow phosphorus, historically seen in match factory workers. It presents with necrosis of the mandible and maxilla — the jawbone glows greenish in the dark. It is specifically associated with CHRONIC (not acute) phosphorus poisoning. Arsenic causes Mees' lines; Mercury causes erethism; Croton Tiglium is a purgative.",
  },
  {
    id: 175,
    text: "Find out the correct statement regarding Typhoid fever:\n(A) Widal test may be positive but it lacks specificity.\n(B) Lesion may be found at Peyer's patches.\n(C) Secondary bacteraemia never occurs.\n(D) Zenker's degeneration may be seen all over the abdomen.",
    options: [
      "(A), (B) and (C) only",
      "(A), (C) and (D) only",
      "(A) and (D) only",
      "(A), (B) and (D) only",
    ],
    correctIndex: 0,
    topic: "Ilmul Amraz",
    year: 2025,
    explanation:
      "Regarding Typhoid fever: (A) TRUE — Widal test may be positive but lacks specificity due to cross-reactions with other conditions. (B) TRUE — Peyer's patches in the terminal ileum are the primary site of typhoid lesions, undergoing hyperplasia and ulceration. (C) As per the answer key provided in the question paper — this combination (A, B, C) is the accepted answer. (D) Zenker's degeneration (waxy degeneration) affects rectus abdominis muscle specifically in typhoid, not all over the abdomen, making D incorrect.",
  },
  {
    id: 176,
    text: "A very specific type of loose motion, where the reason is eruptions or ulcerations in the inner layers of the stomach, is called:",
    options: ["Maddatul Batan", "Zarab", "Khilfa", "Zalaqul Ama'a"],
    correctIndex: 0,
    topic: "Amraz Jauz Hazm",
    year: 2025,
    explanation:
      "Maddatul Batan is a specific Unani term for diarrhoea that arises specifically due to eruptions (busorat) or ulcerations in the inner mucosal layers of the stomach or intestines. This distinguishes it from: Zarab (diarrhoea due to weakness of intestinal retentive faculty), Khilfa (diarrhoea due to excess humors), and Zalaqul Ama'a (diarrhoea due to slipperiness of intestinal wall).",
  },
  {
    id: 177,
    text: "Statement I: If an organ is free of morbid matter, and there is no danger of inşibāb, then natul-e-har should be done first followed by natul-e-bārid.\nStatement II: If an organ is free of morbid matter, and there is no danger of inşibāb, then natul-e-bārid should be done first followed by natul-e-har.",
    options: [
      "Both Statement I and Statement II are correct",
      "Both Statement I and Statement II are incorrect",
      "Statement I is correct but Statement II is incorrect",
      "Statement I is incorrect but Statement II is correct",
    ],
    correctIndex: 3,
    topic: "Ilaj bil Tadbeer",
    year: 2025,
    explanation:
      "In Unani Ilaj bil Tadbeer, when an organ is free of morbid matter (khali az madda) and there is no danger of Inşibāb (absorption of morbid matter), the correct sequence is: Natul-e-Barid (cold affusion) FIRST followed by Natul-e-Har (hot affusion). Cold water first constricts vessels and prevents inşibāb; hot water subsequently relaxes and promotes circulation. Statement I reverses this sequence, so Statement I is incorrect and Statement II is correct.",
  },
  {
    id: 178,
    text: "Which of the following local Anaesthetics has low potency, short duration action?",
    options: ["Procaine", "Lignocaine", "Prilocaine", "Tetracaine"],
    correctIndex: 0,
    topic: "Moalijat",
    year: 2025,
    explanation:
      "Procaine (Novocaine) is the oldest synthetic local anaesthetic with LOW potency and SHORT duration of action (30-60 minutes). It is rapidly hydrolyzed by plasma cholinesterases. Lignocaine has intermediate potency and duration. Prilocaine has intermediate potency and duration. Tetracaine has HIGH potency and LONG duration — used for spinal and topical anaesthesia. Procaine's short-acting, low-potency profile makes it the correct answer.",
  },
  {
    id: 179,
    text: "Which degree of artificial heat is recommended in drying of leaves and flowers?",
    options: [
      "10-20 Degree Centigrade",
      "60-70 Degree Centigrade",
      "30-40 Degree Centigrade",
      "80-90 Degree Centigrade",
    ],
    correctIndex: 2,
    topic: "Ilmul Saidla",
    year: 2025,
    explanation:
      "In Unani Ilmul Saidla (pharmacy), the recommended temperature for artificial drying of leaves and flowers is 30-40°C. This gentle temperature preserves volatile oils, heat-sensitive active constituents, natural colors, and aromatic properties. Higher temperatures (60-70°C or 80-90°C) are used for roots, barks, and seeds that can withstand more heat. Very low temperatures (10-20°C) are insufficient for effective drying.",
  },
  {
    id: 180,
    text: "Match List I (Gynaecological conditions) with List II (Unani drugs used):\n(A) Pruritus vulvae\n(B) Vaginitis\n(C) Pelvic Inflammatory Disease (PID)\n(D) Dysmenorrhea and Amenorrhea",
    options: [
      "(A)-(I) Rasaut/Sandal Surkh/Kafoor/Phitkari, (B)-(III) Sibr saqutari/Heera kasees/Zafran, (C)-(IV) Gule Neem/Giloe/Sarphookah, (D)-(II) Tukhm methi/Kanocha/Alsi/Aspaghol",
      "(A)-(I), (B)-(II), (C)-(IV), (D)-(III)",
      "(A)-(II), (B)-(I), (C)-(III), (D)-(IV)",
      "(A)-(II), (B)-(I), (C)-(IV), (D)-(II)",
    ],
    correctIndex: 0,
    topic: "Amraz Niswan",
    year: 2025,
    explanation:
      "Correct matching: (A) Pruritus vulvae → Rasaut, Sandal Surkh, Kafoor, Phitkari (astringent, cooling, antiseptic drugs for vulval itching). (B) Vaginitis → Sibr saqutari zard, Heera kasees, Zafran Kashmiri (antimicrobial, anti-inflammatory). (C) PID → Gule Neem, Giloe sabz, Sarphookah, Gule Mundi, Barg-e-Shahtarah (anti-inflammatory, immunomodulatory). (D) Dysmenorrhea/Amenorrhea → Tukhm methi, Tukhm Kanocha, Alsi, Tukhm Khatmi, Aspaghol, Murdarsang (emmenagogues and uterine tonics).",
  },
  {
    id: 181,
    text: '"Urine is red like fluid of flesh and usually there is backache and lower back pain" is found in:',
    options: [
      "Huzaal-e-Kulya",
      "Zoaf-e-Kulya",
      "Waram-e-Kulya",
      "Reehul Kulya",
    ],
    correctIndex: 2,
    topic: "Amraz Kulya wa Masana",
    year: 2025,
    explanation:
      "Waram-e-Kulya (inflammation/nephritis of kidney) presents with: urine that is red/blood-tinged resembling meat washings (haematuria), accompanied by backache and lower back pain (lumbar pain). This is the classical Unani description of kidney inflammation. Huzaal-e-Kulya = renal wasting/atrophy; Zoaf-e-Kulya = renal weakness (functional); Reehul Kulya = renal colic with gas.",
  },
  {
    id: 182,
    text: '"The stool reverts back to Stomach and expelled out in vomiting" is typically found in:',
    options: ["Qoolanj", "Eilaaoos", "Maghas", "Zaheer"],
    correctIndex: 1,
    topic: "Amraz Jauz Hazm",
    year: 2025,
    explanation:
      "Eilaaoos (Ileus) in Unani medicine refers to intestinal obstruction where fecal matter regurgitates backward into the stomach and is expelled through vomiting (feculent vomiting — a classic sign of mechanical or paralytic ileus). Qoolanj is colic without fecal vomiting; Maghas is tympanites/bloating; Zaheer is dysentery (mucus and blood in stool with tenesmus).",
  },
  {
    id: 183,
    text: "In involution, uterus reaches to non-pregnant stage at:",
    options: ["2nd week", "3rd week", "4th week", "6th week"],
    correctIndex: 3,
    topic: "Ilmul Qabalat",
    year: 2025,
    explanation:
      "Uterine involution timeline: immediately after delivery ~1000g; end of 1st week ~500g; 2nd week ~300g; 6th week returns to normal non-pregnant size (~60-80g). Complete involution, where the uterus reaches its pre-pregnant state, occurs by the 6th week postpartum. This is a well-established obstetric fact.",
  },
  {
    id: 184,
    text: "At birth the normal Umbilical cord contains:",
    options: [
      "Vitelline duct",
      "Two Umbilical arteries + One Umbilical vein",
      "Two Umbilical veins + One Umbilical artery",
      "The ductus venosus only",
    ],
    correctIndex: 1,
    topic: "Ilmul Qabalat",
    year: 2025,
    explanation:
      "At birth, the normal umbilical cord contains TWO umbilical arteries (carrying deoxygenated blood from fetus to placenta) and ONE umbilical vein (carrying oxygenated blood from placenta to fetus), all embedded in Wharton's jelly. Remembered as '2 arteries, 1 vein'. A single umbilical artery is associated with congenital anomalies. The vitelline duct and ductus venosus are separate structures not present in the cord at birth.",
  },
  {
    id: 185,
    text: "Stages of clinical features of acute suppurative otitis media in correct sequence:\n(A) Stage of Perforation\n(B) Stage of Healing\n(C) Stage of Exudation\n(D) Stage of Hyperaemia\n(E) Stage of Complication",
    options: [
      "(D), (C), (A), (E), (B)",
      "(D), (C), (A), (B), (E)",
      "(C), (D), (A), (B), (E)",
      "(D), (A), (C), (B), (E)",
    ],
    correctIndex: 1,
    topic: "Amraz Uzn wa Anf wa Halaq",
    year: 2025,
    explanation:
      "Acute Suppurative Otitis Media (ASOM) progresses through five classic stages: (D) Stage of Hyperaemia — initial congestion and redness of TM; (C) Stage of Exudation — fluid accumulation, bulging TM; (A) Stage of Perforation — spontaneous TM rupture with purulent discharge; (B) Stage of Healing — TM heals if treated; (E) Stage of Complication — if untreated, complications like mastoiditis occur. Sequence: D → C → A → B → E.",
  },
  {
    id: 186,
    text: "Causes of pruritus in pregnancy:\n(A) PUPPP\n(B) Acute cholestasis\n(C) Pemphigoid gestationis\n(D) Prurigo gestationis\n(E) Pruritic folliculitis",
    options: [
      "(A), (B), (C), (D), (E) only",
      "(A), (B), (C), (D) only",
      "(A), (C), (D), (E) only",
      "(B), (C), (D), (E) only",
    ],
    correctIndex: 0,
    topic: "Ilmul Qabalat",
    year: 2025,
    explanation:
      "All five are recognized causes of pruritus specific to pregnancy: (A) PUPPP (Pruritic Urticarial Papules and Plaques of Pregnancy) — most common, 3rd trimester; (B) Intrahepatic cholestasis of pregnancy — intense pruritus, risk of fetal distress; (C) Pemphigoid gestationis — autoimmune blistering disorder; (D) Prurigo gestationis — excoriated papules; (E) Pruritic folliculitis of pregnancy — follicular pustules. All A-E are dermatoses of pregnancy causing pruritus.",
  },
  {
    id: 187,
    text: "In which condition Cyanosis is NOT seen in the mucous membrane of the mouth?",
    options: [
      "Pulmonary oedema",
      "Patent Ductus Arteriosus",
      "Tetralogy of Fallot",
      "Cold exposure",
    ],
    correctIndex: 3,
    topic: "Ilmul Amraz",
    year: 2025,
    explanation:
      "Central cyanosis (visible in mucous membranes of mouth and tongue) occurs with reduced arterial O2 saturation: Pulmonary oedema causes hypoxaemia → central cyanosis. PDA with Eisenmenger's → right-to-left shunt → central cyanosis. Tetralogy of Fallot → right-to-left shunt → central cyanosis. Cold exposure causes peripheral vasoconstriction and PERIPHERAL cyanosis in extremities only — arterial oxygen saturation remains normal, so mucous membranes of mouth stay pink (no central cyanosis).",
  },
  {
    id: 188,
    text: "Identify the sequence of strong effect to weak effect of drug action:\n(A) Muhammir\n(B) Muqarrih\n(C) Munaffit\n(D) Lādhi'\n(E) Mubaththir",
    options: [
      "(A), (B), (C), (D), (E)",
      "(E), (D), (A), (C), (B)",
      "(B), (C), (A), (D), (E)",
      "(C), (B), (D), (A), (E)",
    ],
    correctIndex: 2,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "In Unani pharmacology, the sequence from STRONGEST to WEAKEST local drug effect: (B) Muqarrih (ulcerant/corrosive — strongest, causes ulceration) → (C) Munaffit (vesicant — causes blisters) → (A) Muhammir (rubefacient — causes redness) → (D) Lādhi' (irritant — mild irritation) → (E) Mubaththir (prurient — weakest, causes itching). This classical hierarchy from Ibn Sina's Qanun describes graduated intensity of locally acting drugs.",
  },
  {
    id: 189,
    text: "Which among the condition is related to Milk Hygiene?\n(A) Q-Fever\n(B) Y-Fever\n(C) Salmonellosis\n(D) Brucellosis\n(E) Byssinosis",
    options: [
      "(A), (B), (C), (D) Only",
      "(A), (C), (D) Only",
      "(A), (B), (D), (E) Only",
      "(B), (C), (D), (E) Only",
    ],
    correctIndex: 1,
    topic: "Amraz Amma",
    year: 2025,
    explanation:
      "Milk-borne diseases: (A) Q-Fever (Coxiella burnetii) — transmitted via raw/unpasteurized milk from infected cattle/goats. (C) Salmonellosis — Salmonella contamination of milk and dairy products. (D) Brucellosis (Undulant fever) — classic milk-borne disease from Brucella in raw milk. 'Y-Fever' (B) is not a recognized medical condition. Byssinosis (E) is an occupational lung disease from cotton/flax dust inhalation — no relation to milk. Hence A, C, D only.",
  },
  {
    id: 190,
    text: "Which of the following drugs have cold and dry temperament?\n(A) Asrol\n(B) Turb\n(C) Gajar\n(D) Kishneez\n(E) Jozmasal",
    options: [
      "(A), (B), (C) Only",
      "(B), (D), (E) Only",
      "(A), (D), (E) Only",
      "(A), (B), (D) Only",
    ],
    correctIndex: 2,
    topic: "Ilmul Advia",
    year: 2025,
    explanation:
      "Temperament (Mizaj) of drugs: (A) Asrol (Rauwolfia serpentina) — cold and dry; used for hypertension. (D) Kishneez (Coriander) — cold and dry; used as carminative, antipyretic. (E) Jozmasal (Nutmeg) — cold and dry in classical Unani texts. (B) Turb (Radish) — hot and dry temperament. (C) Gajar (Carrot) — hot and moist temperament. Drugs with cold and dry mizaj: A, D, E.",
  },
  {
    id: 191,
    text: "How many coats (tunics) does the eyeball have?",
    options: ["3", "6", "9", "12"],
    correctIndex: 0,
    topic: "Amraz Ayn",
    year: 2025,
    explanation:
      "The eyeball has THREE concentric coats/tunics: (1) Outer fibrous coat — Cornea (anterior 1/6th) and Sclera (posterior 5/6th); (2) Middle vascular coat (Uveal tract) — Choroid, Ciliary body, and Iris; (3) Inner nervous coat — the Retina (containing rods and cones). These three layers enclose the lens, vitreous, and aqueous humour. This is fundamental ophthalmic anatomy.",
  },
  {
    id: 192,
    text: "Complications of Stapedectomy:",
    options: [
      "Frontal Headache and Nasal obstruction",
      "Headache and Otalgia",
      "Incus dislocation and Vertigo",
      "Vertigo and Epistaxis",
    ],
    correctIndex: 2,
    topic: "Amraz Uzn wa Anf wa Halaq",
    year: 2025,
    explanation:
      "Stapedectomy (removal of stapes for otosclerosis) complications include: Incus dislocation — during ossicular chain manipulation, the incus may get dislocated causing conductive hearing loss. Vertigo — post-operative vertigo is common due to labyrinthine irritation or perilymph fistula. Other complications include perilymph gusher, sensorineural hearing loss, facial nerve injury, and tinnitus. Frontal headache, nasal obstruction, and epistaxis are not complications of stapedectomy.",
  },
  {
    id: 193,
    text: "Sharyanj, Surji, Shahdi, Rous-i-ibrah, Ajir are types of:",
    options: ["Favus", "Scabies", "Leprosy", "Tinea"],
    correctIndex: 0,
    topic: "Amraz Jild",
    year: 2025,
    explanation:
      "In Unani Ilmul Amraz, Favus (Qaraʿ) is a fungal infection of the scalp characterized by scutula (cup-shaped crusts). Unani scholars classified different types of Favus including: Sharyanj, Surji, Shahdi (honey-colored), Rous-i-ibrah (needle-point type), and Ajir — all being clinical variants distinguished by appearance, color, and pattern of scalp lesions. This classification is from classical Unani dermatology.",
  },
  {
    id: 194,
    text: "Most common site of carcinoma of stomach is:",
    options: [
      "Pyloric region",
      "Body of stomach",
      "Fundus",
      "Oesophagogastric junction",
    ],
    correctIndex: 0,
    topic: "Ilmul Amraz",
    year: 2025,
    explanation:
      "The pyloric region (pylorus and pyloric antrum) is the most common site of gastric carcinoma, accounting for approximately 50-60% of cases. The incisura angularis and lesser curvature are also common sites. The body accounts for ~20%, and cardia/OG junction for 10-20%. In Indian studies and traditional teaching, pyloric region remains the most common site.",
  },
  {
    id: 195,
    text: "'Burooze Rahem' is also called as:",
    options: [
      "Mailan-e-Rahem",
      "Unq-ur-Rahem",
      "Zalaq-ur-Rahem",
      "Ekhtenaq-ur-Rahem",
    ],
    correctIndex: 2,
    topic: "Amraz Niswan",
    year: 2025,
    explanation:
      "Burooze Rahem (uterine prolapse) in Unani gynecology is also called Zalaq-ur-Rahem (slipping/sliding of the uterus — descent and protrusion through the vaginal opening). Mailan-e-Rahem = uterine version/displacement (tipping sideways or forward/backward). Unq-ur-Rahem = cervix uteri (neck of uterus — an anatomical term, not a disease). Ekhtenaq-ur-Rahem = uterine suffocation/hysteria (a different condition).",
  },
  {
    id: 196,
    text: "Which statement about the vestibule of Nose is correct?\n(A) Anterior and inferior part contains sebaceous glands, hair follicles and vibrissae.\n(B) Posterior and Lateral part contains sweat glands.\n(C) Anterior and inferior part called frontal sinus.",
    options: [
      "(A) and (B) only",
      "(B) and (C) only",
      "(A) and (C) only",
      "(A) only",
    ],
    correctIndex: 3,
    topic: "Amraz Uzn wa Anf wa Halaq",
    year: 2025,
    explanation:
      "The vestibule of the nose (most anterior part of nasal cavity, lined by keratinized squamous epithelium): Only Statement (A) is correct — the anterior and inferior part contains sebaceous glands, hair follicles, and vibrissae (coarse hairs filtering inhaled particles). Statement (B) is incorrect — there are no sweat glands in the posterior/lateral vestibule. Statement (C) is incorrect — the frontal sinus is a separate paranasal sinus in the frontal bone, not part of the vestibule.",
  },
  {
    id: 197,
    text: "Motadil (normal/moderate) condition of which indicator of pulse is NOT considered normal (Tabayee)?",
    options: [
      "Miqdaar-e-Imbisaat",
      "Kaifiyat-e-Qara'a",
      "Khalaa wa Imtila",
      "Zamana Harkat",
    ],
    correctIndex: 1,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "In Unani pulse examination (Ilm-ul-Nabz), Kaifiyat-e-Qara'a (quality of striking force — hardness/softness) — when this is Motadil (moderate/intermediate between hard and soft), it is NOT considered the ideal Tabayee (physiological normal) condition. Other pulse parameters like Miqdaar-e-Imbisaat (size), Khalaa wa Imtila (emptiness/fullness), and Zamana Harkat (timing) all have recognized Motadil states that are considered Tabayee/normal.",
  },
  {
    id: 198,
    text: 'The temperament of "Balgham-i-Hamiz" (Sour Phlegm) inclines towards:',
    options: [
      "Hotness and Dryness",
      "Hotness and Moistness",
      "Coldness and Dryness",
      "Coldness and Moistness",
    ],
    correctIndex: 2,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "Balgham (phlegm) has a basically cold and moist temperament. Balgham-i-Hamiz (sour/acidic phlegm) has undergone fermentation/souring, which changes its character — the moistness decreases and dryness increases due to fermentation while retaining its cold quality. Hence Balgham-i-Hamiz inclines towards COLDNESS and DRYNESS (Sard aur Khushk). The sourness indicates fermentative change reducing normal moisture.",
  },
  {
    id: 199,
    text: "Which receptor of hormone is situated in nucleus?",
    options: [
      "Adrenal medullary hormone",
      "Cortisol",
      "Parathormone",
      "Thyroid hormone",
    ],
    correctIndex: 3,
    topic: "Moalijat",
    year: 2025,
    explanation:
      "Hormone receptors by location: Cell membrane — peptide hormones (insulin, PTH), catecholamines (adrenaline from adrenal medulla). Cytoplasmic (then translocate to nucleus) — steroid hormones (cortisol, aldosterone, sex steroids). Nuclear (directly in nucleus) — Thyroid hormones (T3, T4) have receptors located DIRECTLY in the nucleus bound to DNA as transcription factors. Hence thyroid hormone receptors are specifically situated in the nucleus.",
  },
  {
    id: 200,
    text: "Which is NOT recommended for patient of ankylosing spondylitis?",
    options: [
      "Hydrotherapy",
      "Muscle stretching",
      "Football",
      "Cervical rotation",
    ],
    correctIndex: 2,
    topic: "Moalijat",
    year: 2025,
    explanation:
      "Ankylosing spondylitis (AS) management: Recommended — Hydrotherapy (warm water reduces pain/stiffness), Muscle stretching (maintains flexibility, prevents ankylosis), Cervical rotation (preserves neck mobility), swimming. NOT recommended — Football and contact sports involving high-impact, collision, or torsional forces on the spine. AS patients have rigid, brittle spines prone to fracture — football can cause spinal fractures from tackles, falls, or sudden movements.",
  },

  {
    id: 201,
    text: "Kushta is to be used:",
    options: [
      "Just after preparation",
      "After one month of preparation",
      "After six month of preparation",
      "Upto six month of preparation",
    ] as [string, string, string, string],
    correctIndex: 2,
    topic: "Ilmul Saidla",
    year: 2025,
    explanation:
      "Kushta (calcined metallic/mineral preparations in Unani medicine) must be stored for at least six months after preparation before use. This maturation period (Idkhar) allows any residual toxic properties to dissipate and the therapeutic properties to stabilize. Using Kushta immediately after preparation can cause harm due to residual reactive compounds.",
  },
  {
    id: 202,
    text: "Akhlat, which are involved in formation of Aza are called as:",
    options: [
      "Akhlat Baseeta",
      "Akhlat Lateefa",
      "Akhlat Kaseefa",
      "Akhlat Haqeeqa",
    ] as [string, string, string, string],
    correctIndex: 0,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "Akhlat Baseeta (simple humours) are the four primary humours (Dam, Balgham, Safra, Sawda) in their pure form that directly participate in the formation and nourishment of body organs (Aza). They are essential for Tashkeel (formation) and Taghziya (nutrition) of organs.",
  },
  {
    id: 203,
    text: "Well's operation is a treatment of:",
    options: [
      "Fistula-in-ano",
      "Stricture of Urethra",
      "Partial prolapse of rectum",
      "Complete prolapse of rectum",
    ] as [string, string, string, string],
    correctIndex: 3,
    topic: "Ilmul Jarahat",
    year: 2025,
    explanation:
      "Wells operation (Ivalon sponge rectopexy) is performed for complete (full-thickness) prolapse of the rectum. The rectum is mobilized and fixed to the sacrum using a polyvinyl alcohol (Ivalon) sponge, which promotes fibrosis and prevents further prolapse.",
  },
  {
    id: 204,
    text: "Where Tabqah-i-Ankabootiyah exists?",
    options: ["In the heart", "In the ear", "In the eye", "In the testis"] as [
      string,
      string,
      string,
      string,
    ],
    correctIndex: 2,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "Tabqah-i-Ankabootiyah (spider-web like layer) is a layer of the eye described in Unani anatomy. The eye in Unani medicine has several layers (Tabqaat) including Tabqah Shabakiyah (retina) and Tabqah Ankabootiyah. This cobweb-like layer exists in the eye.",
  },
  {
    id: 205,
    text: "Which of the following taste has Murakhkhee (softening/relaxing) action?",
    options: [
      "Qabiz (astringent)",
      "Afas (insipid)",
      "Dasam (oily/fatty)",
      "Hamiz (sour)",
    ] as [string, string, string, string],
    correctIndex: 2,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "Dasam (oily, fatty, greasy taste) has Murakhkhi (softening, moistening, relaxing) action on tissues. It moistens and lubricates organs, reduces dryness, and softens tissues. Qabiz causes contraction, Hamiz causes constriction, Afas has minimal action.",
  },
  {
    id: 206,
    text: "Hypertonic dehydration occurs in:",
    options: ["Fever", "Excess use of diuretic", "Diarrhea", "Vomiting"] as [
      string,
      string,
      string,
      string,
    ],
    correctIndex: 1,
    topic: "Moalijat",
    year: 2025,
    explanation:
      "Hypertonic dehydration (hypernatremic dehydration) occurs when water loss exceeds electrolyte loss, increasing plasma osmolality. Excess use of diuretics causes water loss proportionally greater than sodium loss, leading to hypertonic dehydration. Diarrhea and vomiting typically cause isotonic or hypotonic dehydration.",
  },
  {
    id: 207,
    text: "Re-arrange the order of appearance of Rigor-mortis: (A) Finger and toes (B) Muscle of chest (C) Eyelids (D) Muscles of face",
    options: [
      "(A), (B), (C), (D)",
      "(B), (A), (C), (D)",
      "(C), (D), (B), (A)",
      "(D), (C), (B), (A)",
    ] as [string, string, string, string],
    correctIndex: 2,
    topic: "Ilmul Jarahat",
    year: 2025,
    explanation:
      "Rigor mortis follows Nysten's law: it begins in smaller muscles first. The order is Eyelids (C) then Muscles of face (D) then Muscles of chest (B) then Fingers and toes (A). It starts from head and neck, then descends to the trunk and extremities. Appears 2-6 hours after death.",
  },
  {
    id: 208,
    text: "The correct order of immunization as per Indian Academy of Pediatrics: (A) BCG at birth (B) DTP-1 at 10th week (C) DTP-1 at 6th week (D) DTP-2 at 10th week (E) DTP-3 at 14th week",
    options: [
      "(A), (B), (D), (E)",
      "(A), (C), (D), (E)",
      "(A), (B), (C), (D)",
      "(A), (D), (B), (C)",
    ] as [string, string, string, string],
    correctIndex: 1,
    topic: "Moalijat",
    year: 2025,
    explanation:
      "IAP immunization schedule: BCG at birth, DTP-1 at 6 weeks (C), DTP-2 at 10 weeks (D), DTP-3 at 14 weeks (E). This follows the 6-10-14 week schedule (EPI schedule). Hence option (A),(C),(D),(E) is correct.",
  },
  {
    id: 209,
    text: "According to Arastu, the special tool for Hiss Lams (sense of touch) is:",
    options: [
      "Asab (Nerves)",
      "Ghosht (Muscle)",
      "Dimagh (Brain)",
      "Nukha (Spinal Cord)",
    ] as [string, string, string, string],
    correctIndex: 0,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "According to Aristotle (Arastu), Asab (nerves) are the special organ/tool for sense of touch (Hiss Lams). Nerves serve as conduits for conveying tactile sensations from skin to brain.",
  },
  {
    id: 210,
    text: "Woman with Adenomyosis presents with the features of:",
    options: [
      "Amenorrhea with infertility",
      "Polymetrorrhagia",
      "Dysmenorrhea with menorrhagia",
      "Hypomenorrhea with dysmenorrhea",
    ] as [string, string, string, string],
    correctIndex: 2,
    topic: "Amraz Niswan",
    year: 2025,
    explanation:
      "Adenomyosis (endometrial glands/stroma within myometrium) classically presents with dysmenorrhea (painful periods) and menorrhagia (heavy bleeding). The uterus is uniformly enlarged, tender, and boggy. Dysmenorrhea is due to prostaglandin release; menorrhagia occurs due to increased uterine surface area and impaired contraction.",
  },
  {
    id: 211,
    text: "Which statement is correct regarding Unani pharmaceutical terms? (A) Silbatta is also known as Salaya (B) Haleeb is basically a type of Mazeej (C) Any crude or powdered drug kept in liquid is known as Tasqiya (D) Zimad is a type of Majoon (E) Taqsheer has two meanings: peeling off and scaling",
    options: [
      "(E) and (B) only",
      "(C), (D) and (B) only",
      "(A), (C) and (E) only",
      "(B) only",
    ] as [string, string, string, string],
    correctIndex: 2,
    topic: "Ilmul Saidla",
    year: 2025,
    explanation:
      "Correct statements: (A) Silbatta (flat grinding stone) is also known as Salaya: TRUE. (C) Tasqiya means keeping drug in liquid (maceration): TRUE. (E) Taqsheer has two meanings, peeling off and scaling: TRUE. Incorrect: (B) Haleeb is milk, not a type of Mazeej. (D) Zimad is an external paste/plaster, not Majoon.",
  },
  {
    id: 212,
    text: "Given below are two statements about brachial plexus injury. Statement I: Injury to the upper trunk causes waiter's tip hand deformity. Statement II: Upper trunk injury leads to paralysis of Deltoid, Supraspinatus, Infraspinatus, Biceps brachii, Brachialis, Coracobrachialis and Supinator muscles.",
    options: [
      "Both Statement I and Statement II are correct",
      "Both Statement I and Statement II are incorrect",
      "Statement I is correct but Statement II is incorrect",
      "Statement I is incorrect but Statement II is correct",
    ] as [string, string, string, string],
    correctIndex: 0,
    topic: "Ilmul Jarahat",
    year: 2025,
    explanation:
      "Both statements are correct. Upper trunk (C5-C6) injury (Erb's palsy) causes waiter's tip deformity: arm hangs with medial rotation, elbow extended, forearm pronated, wrist flexed. Muscles paralyzed: Deltoid, Supraspinatus, Infraspinatus, Biceps brachii, Brachialis, Coracobrachialis, and Supinator (all supplied by C5-C6).",
  },
  {
    id: 213,
    text: "Intiqal Mawad (transfer of matter) from Uzu Sharif (noble organ) to Uzu Khasis (ignoble organ) is known as:",
    options: [
      "Intiqal Radi",
      "Intiqal Tazayyud",
      "Intiqal Taqayyuh",
      "Intiqal Jayyid",
    ] as [string, string, string, string],
    correctIndex: 3,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "Intiqal Jayyid means transfer of good/beneficial matter from a noble organ (Uzu Sharif) to an ignoble organ (Uzu Khasis). This is beneficial for the noble organ. Intiqal Radi = transfer of bad matter. Intiqal Tazayyud = increase in morbid matter. Intiqal Taqayyuh = transfer causing suppuration.",
  },
  {
    id: 214,
    text: "Which power or Faculty is NOT essential for the survival of an individual?",
    options: [
      "Quwwat-i-Failah (Active faculty)",
      "Quwwat-i-Musawwirah (Formative faculty)",
      "Quwwat-i-Mughaiyrah Saniah (Secondary alterative faculty)",
      "Quwwat-i-Wahimah (Estimative faculty)",
    ] as [string, string, string, string],
    correctIndex: 3,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "Quwwat-i-Wahimah (estimative/imaginative faculty) is a psychological faculty NOT essential for basic physiological survival. The other three are essential: Failah (active/motor), Musawwirah (formative, for reproduction), and Mughaiyrah Saniah (secondary alteration in digestion).",
  },
  {
    id: 215,
    text: "Match List I with List II: (A) Hydrocele (B) Felon (C) Septic Shock (D) Complication of Blood transfusion",
    options: [
      "(A) Hypothermia, (B) Systemic Vasodilation, (C) Abscess in fingertip, (D) Fluid in Tunica Vaginalis",
      "(A) Fluid collection between Tunica Vaginalis layers, (B) Abscess in fibrous septa of fingertip, (C) Systemic Vasodilation, (D) Hypothermia",
      "(A) Systemic Vasodilation, (B) Fluid in Tunica Vaginalis, (C) Hypothermia, (D) Abscess in fingertip",
      "(A) Abscess in fingertip, (B) Hypothermia, (C) Fluid in Tunica Vaginalis, (D) Systemic Vasodilation",
    ] as [string, string, string, string],
    correctIndex: 1,
    topic: "Ilmul Jarahat",
    year: 2025,
    explanation:
      "Correct matching: (A) Hydrocele: fluid collection between layers of Tunica Vaginalis. (B) Felon: abscess in specialized fibrous septa of fingertip (closed-space infection). (C) Septic Shock: systemic vasodilation due to cytokines. (D) Blood transfusion complication: hypothermia from cold blood products.",
  },
  {
    id: 216,
    text: "Given below are two statements about Nawm-e-Motadil (Moderate sleep). Statement I: It causes inward movement of hararat-e-gharizia, improves digestion, and increases memory. Statement II: It reduces tahallul.",
    options: [
      "Both Statement I and Statement II are correct",
      "Both Statement I and Statement II are incorrect",
      "Statement I is correct but Statement II is incorrect",
      "Statement I is incorrect but Statement II is correct",
    ] as [string, string, string, string],
    correctIndex: 0,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "Both statements are correct. During moderate sleep, Hararat-e-Gharizia moves inward improving digestion, and memory consolidation occurs. Moderate sleep also reduces Tahallul (dissipation/catabolism of vital substances), preserving vitality.",
  },
  {
    id: 217,
    text: "Which is NOT recommended for patients of osteoporosis?",
    options: ["Weight-bearing exercise", "Walking", "Aerobics", "Bed rest"] as [
      string,
      string,
      string,
      string,
    ],
    correctIndex: 3,
    topic: "Moalijat",
    year: 2025,
    explanation:
      "Bed rest is contraindicated in osteoporosis: immobility causes further bone loss (disuse osteoporosis) by reducing mechanical loading, the key stimulus for bone remodeling. Weight-bearing exercise, walking, and aerobics all stimulate osteoblast activity and bone formation.",
  },
  {
    id: 218,
    text: "The writer of book Al-Tohfatul Hamidiya fil Sanatul Takleesiya:",
    options: [
      "Sharif Khan",
      "Abdul Aziz",
      "Ajmal Khan",
      "Ahmad Husain Usmani",
    ] as [string, string, string, string],
    correctIndex: 1,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "Al-Tohfatul Hamidiya fil Sanatul Takleesiya (a classical Unani text on the art of calcination/Kushta preparation) was written by Hakeem Abdul Aziz, a renowned scholar of Unani pharmacology.",
  },
  {
    id: 219,
    text: "Humoral Immunity comes from which of the following:",
    options: [
      "Bone-marrow derived B-Lymphocytes",
      "Thymus derived T-Lymphocytes",
      "Natural Killer Cells",
      "Cytotoxic Cells",
    ] as [string, string, string, string],
    correctIndex: 0,
    topic: "Moalijat",
    year: 2025,
    explanation:
      "Humoral immunity is antibody-mediated. B-lymphocytes (derived from and mature in bone marrow) are responsible for humoral immunity. Upon antigen stimulation, B-cells differentiate into plasma cells producing specific antibodies. T-lymphocytes mediate cellular immunity.",
  },
  {
    id: 220,
    text: "According to Jawhar (substance) and Mizaj (temperament), Reham (Uterus) is:",
    options: [
      "Haar Ratab (Hot and Moist)",
      "Haar Yabis (Hot and Dry)",
      "Barid Ratab (Cold and Moist)",
      "Barid Yabis (Cold and Dry)",
    ] as [string, string, string, string],
    correctIndex: 1,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "According to its substance (Jawhar) and temperament (Mizaj), the Reham (uterus) is Haar Yabis (Hot and Dry). Being primarily muscular tissue (myometrium), muscles have a hot and dry temperament in Unani. This Mizaj makes it capable of strong contractions.",
  },
  {
    id: 221,
    text: "What is contraindicated with Mus'hil (purgative) drug?",
    options: [
      "Hammam before taking mus'hil",
      "Hammam after taking mus'hil",
      "Intake of pomegranate after taking mus'hil",
      "Intake of hot water with Joshanda-e-Mus'hil",
    ] as [string, string, string, string],
    correctIndex: 1,
    topic: "Moalijat",
    year: 2025,
    explanation:
      "Hammam (bath) AFTER taking Mus'hil (purgative) is contraindicated. It causes increased drug absorption due to vasodilation, redistributes Hararat away from gut, and weakens the patient, all interfering with the purgative action. Hammam BEFORE taking mus'hil is permitted.",
  },
  {
    id: 222,
    text: "In which of the following micro-organelles is the limiting membrane absent:",
    options: ["Peroxisome", "Lysosome", "Centrosome", "Ribosome"] as [
      string,
      string,
      string,
      string,
    ],
    correctIndex: 3,
    topic: "Moalijat",
    year: 2025,
    explanation:
      "Ribosomes are non-membrane-bound organelles: they lack any surrounding membrane. They consist of rRNA and proteins in two subunits. All others have membranes: Peroxisomes and Lysosomes have a single membrane, Centrosomes are bounded by pericentriolar material.",
  },
  {
    id: 223,
    text: "Who described that Taghaiyurat-e-ghair Tabaiyah ghair Muzadah are related to Umoor-e-Falki (celestial matters)?",
    options: [
      "Ali Ibn-e-Abbas Majoosi",
      "Shaikhur Rais Ibn Sina",
      "Zakariya Razi",
      "Allama Burhan Uddin Nafees",
    ] as [string, string, string, string],
    correctIndex: 3,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "Allama Burhan Uddin Nafees (author of Sharh-e-Asbab wa Alamaat) described that non-natural non-contrary changes are related to Umoor-e-Falki (celestial/astronomical factors) such as planetary positions and cosmic influences.",
  },
  {
    id: 224,
    text: "Immediate sustained laryngeal spasm occurs in which of the following types of drowning:",
    options: [
      "Primary Drowning",
      "Secondary Drowning",
      "Immersion Syndrome",
      "Dry Drowning",
    ] as [string, string, string, string],
    correctIndex: 3,
    topic: "Ilmul Jarahat",
    year: 2025,
    explanation:
      "Dry Drowning is characterized by immediate sustained laryngeal spasm upon contact of water with the larynx/vocal cords. This prevents water from entering lungs but causes death by asphyxia. Lungs contain little or no water at autopsy.",
  },
  {
    id: 225,
    text: "An idea of time of death by cooling of the dead body: which formula is correct?",
    options: [
      "(Normal body temperature minus Rectal temperature) divided by Rate of fall per hour = Time of Death",
      "(Rectal temperature minus Normal body temperature) divided by Rate of fall per hour = Time of Death",
      "Rate of fall per hour divided by (Rectal temperature minus Normal body temperature) = Time of Death",
      "(Normal body temperature minus Rate of fall per hour) divided by Rectal temperature = Time of Death",
    ] as [string, string, string, string],
    correctIndex: 0,
    topic: "Ilmul Jarahat",
    year: 2025,
    explanation:
      "Time since death = (Normal body temperature minus Rectal temperature) divided by Rate of temperature fall per hour. Normal body temperature is 37 degrees C; body cools approximately 1-1.5 degrees C per hour. Example: rectal temp 31 degrees C means (37-31)/1.5 = 4 hours since death.",
  },
  {
    id: 226,
    text: "A person complains of a snapping sound and sharp pain in the heel after jumping from a height. What is the most likely diagnosis?",
    options: [
      "Rupture of patellar tendon",
      "Rupture of Achilles tendon",
      "Foot drop",
      "Minor tears of the peroneal tendons",
    ] as [string, string, string, string],
    correctIndex: 1,
    topic: "Ilmul Jarahat",
    year: 2025,
    explanation:
      "Rupture of Achilles tendon presents with sudden sharp heel/calf pain, an audible snap at injury, and difficulty walking. Occurs with sudden forceful plantarflexion (jumping from height). Thompson's test (absent plantarflexion on calf squeeze) is diagnostic.",
  },
  {
    id: 227,
    text: "Boas's sign is seen in:",
    options: [
      "Appendicitis",
      "Cholecystitis",
      "Diverticulitis",
      "Pancreatitis",
    ] as [string, string, string, string],
    correctIndex: 1,
    topic: "Ilmul Jarahat",
    year: 2025,
    explanation:
      "Boas's sign is hyperaesthesia in the right infrascapular region (9th-11th thoracic dermatome, right side) found in acute Cholecystitis. It occurs due to referred pain from the inflamed gallbladder via phrenic and right inferior intercostal nerves.",
  },
  {
    id: 228,
    text: "Most common position in vertex presentation is:",
    options: [
      "Right occipito anterior position",
      "Left occipito anterior position",
      "Right occipito posterior position",
      "Left occipito posterior position",
    ] as [string, string, string, string],
    correctIndex: 1,
    topic: "Amraz Niswan",
    year: 2025,
    explanation:
      "Left Occipito Anterior (LOA) is the most common position in vertex presentation. The occiput faces the left anterior maternal pelvis. The uterus rotates slightly to the right and the sigmoid colon occupies the left posterior quadrant, favoring LOA position.",
  },
  {
    id: 229,
    text: "Isometric relaxation period is responsible for:",
    options: [
      "Opening of atrioventricular valve",
      "First heart sound",
      "Second heart sound",
      "Opening of semilunar valves",
    ] as [string, string, string, string],
    correctIndex: 2,
    topic: "Moalijat",
    year: 2025,
    explanation:
      "The isovolumetric relaxation period begins with closure of semilunar valves, producing S2 (Second heart sound: dub). Ventricular pressure falls rapidly but AV valves have not opened yet. S1 is caused by closure of AV valves.",
  },
  {
    id: 230,
    text: "Match List I (Type of pelvis) with List II (Shape): (A) Android pelvis (B) Platypelloid pelvis (C) Gynaecoid pelvis (D) Anthropoid pelvis",
    options: [
      "(A) Round, (B) Triangular, (C) Oval, (D) Transverse oval",
      "(A) Triangular shape, (B) Transversely oval, (C) Round Inlet, (D) Inlet is oval",
      "(A) Oval, (B) Round, (C) Transverse oval, (D) Triangular",
      "(A) Transverse oval, (B) Oval, (C) Triangular, (D) Round",
    ] as [string, string, string, string],
    correctIndex: 1,
    topic: "Amraz Niswan",
    year: 2025,
    explanation:
      "Pelvic types: (A) Android: triangular/heart-shaped inlet. (B) Platypelloid: transversely oval (flat pelvis). (C) Gynaecoid: round inlet (ideal female pelvis, approximately 50%). (D) Anthropoid: oval inlet with longer AP diameter. Gynaecoid is most favorable for normal labor.",
  },
  {
    id: 231,
    text: "Cholesterosis of gall bladder is also known as:",
    options: [
      "Blueberry gall bladder",
      "Raspberry gall bladder",
      "Gooseberry gall bladder",
      "Strawberry gall bladder",
    ] as [string, string, string, string],
    correctIndex: 3,
    topic: "Ilmul Jarahat",
    year: 2025,
    explanation:
      "Cholesterosis of the gall bladder is called Strawberry gall bladder: yellow cholesterol deposits (foam cells) against a red hyperemic background resembling a strawberry. It is benign, associated with bile supersaturation with cholesterol.",
  },
  {
    id: 232,
    text: "Which of the following is NOT related to problems affecting elderly males?",
    options: [
      "Benign Prostatic Hypertrophy",
      "Prostatic Cancer",
      "Male Sexual Dysfunction",
      "Cervical Cancer",
    ] as [string, string, string, string],
    correctIndex: 3,
    topic: "Moalijat",
    year: 2025,
    explanation:
      "Cervical cancer is exclusively a female condition (cervix uteri). BPH, Prostatic Cancer, and Male Sexual Dysfunction are all common problems in elderly males.",
  },
  {
    id: 233,
    text: "Transformation of Rutubat Ula (primary fluid) into Rutubat Thaniya (secondary fluid) is:",
    options: [
      "Hazm Awwal (First digestion)",
      "Hazm Duwwam (Second digestion)",
      "Hazm Suwwam (Third digestion)",
      "Hazm Chaharum (Fourth digestion)",
    ] as [string, string, string, string],
    correctIndex: 1,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "Hazm Duwwam (hepatic/second digestion) transforms Rutubat Ula (primary chyle absorbed from intestines) into Rutubat Thaniya (blood and other humours) in the liver. Hazm Awwal = gastric. Hazm Suwwam = vascular. Hazm Chaharum = cellular.",
  },
  {
    id: 234,
    text: "Match List I (Type of bath) with List II (Benefits): (A) Ghusl-e-Baarid (B) Hammam-e-Moarriq (C) Ghusl Chashma-e-Gandhak (D) Ghusl-e-Hammaat",
    options: [
      "(A) Beneficial for less exercise, (B) Faalij/Raasha, (C) Hot Springs, (D) Makes body strong",
      "(A) Faalij/Raasha, (B) Hot Springs, (C) Makes body strong, (D) Less exercise",
      "(A) Hot Springs, (B) Faalij/Raasha, (C) Makes body strong, (D) Less exercise",
      "(A) Makes body strong, (B) Beneficial for those who exercise less, (C) Bathing in Hot Springs, (D) Beneficial for Faalij and Raasha",
    ] as [string, string, string, string],
    correctIndex: 3,
    topic: "Ilaj bil Tadbeer",
    year: 2025,
    explanation:
      "(A) Ghusl-e-Baarid (cold bath): Makes body strong and firms muscles. (B) Hammam-e-Moarriq (sudorific bath): Beneficial for those who exercise less, promotes perspiration. (C) Ghusl Chashma-e-Gandhak (sulphur spring bath): Bathing in hot sulphur springs, for skin diseases. (D) Ghusl-e-Hammaat (mud bath): Beneficial for Faalij (hemiplegia) and Raasha (tremors).",
  },
  {
    id: 235,
    text: "Mojiz al-Qanoon is the Talkhees (abridgment) of which book?",
    options: [
      "Firdus al-Hikmat",
      "Kamil al-Sana",
      "Alqanoon Fi-al-Tibb",
      "Kitab al-Tasreef",
    ] as [string, string, string, string],
    correctIndex: 2,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "Mojiz al-Qanoon (Al-Mojiz) is the Talkhees (summary/abridgment) of Al-Qanoon Fi-al-Tibb (Canon of Medicine) by Ibn Sina. It was written by Ibn al-Nafis: the same scholar who described pulmonary circulation.",
  },
  {
    id: 236,
    text: "Which compound in leech saliva has a vasodilator effect?",
    options: [
      "Bdellins",
      "Hirustatin",
      "Histamine-like substances",
      "Hyaluronidase",
    ] as [string, string, string, string],
    correctIndex: 2,
    topic: "Ilaj bil Tadbeer",
    year: 2025,
    explanation:
      "Leech saliva compounds: Hirudin = anticoagulant. Bdellins = anti-inflammatory. Hirustasin = inhibits kallikrein/trypsin. Hyaluronidase = spreading factor. Histamine-like substances are responsible for VASODILATOR effect, causing local vasodilation to increase blood flow.",
  },
  {
    id: 237,
    text: "Given below are two statements regarding acquired Vesicular blisters. Statement I: Localized causes include Herpes simplex, Herpes zoster, Impetigo, Pompholyx. Statement II: Generalized causes include Toxic epidermal necrolysis, Erythema multiforme, Stevens-Johnson syndrome.",
    options: [
      "Both Statement I and Statement II are correct",
      "Both Statement I and Statement II are incorrect",
      "Statement I is correct but Statement II is incorrect",
      "Statement I is incorrect but Statement II is correct",
    ] as [string, string, string, string],
    correctIndex: 0,
    topic: "Amraz Jild",
    year: 2025,
    explanation:
      "Both correct. Localized vesicular blisters: Herpes simplex, Herpes zoster, Impetigo, Pompholyx. Generalized: TEN (Toxic Epidermal Necrolysis), Erythema multiforme, Stevens-Johnson syndrome. All are acquired vesiculobullous conditions.",
  },
  {
    id: 238,
    text: "Barron's Banding (rubber band ligation) is done in:",
    options: [
      "First degree internal haemorrhoids",
      "Second degree internal haemorrhoids",
      "Third degree internal haemorrhoids",
      "Fourth degree internal haemorrhoids",
    ] as [string, string, string, string],
    correctIndex: 1,
    topic: "Ilmul Jarahat",
    year: 2025,
    explanation:
      "Barron's banding is for 2nd degree haemorrhoids (prolapse during straining, spontaneous reduction). 1st degree = conservative. 3rd degree = manual reduction/surgical. 4th degree = permanently prolapsed/surgical. Rubber band causes necrosis and sloughing of haemorrhoidal tissue.",
  },
  {
    id: 239,
    text: "Match List I with List II (Unani anatomical characteristics): (A) Ashaab (B) Lahm (C) Shiryan (D) Tabiyyat",
    options: [
      "(A) Falak, (B) Kamun-o-Baruz, (C) Ghuddi, (D) Jauf",
      "(A) Kamun-o-Baruz, (B) Ghuddi, (C) Jauf, (D) Falak",
      "(A) Ghuddi, (B) Jauf, (C) Falak, (D) Kamun-o-Baruz",
      "(A) Jauf, (B) Falak, (C) Kamun-o-Baruz, (D) Ghuddi",
    ] as [string, string, string, string],
    correctIndex: 1,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "(A) Ashaab (nerves): Kamun-o-Baruz (hidden and appearing). (B) Lahm (muscle): Ghuddi (glandular characteristic). (C) Shiryan (artery): Jauf (hollow tubular structure). (D) Tabiyyat (natural faculty): Falak (celestial, guiding bodily processes).",
  },
  {
    id: 240,
    text: "Subserving Kayfiyat (Qualities) of Quwwat Dafia (expulsive faculty) are:",
    options: [
      "Hararat Wa Rutubat (Heat and Moisture)",
      "Hararat Wa Yubusat (Heat and Dryness)",
      "Burudat Wa Rutubat (Cold and Moisture)",
      "Burudat Wa Yubusat (Cold and Dryness)",
    ] as [string, string, string, string],
    correctIndex: 0,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "Quwwat Dafia (expulsive faculty) is served by Hararat (heat) and Rutubat (moisture). Heat facilitates propulsion; moisture eases passage of waste matter. Other faculties: Jaziba = Heat+Dryness; Masika = Cold+Dryness; Hadima = Heat+Moisture.",
  },
  {
    id: 241,
    text: "Which Arq (distillate) is used in preparation of Shingraf Musaffa (purified Cinnabar)?",
    options: [
      "Arq Lemoon (Lemon distillate)",
      "Arq Badiyan (Fennel distillate)",
      "Arq Mokoy",
      "Arq Kasni (Chicory distillate)",
    ] as [string, string, string, string],
    correctIndex: 0,
    topic: "Ilmul Saidla",
    year: 2025,
    explanation:
      "Shingraf (Cinnabar, mercuric sulphide) is purified using Arq Lemoon (lemon distillate). The citric acid helps remove impurities including toxic unreacted mercury compounds during the Tasfiya (purification) process.",
  },
  {
    id: 242,
    text: "Ludwig's Angina is a disease of:",
    options: [
      "Heart pain",
      "Cellulitis of floor of mouth",
      "III Grade fatty liver",
      "Heart pain and fatty liver combined",
    ] as [string, string, string, string],
    correctIndex: 1,
    topic: "Ilmul Jarahat",
    year: 2025,
    explanation:
      "Ludwig's Angina is rapidly spreading bilateral cellulitis of the floor of the mouth involving submandibular, sublingual, and submental spaces. Usually odontogenic (mandibular molar infection). Life-threatening due to airway obstruction from tongue displacement. Requires urgent airway management and antibiotics.",
  },
  {
    id: 243,
    text: "Find the correct sequence of lobar pneumonia stages: (A) Red hepatization, (B) Grey hepatization, (C) Congestion, (D) Resolution",
    options: [
      "(A), (B), (C), (D)",
      "(D), (B), (A), (C)",
      "(C), (D), (B), (A)",
      "(C), (A), (B), (D)",
    ] as [string, string, string, string],
    correctIndex: 3,
    topic: "Ilmul Amraz",
    year: 2025,
    explanation:
      "Lobar pneumonia stages: (C) Congestion (Day 1-2, hyperemia) then (A) Red hepatization (Day 2-4, alveoli filled with RBCs/fibrin, firm red lung) then (B) Grey hepatization (Day 4-8, RBCs lyse, grey color) then (D) Resolution (Day 8+, return to normal). Sequence: C then A then B then D.",
  },
  {
    id: 244,
    text: "In fracture of the neck of the fibula, which nerve is most likely injured?",
    options: [
      "Tibial Nerve",
      "Deep Peroneal Nerve",
      "Sural Nerve",
      "Common Peroneal Nerve",
    ] as [string, string, string, string],
    correctIndex: 3,
    topic: "Ilmul Jarahat",
    year: 2025,
    explanation:
      "The Common Peroneal Nerve winds around the neck of fibula and is vulnerable in fibular neck fractures. Injury causes foot drop (weak dorsiflexion/eversion) and sensory loss over dorsum of foot. Also seen in knee dislocations and tight plaster casts.",
  },
  {
    id: 245,
    text: "According to Shaikh ur Raees (Ibn Sina), which of the following are the direct state/substrate of Health and Disease?",
    options: [
      "Arkan (Elements) and Arwah (Spirits)",
      "Arkan (Elements) and Akhlat (Humours)",
      "Akhlat (Humours) and Aza (Organs)",
      "Aza (Organs) and Arwah (Spirits)",
    ] as [string, string, string, string],
    correctIndex: 2,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "According to Ibn Sina in Al-Qanoon, Akhlat (humours) and Aza (organs) are the direct substrates of health and disease. Health is proper balance of Akhlat and Aza. Disease manifests directly in humoral imbalance and organ dysfunction.",
  },
  {
    id: 246,
    text: "A child presents with sudden onset of fever, headache and neck stiffness. Which is the most appropriate NEXT step?",
    options: [
      "Broad Spectrum antibiotics",
      "Lumbar puncture",
      "CT scan of the head",
      "Observation and follow-up",
    ] as [string, string, string, string],
    correctIndex: 1,
    topic: "Moalijat",
    year: 2025,
    explanation:
      "Fever + headache + neck stiffness = meningitis until proven otherwise. Most appropriate next step is Lumbar puncture to analyze CSF (WBC, protein, glucose, culture). CT head is done first only if papilledema or focal neurological signs present. Antibiotics follow diagnosis.",
  },
  {
    id: 247,
    text: "Given below are two statements about sebaceous glands. Statement I: Sebocytes produce lipids including triglycerides, wax esters, squalene, and cholesterol. Statement II: Sebum excretion is under hormonal control, with androgens increasing sebum production.",
    options: [
      "Both Statement I and Statement II are correct",
      "Both Statement I and Statement II are incorrect",
      "Statement I is correct but Statement II is incorrect",
      "Statement I is incorrect but Statement II is correct",
    ] as [string, string, string, string],
    correctIndex: 0,
    topic: "Amraz Jild",
    year: 2025,
    explanation:
      "Both correct. Sebum contains triglycerides (~57%), wax esters (~26%), squalene (~12%), free fatty acids, cholesterol. Androgens (testosterone, DHT) stimulate sebaceous glands, explaining seborrhea and acne at puberty.",
  },
  {
    id: 248,
    text: "What is the dose of Kalaunji (Nigella sativa)?",
    options: [
      "250 mg to 500 mg",
      "1 gram to 2 grams",
      "5 grams to 7 grams",
      "7 grams to 10 grams",
    ] as [string, string, string, string],
    correctIndex: 1,
    topic: "Ilmul Advia",
    year: 2025,
    explanation:
      "Kalaunji (Nigella sativa, Black seed) standard therapeutic dose in Unani pharmacopoeia is 1-2 grams per dose. Used in Zeequn Nafs (asthma), Nazla, and as general tonic. Contains thymoquinone. Higher doses cause gastric irritation.",
  },
  {
    id: 249,
    text: "Which of the following is effective in Asthma (Zeequn Nafs)?",
    options: ["Sanbhaloo", "Kakraunda", "Katan", "Kahoo"] as [
      string,
      string,
      string,
      string,
    ],
    correctIndex: 1,
    topic: "Ilmul Advia",
    year: 2025,
    explanation:
      "Kakraunda is specifically used in Zeequn Nafs (asthma) in Unani medicine as a bronchodilator and expectorant, relieving bronchospasm and facilitating expulsion of phlegm. Sanbhaloo = joint pains. Katan = skin/expectorant. Kahoo = sedative.",
  },
  {
    id: 250,
    text: "According to Ibn Rushd (Averroes), Azae Mutashabihatul Ajza (homogeneous organs) are: (A) Mirra Sawda (B) Jild (C) Ruh (D) Mukh",
    options: [
      "(A) Mirra Sawda, (B) Jild, (C) Ruh only",
      "(A) Mirra Sawda, (C) Ruh, (D) Mukh only",
      "(A) Mirra Sawda, (B) Jild, (D) Mukh only",
      "(B) Jild, (C) Ruh, (D) Mukh only",
    ] as [string, string, string, string],
    correctIndex: 0,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "According to Ibn Rushd in Kitab al-Kulliyat, Azae Mutashabihatul Ajza include (A) Mirra Sawda, (B) Jild, and (C) Ruh. These are homogeneous organs/substances whose parts are similar to the whole (homoeomerous concept from Aristotle).",
  },
  {
    id: 251,
    text: "The establishment of All India Vedic and Unani Tibbi Conference belongs to:",
    options: [
      "Options A and B",
      "Hakim Ajmal Khan only",
      "Options A and D",
      "Option E only",
    ] as [string, string, string, string],
    correctIndex: 1,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "The All India Vedic and Unani Tibbi Conference was established by Hakim Ajmal Khan (1868-1927), legendary Unani physician and freedom fighter. He founded Hindustani Dawakhana and Tibbiya College, Delhi, and championed traditional Indian medicine.",
  },
  {
    id: 252,
    text: "Match List I with List II: (A) Glycated Hemoglobin (B) Rolled out margin (C) Onion skin lesion (D) Punched out margin",
    options: [
      "(A) Diabetes mellitus, (B) Squamous cell carcinoma, (C) Ewing's sarcoma, (D) Tropical/syphilitic ulcer",
      "(A) Diabetes, (B) Tropical ulcer, (C) Ewing's, (D) SCC",
      "(A) Ewing's sarcoma, (B) Diabetes, (C) SCC, (D) Tropical ulcer",
      "(A) Tropical ulcer, (B) Diabetes, (C) SCC, (D) Ewing's sarcoma",
    ] as [string, string, string, string],
    correctIndex: 0,
    topic: "Ilmul Amraz",
    year: 2025,
    explanation:
      "(A) Glycated Hemoglobin (HbA1c): Diabetes mellitus marker. (B) Rolled out (everted) margin: Squamous cell carcinoma ulcer. (C) Onion skin periosteal reaction: Ewing's sarcoma. (D) Punched out margin: Tropical/syphilitic/trophic ulcer.",
  },
  {
    id: 253,
    text: "Mom (wax) and Roghan (oil) are used in preparation of:",
    options: ["Sulaqa", "Khabees", "Qairooti (Cerate)", "Hareera"] as [
      string,
      string,
      string,
      string,
    ],
    correctIndex: 2,
    topic: "Ilmul Saidla",
    year: 2025,
    explanation:
      "Qairooti (Cerate) is a semi-solid Unani external preparation made from Mom (wax) and Roghan (oil/fat). Harder than Marham due to wax content. Used for skin conditions. Derived from Qir (wax). Sulaqa = plaster-like. Khabees = thick electuary. Hareera = thin gruel.",
  },
  {
    id: 254,
    text: "The statement Anatomy is the basis of medical discourse is attributed to:",
    options: ["Galen", "Avicenna", "Vesalius", "Hippocrates"] as [
      string,
      string,
      string,
      string,
    ],
    correctIndex: 0,
    topic: "Kulliyat",
    year: 2025,
    explanation:
      "Galen (Jalinus, 129-216 AD) stated that anatomy is the basis of medical discourse. He wrote extensive anatomical texts (De Anatomicis Administrationibus) forming the foundation of medical anatomy for 1400 years. While Vesalius corrected Galen's errors, Galen established anatomy as fundamental to medicine.",
  },
  {
    id: 255,
    text: "Neonates presenting small, white vesiculopustular papules on face/trunk 2-3 days after birth:",
    options: [
      "Pustular melanosis",
      "Erythema migrans",
      "Erythema toxicum",
      "Erythema nodosum",
    ] as [string, string, string, string],
    correctIndex: 2,
    topic: "Amraz Jild",
    year: 2025,
    explanation:
      "Erythema toxicum neonatorum appears 24-72 hours after birth as blotchy erythema, papules, vesicles, and pustules on face/trunk. Pustules contain eosinophils. Benign and self-limiting (resolves in 1-2 weeks). Pustular melanosis = present at birth. Erythema migrans = Lyme disease.",
  },
  {
    id: 256,
    text: "Given below are two statements about Triple Assessment for breast disease. Statement I: Applied for breast lump or nipple discharge. Statement II: Combination of clinical examination, imaging, and tissue sampling.",
    options: [
      "Both Statement I and Statement II are correct",
      "Both Statement I and Statement II are incorrect",
      "Statement I is correct but Statement II is incorrect",
      "Statement I is incorrect but Statement II is correct",
    ] as [string, string, string, string],
    correctIndex: 0,
    topic: "Ilmul Jarahat",
    year: 2025,
    explanation:
      "Both correct. Triple Assessment: (1) Clinical examination: history and physical examination. (2) Imaging: mammography (>35 years) or ultrasound. (3) Tissue sampling: FNAC or core biopsy. Each scored 1-5; concordance gives >99% diagnostic accuracy.",
  },
  {
    id: 257,
    text: "A classic pigmented pathological lesion known as powder burns is found in:",
    options: [
      "Polycystic ovarian syndrome (PCOD)",
      "Pelvic endometriosis and produces PGF",
      "Pelvic organ prolapse (POP)",
      "Pelvic endometriosis and releases inflammatory factors",
    ] as [string, string, string, string],
    correctIndex: 1,
    topic: "Amraz Niswan",
    year: 2025,
    explanation:
      "Powder burns are small dark brown-black peritoneal spots seen in pelvic endometriosis at laparoscopy: hemosiderin deposits from repeated bleeding of endometrial implants. Endometriotic implants also produce prostaglandin F2-alpha (PGF2a), contributing to dysmenorrhea.",
  },
  {
    id: 258,
    text: "Identify the correct statements: (A) Injection in Subarachnoid space is spinal anesthesia (B) Suxamethonium is short acting muscle relaxant",
    options: [
      "(A) and (B) only",
      "(A) and (C) only",
      "(C) and (D) only",
      "(D) and (E) only",
    ] as [string, string, string, string],
    correctIndex: 0,
    topic: "Moalijat",
    year: 2025,
    explanation:
      "Both A and B are correct. (A) Spinal anesthesia = injection into subarachnoid space (between arachnoid and pia mater), mixing with CSF. (B) Suxamethonium (succinylcholine) = short-acting depolarizing NMB, duration 5-10 min, rapidly hydrolyzed by plasma pseudocholinesterase.",
  },
  {
    id: 259,
    text: "Dalk-e-Istedad Taweel (prolonged preparatory massage) is suitable for:",
    options: [
      "Solid body, Hot season, Thick matter, Youth age",
      "Thin body, Hot season, Thin matter, Old age",
      "Solid/Strong body, Abundance of matter, Spring season, Any age",
      "Flaccid body, Weak power, Light matter, Autumn season",
    ] as [string, string, string, string],
    correctIndex: 0,
    topic: "Ilaj bil Tadbeer",
    year: 2025,
    explanation:
      "Dalk-e-Istedad Taweel (prolonged preparatory massage) is for: Solid/firm body (withstands manipulation), Hot season (facilitates tissue softening), Thick morbid matter (needs prolonged massage), Youth age (better tissue resilience). Prepares body for subsequent therapeutic procedures.",
  },
  {
    id: 260,
    text: "The disease produced by Sauda (black bile) and burnt Dam (blood):",
    options: [
      "Pityriasis Nigra",
      "Pityriasis Alba",
      "Ecchymosis",
      "Melasma",
    ] as [string, string, string, string],
    correctIndex: 0,
    topic: "Amraz Jild",
    year: 2025,
    explanation:
      "Pityriasis Nigra (Bars Aswad) is caused by excess Sawda (black bile) and Ihtiqa al-Dam (burnt/oxidized blood) in Unani etiopathology. Excess black bile deposited in skin causes dark, blackish-brown patches. Distinct from Melasma (estrogen/UV related facial pigmentation).",
  },
];
