import Product from "../models/Products";
import RootStore from "./RootStore";

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

class ProductStore {
  products: Product[] = [];
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  setProducts(newProducts: IProduct[]) {
    const products = newProducts.map((product) => new Product(product));
    return (this.products = products);
  }

  addProduct(product: IProduct) {
    this.products.push(new Product(product));
  }

  removeProduct(product: IProduct) {
    const index = this.products.findIndex((p) => p._id === product._id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }
}

export default ProductStore;
