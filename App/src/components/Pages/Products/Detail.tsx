import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Product } from "../../../core/modules/products/products.types";
import style from "./Detail.module.css";
import CountButton from "../../../components/Design/Buttons/Count/CountButton";
import BigPrimaryButton from "../../../components/Design/Buttons/Big/Primary/BigPrimaryButton";
import Header from "../../../components/Design/Header/Header";
import FavoriteButton from "../../../components/Design/Buttons/Favorite/FavoriteButton";
import { useAuth } from "../../../components/Context/AuthContainer";
import ContactSeller from "../../../components/Contact/ContactSeller";

const ProductDetail: React.FC = () => {
  const location = useLocation();
  const productData = location.state?.productData as Product;
  const [count, setCount] = useState<number>(1);
  const { user } = useAuth();

  if (!productData) {
    return <div>Product not found.</div>;
  }

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const itemIndex = cartItems.findIndex(
      (item: any) => item.id === productData._id
    );

    const cartItem = {
      id: productData._id,
      name: productData.name,
      price: productData.price,
      imageUrl: productData.imageUrl,
      grip: productData.grip,
      brand: productData.brand,
      sellerId: productData.sellerId,
      quantity: count,
    };

    if (itemIndex > -1) {
      cartItems[itemIndex].quantity += count;
    } else {
      cartItems.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    alert("Product added to cart!");
  };
  return (
    <>
      <Header />
      <div className={style["content-wrapper"]}>
        <div>
          <p className={style["breadcrumbs"]}>
            Home / Sports / Tennis / Tennis Rackets / {productData.name}
          </p>
          <div className={style["product"]}>
            <div className={style["image"]}>
              <img
                src={productData.imageUrl}
                alt={`${productData.name} image`}
              />
            </div>
            <div className={style["product-details"]}>
              <div className={style["info"]}>
                <h3>{productData.name}</h3>
                <p>€{productData.price}</p>
              </div>
              <div className={style["grip"]}>
                <h4>Grip size:</h4>
                <div className={style["grip-size"]}>
                  <p>{productData.grip}</p>
                </div>
              </div>
              <div className={style["shopping-cart"]}>
                <div className={style["container"]}>
                  <div className={style["text-container"]}>
                    <p>
                      Order today,{" "}
                      <span className={style["delivered"]}>delivered</span>
                      tomorrow
                    </p>
                    <FavoriteButton productId={productData._id} />
                  </div>
                  <div className={style["btn-container"]}>
                    <CountButton
                      initialCount={count}
                      onCountChange={(newCount) => setCount(newCount)}
                    />
                    <div className={style["primary-btn-container"]}>
                      <BigPrimaryButton
                        onClick={handleAddToCart}
                        label="Add to shopping cart"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {user && user._id !== productData.sellerId && (
                <ContactSeller
                  sellerId={productData.sellerId}
                  productId={productData._id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
