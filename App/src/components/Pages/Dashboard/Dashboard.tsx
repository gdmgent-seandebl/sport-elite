import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContainer";
import Header from "../../../components/Design/Header/Header";
import { Product } from "../../../core/modules/products/products.types";
import {
  getProducts,
  createProduct,
} from "../../../core/modules/products/products.api";
import ProductCard from "../../../components/Design/Cards/Products/ProductCard";
import ProductForm from "../../Form/ProductForm";
import style from "./Dashboard.module.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const fetchedProducts = await fetchProducts(user._id);
          setProducts(fetchedProducts);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  const fetchProducts = async (userId: string): Promise<Product[]> => {
    const allProductsResponse = await getProducts();
    const filteredProducts = allProductsResponse.data.filter(
      (product) => product.sellerId === userId
    );
    return filteredProducts;
  };

  const handleProductSubmit = async (
    product: Omit<Product, "_id" | "sellerId">
  ) => {
    if (user) {
      const productToCreate = { ...product, sellerId: user._id };
      try {
        await createProduct(productToCreate);
        const fetchedProducts = await fetchProducts(user._id);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error creating product:", error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className={style["content-wrapper"]}>
        <h2>Welcome, {user ? user.name : "Guest"}</h2>
        <h3>Create a product</h3>
        <ProductForm onSubmit={handleProductSubmit} />
        <h3>Your Products</h3>
        <div className={style["products"]}>
          {loading ? (
            <div>Loading...</div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} productData={product} />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
