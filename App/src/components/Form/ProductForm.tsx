import React, { useState } from "react";
import {
  AgeType,
  BrandType,
  GripType,
  WeightType,
  Product,
} from "../../core/modules/products/products.types";
import style from "./ProductForm.module.css";

interface ProductFormProps {
  onSubmit: (product: Omit<Product, "_id" | "sellerId">) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [newProduct, setNewProduct] = useState<
    Omit<Product, "_id" | "sellerId">
  >({
    name: "",
    price: 0,
    age: AgeType.Junior,
    brand: BrandType.Babolat,
    grip: GripType.L1,
    weight: WeightType.W140,
    imageUrl: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
    setError(null);
  };

  const validateForm = (): boolean => {
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.age ||
      !newProduct.brand ||
      !newProduct.grip ||
      !newProduct.weight ||
      !newProduct.imageUrl
    ) {
      return false;
    }
    return true;
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(newProduct);
      setNewProduct({
        name: "",
        price: 0,
        age: AgeType.Junior,
        brand: BrandType.Babolat,
        grip: GripType.L1,
        weight: WeightType.W140,
        imageUrl: "",
      });
      setError(null);
    } else {
      setError("Please fill in all fields in the form.");
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={style.form}>
      {error && <div className={style.error}>{error}</div>}
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Age:</label>
        <select name="age" value={newProduct.age} onChange={handleInputChange}>
          {Object.values(AgeType).map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Brand:</label>
        <select
          name="brand"
          value={newProduct.brand}
          onChange={handleInputChange}
        >
          {Object.values(BrandType).map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Grip:</label>
        <select
          name="grip"
          value={newProduct.grip}
          onChange={handleInputChange}
        >
          {Object.values(GripType).map((grip) => (
            <option key={grip} value={grip}>
              {grip}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Weight:</label>
        <select
          name="weight"
          value={newProduct.weight}
          onChange={handleInputChange}
        >
          {Object.values(WeightType).map((weight) => (
            <option key={weight} value={weight}>
              {weight}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={newProduct.imageUrl}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Create Product</button>
    </form>
  );
};

export default ProductForm;
