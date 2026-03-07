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
];
