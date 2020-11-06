export interface OrderDisplay {
  arrivalTime: string;
  uid: string;
  status: string;
  order: Order[];
  location: string;
  orderNo2: string;
  totalPrice: string;
  paymentBalance:number;
  timestamp: string;
  payway: string;
  discount: string;
  currency: string;
  tip: number;
  additiveTax:number;
  inclusiveTax:number
}

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
