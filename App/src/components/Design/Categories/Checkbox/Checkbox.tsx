import React from "react";
import style from "./Checkbox.module.css";

interface CheckboxProps {
  category: string;
  value: string;
  isChecked: boolean;
  onChange: (category: string, value: string) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  category,
  value,
  isChecked,
  onChange,
}) => {
  return (
    <label className={style["checkbox-label"]}>
      <input
        type="checkbox"
        value={value}
        checked={isChecked}
        onChange={() => onChange(category, value)}
      />
      <span>{value}</span>
    </label>
  );
};

export default Checkbox;
