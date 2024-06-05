import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Design/Header/Header";
import BigPrimaryButton from "../../../components/Design/Buttons/Big/Primary/BigPrimaryButton";
import BigSecondaryButton from "../../../components/Design/Buttons/Big/Secondary/BigSecondaryButton";
import style from "./ShoppingCart.module.css";
import { createOrder } from "../../../core/modules/orders/orders.api";

interface CartItem {
  name: string;
  quantity: number;
  brand: string;
  grip: string;
  imageUrl: string;
  id: string;
  price: number;
  sellerId: string;
}

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = JSON.parse(
      localStorage.getItem("cart") || "[]"
    ) as CartItem[];
    setCartItems(storedItems);
  }, []);

  const handleClick = () => {
    const orderProducts = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    if (cartItems.length === 0) {
      alert(
        "Your shopping cart is empty. Please add items before placing an order."
      );
      return;
    }

    console.log(orderProducts);

    createOrder({ products: orderProducts })
      .then(() => {
        localStorage.removeItem("cart");
        setCartItems([]);
        alert("Order placed successfully!");
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again later.");
      });
  };

  const emptyCart = () => {
    if (cartItems.length === 0) {
      alert("Your shopping cart is already empty");
      return;
    }
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  const handleNavigation = () => {
    navigate("/products");
  };

  const calculateSubtotal = (item: CartItem) => {
    return item.quantity * item.price;
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + calculateSubtotal(item);
  }, 0);

  return (
    <>
      <Header />
      <div className={style["content-wrapper"]}>
        <div className={style["title-container"]}>
          <h2>Shopping Cart</h2>
          <div className={style["primary-btn-container"]}>
            <BigSecondaryButton
              onClick={emptyCart}
              label="Empty shopping cart"
            />
          </div>
        </div>
        <div className={style["items-container"]}>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className={style["item"]}>
                <div className={style["image-container"]}>
                  <img src={item.imageUrl} alt={`${item.name} image`} />
                </div>
                <div className={style["info-container"]}>
                  <h4>{item.name}</h4>
                  <p>Grip size: {item.grip}</p>
                  <p>Brand: {item.brand}</p>
                </div>
                <div className={style["amount-container"]}>
                  <p>x {item.quantity}</p>
                </div>
                <div className={style["price-container"]}>
                  <p>€{calculateSubtotal(item)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={style["align-right"]}>
          <div className={style["total-container"]}>
            <div className={style["text-container"]}>
              <p>Shipment</p>
              <p className={style["free"]}>Free</p>
            </div>
            <div className={style["text-container"]}>
              <p>Items</p>
              <p>€{totalPrice}</p>
            </div>
            <div className={style["text-container"]}>
              <p>Total</p>
              <p>€{totalPrice}</p>
            </div>
            <BigPrimaryButton onClick={handleClick} label="Order" />
            <BigSecondaryButton
              onClick={handleNavigation}
              label="continue shopping"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
