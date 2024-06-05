interface IProduct {
  _id: string;
  name: string;
  sellerId: string;
  price: number;
  age: string;
  brand: string;
  grip: string;
  weight: string;
  imageUrl: string;
}

class Product {
  _id: string;
  name: string;
  sellerId: string;
  price: number;
  age: string;
  brand: string;
  grip: string;
  weight: string;
  imageUrl: string;

  constructor({
    _id,
    name,
    sellerId,
    price,
    age,
    brand,
    grip,
    weight,
    imageUrl,
  }: IProduct) {
    this._id = _id;
    this.name = name;
    this.sellerId = sellerId;
    this.price = price;
    this.age = age;
    this.brand = brand;
    this.grip = grip;
    this.weight = weight;
    this.imageUrl = imageUrl;
  }

  get asJson() {
    return {
      id: this._id,
      name: this.name,
      sellerId: this.sellerId,
      price: this.price,
      age: this.age,
      brand: this.brand,
      grip: this.grip,
      weight: this.weight,
      imageUrl: this.imageUrl,
    };
  }
}

export default Product;
