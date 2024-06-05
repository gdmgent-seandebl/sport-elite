import React from "react";
import style from "./BigPrimaryButton.module.css";

interface BigPrimaryButtonProps {
  onClick: () => void;
  label: string;
}

const BigPrimaryButton: React.FC<BigPrimaryButtonProps> = ({
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
