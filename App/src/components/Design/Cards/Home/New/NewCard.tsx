import React from "react";
import style from "./NewCard.module.css";
import { Link } from "react-router-dom";

interface NewCardProps {
  imageUrl: string;
  link: string;
  text: string;
}

const NewCard: React.FC<NewCardProps> = ({ imageUrl, link, text }) => {
  return (
    <Link to={link} className={style["card-link"]}>
      <div className={style.card}>
        <img src={imageUrl} alt="Image" className={style["card-image"]} />
        <div className={style["image-overlay"]} />
        <div className={style["card-text"]}>{text}</div>
      </div>
    </Link>
  );
};

export default NewCard;
