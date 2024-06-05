export type Product = {
  _id?: string;
  name: string;
  sellerId?: string;
  price: number;
  age: string;
  brand: string;
  grip: string;
  weight: string;
  imageUrl: string;
};

export enum AgeType {
  Junior = "Junior",
  Senior = "Senior",
}

export enum BrandType {
  Babolat = "Babolat",
  Dunlop = "Dunlop",
  Head = "Head",
  Prince = "Prince",
  Wilson = "Wilson",
}

export enum WeightType {
  W140 = "141g - 160g",
  W161 = "161g - 180g",
  W181 = "181g - 200g",
  W201 = "201g - 220g",
  W221 = "221g - 240g",
}

export enum GripType {
  L1 = "L1",
  L2 = "L2",
  L3 = "L3",
  L4 = "L4",
}
