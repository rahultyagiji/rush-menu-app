export class Menu {
  item: number;
  imgSrc: string;
  name: string;
  price: string;
  category: string;
  description: string;
  option: { "name": string, "extraPrice": number }[];
  extra: { "name": string, "extraPrice": number }[];
  available: {
    inStock:boolean,
    timing:{
      endTime:string,
      startTime:string
    }
  };
  tax: {
    "enable": boolean
    "name": string,
    "percent": number,
    "type": string,
  }


  constructor(options) {
    this.item = options.item;
    this.name = options.name;
    this.category = options.category;
    this.imgSrc = options.imgSrc;
    this.price = options.price;
    this.description = options.description;
    this.option = options.option;
    this.extra = options.extra;
    this.available = options.available;
    this.tax=options.tax;


  }

}

export class MenuDisplay{
  item: number;
  imgSrc: string;
  name: string;
  price: string;
  category: string;
  description: string;
  option: { "name": string, "extraPrice": number }[];
  extra: { "name": string, "extraPrice": number }[];
  available: boolean
  tax: {
    "enable": boolean
    "name": string,
    "percent": number,
    "type": string,
  }
}
