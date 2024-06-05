import React from "react";
import Checkbox from "../Checkbox/Checkbox";
import style from "./CheckboxGroup.module.css";

interface CheckboxGroupProps {
  title: string;
  categories: string[];
  selectedValues: string[];
  onChange: (category: string, value: string) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  title,
  categories,
  selectedValues,
  onChange,
}) => (
  <div className={style.category}>
    <h4>{title}</h4>
    {categories.map((category) => (
      <Checkbox
        key={category}
        category={title}
        value={category}
        isChecked={selectedValues.includes(category)}
        onChange={onChange}
      />
    ))}
  </div>
);

export default CheckboxGroup;
