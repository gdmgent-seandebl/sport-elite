import ProductStore from "./ProductStore";

class RootStore {
  productStore: ProductStore;

  constructor() {
    this.productStore = new ProductStore(this);
  }
}

export default RootStore;
