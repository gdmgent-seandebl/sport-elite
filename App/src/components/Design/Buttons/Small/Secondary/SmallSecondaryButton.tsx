import React from "react";
import { Link } from "react-router-dom";
import style from "./SmallSecondaryButton.module.css";

interface SmallSecondaryButtonProps {
  to: string;
  label: string;
}

const SmallSecondaryButton: React.FC<SmallSecondaryButtonProps> = ({
  to,
  label,
}) => {
  return (
    <Link to={to} className={style.btn}>
      <span>{label}</span>
    </Link>
  );
};

export default SmallSecondaryButton;
