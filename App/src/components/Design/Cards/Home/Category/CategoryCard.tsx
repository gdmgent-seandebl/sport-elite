import React, { useState } from "react";
import style from "./CategoryCard.module.css";
import { Link } from "react-router-dom";
import SmallPrimaryButton from "../../../Buttons/Small/Primary/SmallPrimaryButton";

interface CategoryCardProps {
  imageUrl: string;
  link: string;
  buttonLabel: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  imageUrl,
  link,
  buttonLabel,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link
      to={link}
      className={style["card-link"]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={style.card}>
        <img src={imageUrl} alt="Image" className={style["card-image"]} />
        <div className={style["button-wrapper"]}>
          <SmallPrimaryButton
            label={buttonLabel}
            isHovered={isHovered}
            to={link}
          />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
