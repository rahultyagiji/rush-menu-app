export interface Order {
  cafeId: string;
  name: string;
  price: string;
  quantity: number;
  specialInstruction: string;
  option: { 'text': string, 'price': string };
  extras: { 'text': string, 'price': string }[];
  priceQuantity: string;
  tax: {
    "enable": boolean
    "name": string,
    "percent": number,
    "type": string,
  }
}
