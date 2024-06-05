import React, { useEffect, useState } from "react";
import style from "./Dropdown.module.css";

interface DropdownProps {
  categories: string[];
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ categories, onChange }) => {
  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select className={style.dropdown} onChange={handleSelection}>
      <option value="">Sort by</option>
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
  );
};

export default Dropdown;
