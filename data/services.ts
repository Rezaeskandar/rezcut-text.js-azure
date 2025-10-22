// data/services.ts
export type Service = {
  id: string;
  title: string;
  price: number;
  duration: number;
  description: string;
  icon: string;
  category: "Klippning" | "Skägg" | "Vax & Ansikte";
};

export const services: Service[] = [
  // Klippningar
  {
    id: "klipp-maskin",
    title: "Maskinklippning",
    price: 350,
    duration: 20,
    description: "Nedkortning av hår med maskin för en ren och jämn look.",
    icon: "💈",
    category: "Klippning",
  },
  {
    id: "klipp-barn",
    title: "Barnklippning",
    price: 300,
    duration: 30,
    description:
      "En rolig och trygg klippupplevelse för barn, inklusive tvätt.",
    icon: "🧒",
    category: "Klippning",
  },
  {
    id: "klipp-pensionar",
    title: "Klippning Pensionär",
    price: 300,
    duration: 30,
    description:
      "Klassisk klippning till ett rabatterat pris för dig som är 65+.",
    icon: "✂️",
    category: "Klippning",
  },
  {
    id: "klipp-kort",
    title: "Klippning Kort Hår",
    price: 350,
    duration: 45,
    description: "Klippning och styling av kort hår, inklusive tvätt och vård.",
    icon: "✂️",
    category: "Klippning",
  },
  {
    id: "klipp-langt",
    title: "Klippning Långt Hår",
    price: 400,
    duration: 60,
    description: "Klippning och styling av långt hår, inklusive tvätt och fön.",
    icon: "💇‍♀️",
    category: "Klippning",
  },
  {
    id: "klipp-dam",
    title: "Damklippning",
    price: 500,
    duration: 60,
    description: "Enkel damklippning av topparna, inklusive föning av håret.",
    icon: "💇‍♀️",
    category: "Klippning",
  },
  // Skägg
  {
    id: "skagg-trim",
    title: "Skäggtrim",
    price: 200,
    duration: 20,
    description: "Trimmning av skägget med maskin.",
    icon: "🧔",
    category: "Skägg",
  },
  {
    id: "skagg-mustasch",
    title: "Mustaschtrim",
    price: 150,
    duration: 15,
    description: "Trimmning av mustasch med maskin och sax eller rakblad.",
    icon: "🧔",
    category: "Skägg",
  },
  {
    id: "skagg-kombo",
    title: "Skägg- och mustaschtrim",
    price: 250,
    duration: 25,
    description: "Skägg- och mustaschtrim med maskin och sax eller rakblad.",
    icon: "🧔",
    category: "Skägg",
  },
  {
    id: "skagg-snabbtrim",
    title: "Snabbtrim",
    price: 200,
    duration: 15,
    description: "Snabbtrim - finputs vid kanterna.",
    icon: "🧔",
    category: "Skägg",
  },
  {
    id: "skagg-lang",
    title: "Långskägg",
    price: 300,
    duration: 30,
    description: "Klippning eller trimning av långt skägg.",
    icon: "🧔",
    category: "Skägg",
  },
  // Vax & Ansikte
  {
    id: "vax-ansikte",
    title: "Vaxning Ansikte",
    price: 150,
    duration: 15,
    description:
      "Vaxning av panna, kinder och över näsan (ej i öron och näsa).",
    icon: "✨",
    category: "Vax & Ansikte",
  },
  {
    id: "ansikte-klassisk",
    title: "Klassisk Ansiktsbehandling",
    price: 550,
    duration: 60,
    description:
      "Rengöring, peeling, ånga, massage och mask. Anpassas efter din huds behov.",
    icon: "💆",
    category: "Vax & Ansikte",
  },
  {
    id: "vax-oron-nasa",
    title: "Vaxning Öron & Näsa",
    price: 150,
    duration: 15,
    description: "Vaxning endast öron och näsa.",
    icon: "✨",
    category: "Vax & Ansikte",
  },
  {
    id: "vax-komplett",
    title: "Vaxning Ansikte + Öron & Näsa",
    price: 250,
    duration: 20,
    description: "Vaxning av panna, kinder, i öronen samt under & i näsan.",
    icon: "✨",
    category: "Vax & Ansikte",
  },
];
