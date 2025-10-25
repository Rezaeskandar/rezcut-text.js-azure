// data/services.ts
export type Service = {
  id: string;
  title: string;
  price: number;
  duration: number;
  description: string;
  icon: string;
  category: "Klippning" | "Skägg";
};

export const services: Service[] = [
  // --- Klippning ---
  {
    id: "klipp-maskin",
    title: "Maskinklippning",
    price: 150,
    duration: 20,
    description: "Enkel och snabb klippning med maskin över hela huvudet.",
    icon: "💈",
    category: "Klippning",
  },
  {
    id: "klipp-pensionar",
    title: "Klippning Pensionär",
    price: 150,
    duration: 30,
    description: "Klassisk klippning till rabatterat pris för dig som är 65+.",
    icon: "✂️",
    category: "Klippning",
  },
  {
    id: "klipp-student",
    title: "Studentklippning",
    price: 100,
    duration: 40,
    description:
      "Valfri fade eller klassisk klippning till studentpris. Giltigt student-ID krävs.",
    icon: "🎓",
    category: "Klippning",
  },
  {
    id: "klipp-low-fade",
    title: "Low Fade",
    price: 150,
    duration: 45,
    description: "En stilren fade som börjar lågt ner på sidorna och nacken.",
    icon: "✂️",
    category: "Klippning",
  },
  {
    id: "klipp-high-fade",
    title: "High Fade",
    price: 150,
    duration: 45,
    description:
      "En skarp fade som går högt upp på sidorna för en modern look.",
    icon: "✂️",
    category: "Klippning",
  },
  {
    id: "klipp-taper",
    title: "Taper Fade",
    price: 150,
    duration: 40,
    description:
      "En gradvis övergång vid tinningarna och nacklinjen för en naturlig finish.",
    icon: "✂️",
    category: "Klippning",
  },
  {
    id: "klipp-buzzcut",
    title: "Buzz Cut",
    price: 150,
    duration: 20,
    description:
      "Klassisk, kort maskinklippning för en stilren och enkel look.",
    icon: "💈",
    category: "Klippning",
  },
  {
    id: "klipp-langt",
    title: "Klippning Långt Hår",
    price: 150,
    duration: 45,
    description: "Klippning och formning av längre hår.",
    icon: "✂️",
    category: "Klippning",
  },
  {
    id: "klipp-klassisk",
    title: "Klassisk Klippning",
    price: 150,
    duration: 35,
    description: "Traditionell herrklippning med sax och maskin.",
    icon: "✂️",
    category: "Klippning",
  },
  // --- Skägg ---
  {
    id: "skagg-fade",
    title: "Skägg Fade",
    price: 100,
    duration: 25,
    description: "Formning och toning av skägget för en skarp övergång.",
    icon: "🧔",
    category: "Skägg",
  },
  {
    id: "skagg-och-fade",
    title: "Skägg och Fade",
    price: 170,
    duration: 30,
    description: "Kombinationsbehandling med både skäggformning och fade.",
    icon: "🧔",
    category: "Skägg",
  },
];
