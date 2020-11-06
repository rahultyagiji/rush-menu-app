export class Item {
  cafeId: string;
  id: string;
  name: string;
  category: string;
  imgSrc: string;
  description: string;
  lat: number;
  lng: number;
  available: boolean;
  aID: string;
  rate: {"fixed":string,"floating":number};
  cash: boolean;
  card: boolean;
  currency: string;
  discount: number;
  tip:boolean
  delivery:{"delivery":boolean,"fees":string,"distance":number}
  onboarded:boolean

  constructor(options) {
    this.cafeId = options.cafeId;
    this.id = options.id;
    this.name = options.name;
    this.category = options.category;
    this.imgSrc = options.imgSrc;
    this.description = options.description;
    this.lat = options.lat;
    this.lng = options.lng;
    this.available = options.available;
    this.aID = options.aID;
    this.rate = options.rate;
    this.cash = options.cash;
    this.card = options.card;
    this.currency = options.currency;
    this.discount = options.discount;
    this.tip    = options.tip
    this.delivery = options.delivery
    this.onboarded =options.onboarded

  }

}
