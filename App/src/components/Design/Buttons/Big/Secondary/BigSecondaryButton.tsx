import React from "react";
import style from "./BigSecondaryButton.module.css";

interface BigSecondaryButtonProps {
  onClick: () => void;
  label: string;
}

const BigPrimaryButton: React.FC<BigSecondaryButtonProps> = ({
  onClick,
  label,
}) => {
  return (
    <button className={style.btn} onClick={onClick}>
      {label}
    </button>
  );
};

export default BigPrimaryButton;
