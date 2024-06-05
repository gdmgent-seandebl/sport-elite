import React from "react";
import { Link } from "react-router-dom";
import style from "./SmallPrimaryButton.module.css";

interface SmallPrimaryButtonProps {
  label: string;
  isHovered: boolean;
  to: string;
}

const SmallPrimaryButton: React.FC<SmallPrimaryButtonProps> = ({
  label,
  isHovered,
  to,
}) => {
  const buttonStyle: React.CSSProperties = isHovered
    ? {
        backgroundColor: "#ff293b",
        color: "#FDFBFA",
      }
    : {};

  return (
    <Link to={to} className={style.btn} style={buttonStyle}>
      <span>{label}</span>
    </Link>
  );
};

export default SmallPrimaryButton;
