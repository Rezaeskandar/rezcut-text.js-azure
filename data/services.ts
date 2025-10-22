// data/services.ts
export type Service = {
  id: string;
  title: string;
  price: number;
  duration: number;
  description: string;
  icon: string;
};

export const services: Service[] = [
  {
    id: "1",
    title: "Herrklippning",
    price: 450,
    duration: 45,
    description:
      "Professionell herrklippning anpassad efter din stil och önskemål, inklusive tvätt och styling.",
    icon: "✂️",
  },
  {
    id: "2",
    title: "Skäggtrimning",
    price: 300,
    duration: 30,
    description:
      "Expertmässig trimning, formning och vård av ditt skägg med knivskarpa kanter.",
    icon: "🧔",
  },
  {
    id: "3",
    title: "Kombinationspaket",
    price: 650,
    duration: 60,
    description:
      "Den kompletta behandlingen. Inkluderar både professionell hårklippning och skäggtrimning.",
    icon: "💈",
  },
];
