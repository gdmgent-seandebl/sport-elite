import useFetch from "../../../hooks/useFetch";
import { getProducts } from "../../../core/modules/products/products.api";
import ProductCard from "../../../components/Design/Cards/Products/ProductCard";
import Dropdown from "../../../components/Design/Buttons/Dropdown/Dropdown";
import CheckboxGroup from "../../../components/Design/Categories/CheckboxGroup/CheckboxGroup";
import Header from "../../../components/Design/Header/Header";
import {
  ageCategories,
  brandCategories,
  gripCategories,
  weightCategories,
} from "../../../consts/Categories";
import useStores from "../../../hooks/useStores";
import style from "./index.module.css";
import { useEffect, useState } from "react";

const Products: React.FC = () => {
  const { productStore } = useStores();
  const { isLoading, data, error } = useFetch(
    getProducts,
    productStore.products
  );

  const [sortBy, setSortBy] = useState<string>("");

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const [selectedAge, setSelectedAge] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [selectedGrip, setSelectedGrip] = useState<string[]>([]);
  const [selectedWeight, setSelectedWeight] = useState<string[]>([]);

  useEffect(() => {
    if (productStore.products.length < 1 && data)
      productStore.setProducts(data);
  }, [data, productStore]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCheckboxChange = (category: string, value: string) => {
    const stateSetters: Record<
      string,
      React.Dispatch<React.SetStateAction<string[]>>
    > = {
      Age: setSelectedAge,
      Brand: setSelectedBrand,
      "Grip size": setSelectedGrip,
      "Weight class": setSelectedWeight,
    };

    const setState = stateSetters[category];
    if (setState) {
      setState((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  const filterProducts = () => {
    let filteredProducts = data || [];

    // Apply filters
    filteredProducts = filteredProducts.filter((product) => {
      const matchesAge =
        selectedAge.length === 0 || selectedAge.includes(product.age);
      const matchesBrand =
        selectedBrand.length === 0 || selectedBrand.includes(product.brand);
      const matchesGrip =
        selectedGrip.length === 0 || selectedGrip.includes(product.grip);
      const matchesWeight =
        selectedWeight.length === 0 || selectedWeight.includes(product.weight);
      return matchesAge && matchesBrand && matchesGrip && matchesWeight;
    });

    // Apply sorting
    if (sortBy === "asc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "desc") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
  };

  const filteredProducts = filterProducts();

  return (
    <>
      <Header />
      <div className={style["content-wrapper"]}>
        <div className={style["text-wrapper"]}>
          <p className={style["breadcrumbs"]}>
            Home / Sports / Tennis / Tennis Rackets
          </p>
          <h2>Tennis rackets</h2>
          <p>
            Discover the perfect balance between power, precision and control
            with our extensive collection of tennis rackets. Whether you are a
            novice player or a seasoned professional, we have the ideal racket
            for every playing style.
          </p>
        </div>
        <div className={style["content"]}>
          <div className={style["categories"]}>
            <CheckboxGroup
              title="Age"
              categories={ageCategories}
              selectedValues={selectedAge}
              onChange={handleCheckboxChange}
            />
            <CheckboxGroup
              title="Brand"
              categories={brandCategories}
              selectedValues={selectedBrand}
              onChange={handleCheckboxChange}
            />
            <CheckboxGroup
              title="Grip size"
              categories={gripCategories}
              selectedValues={selectedGrip}
              onChange={handleCheckboxChange}
            />
            <CheckboxGroup
              title="Weight class"
              categories={weightCategories}
              selectedValues={selectedWeight}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className={style["product-wrapper"]}>
            <div className={style["sort"]}>
              <p className={style["product-count"]}>
                {filteredProducts?.length} products
              </p>
              <Dropdown
                categories={["asc", "desc"]}
                onChange={handleSortChange}
              />
            </div>
            <div className={style["products"]}>
              {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product._id} productData={product} />
                ))
              ) : (
                <p>No products available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
