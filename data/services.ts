// data/services.ts
export type Service = {
  id: string;
  title: string;
  price: number;
};

export const services: Service[] = [
  { id: "1", title: "Haircut", price: 350 },
  { id: "2", title: "Beard Trim", price: 200 },
  { id: "3", title: "Combo", price: 500 },
  { id: "4", title: "Kids Cut", price: 250 },
];
