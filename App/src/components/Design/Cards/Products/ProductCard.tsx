import React from "react";
import style from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { Product } from "../../../../core//modules/products/products.types";

interface ProductCardProps {
  productData: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ productData }) => {
  return (
    <Link
      to={{
        pathname: `/products/${productData._id}`,
      }}
      state={{ productData }}
      className={style["card-link"]}
    >
      <div className={style.card}>
        <div className={style["image-container"]}>
          <img
            src={productData.imageUrl}
            alt="Image"
            className={style["card-image"]}
          />
        </div>
        <div className={style["text-wrapper"]}>
          <h4>{productData.name}</h4>
          <p>€{productData.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
