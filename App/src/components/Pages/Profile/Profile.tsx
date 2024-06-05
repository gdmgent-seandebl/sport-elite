import React, { useEffect, useState } from "react";
import Header from "../..//Design/Header/Header";
import { useAuth } from "../../Context/AuthContainer";
import { getProductById } from "../../../core/modules/products/products.api";
import ProductCard from "../../Design/Cards/Products/ProductCard";
import { Product } from "../../../core/modules/products/products.types";
import { getOrders } from "../../../core/modules/orders/orders.api";
import { Order } from "../../../core/modules/orders/order.types";
import style from "./Profile.module.css";

const Profile = () => {
  const { user } = useAuth();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const favoriteProducts = await fetchFavoriteProducts(user.favorites);
          setFavoriteProducts(favoriteProducts);

          const orders = await fetchOrders();
          setOrders(orders);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  const fetchFavoriteProducts = async (favorites: string[]) => {
    const favoritePromises = favorites.map((productId: string) =>
      getProductById(productId)
    );
    const favoriteResponses = await Promise.all(favoritePromises);
    return favoriteResponses.map((response) => response.data);
  };

  const fetchOrders = async () => {
    const orderResponse = await getOrders();
    return orderResponse.data;
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {};

  return (
    <>
      <Header />
      <div className={style["content-wrapper"]}>
        <h2>Hi, {user.name}</h2>
        <h3>Your favorite products</h3>
        <div className={style["favorites"]}>
          {loading ? (
            <div>Loading favorite products...</div>
          ) : favoriteProducts.length > 0 ? (
            favoriteProducts.map((product) => (
              <ProductCard key={product._id} productData={product} />
            ))
          ) : (
            <p>You have no favorite products.</p>
          )}
        </div>
        <h3>Your orders</h3>
        <div className={style["orders"]}>
          {loading ? (
            <div>Loading orders...</div>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <div className={style["order"]} key={order._id}>
                <p>
                  <strong>Products: </strong>
                  {order.products && order.products.length > 0 ? (
                    order.products.map((product) => (
                      <span key={product.productId._id}>
                        {product.productId.name},{" "}
                      </span>
                    ))
                  ) : (
                    <span>No products in this order.</span>
                  )}
                </p>
                <p>
                  <strong>Total: </strong> <span>€{order.total}</span>
                </p>
                <p>
                  <strong>Status: </strong> <span>{order.status}</span>
                </p>
              </div>
            ))
          ) : (
            <p>You have no orders.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
