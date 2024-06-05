import React, { useEffect, useState } from "react";
import {
  addFavorite,
  removeFavorite,
} from "../../../../core/modules/favorites/favorites.api";
import style from "./FavoriteButton.module.css";
import { useAuth } from "../../../Context/AuthContainer";

interface FavoriteButtonProps {
  productId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ productId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(productId));
    if (user) {
      setIsFavorite(user.favorites.includes(productId));
    }
  }, [productId, user]);

  const handleFavoriteToggle = () => {
    if (!user) {
      alert("Please login to like this product.");
      return;
    }
    if (isFavorite) {
      removeFavorite(productId)
        .then(() => setIsFavorite(false))
        .catch((error) => console.error("Error removing favorite:", error));
    } else {
      addFavorite(productId)
        .then(() => setIsFavorite(true))
        .catch((error) => console.error("Error adding favorite:", error));
    }
  };

  return (
    <button
      className={`${style.button} ${isFavorite ? style.active : ""}`}
      onClick={handleFavoriteToggle}
    >
      {isFavorite ? "Liked" : "Like Item"}{" "}
      {/* Display "Liked" if item is liked */}
    </button>
  );
};

export default FavoriteButton;
