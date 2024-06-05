import React, { useState } from "react";
import styles from "./CountButton.module.css";

interface CountButtonProps {
  initialCount?: number;
  onCountChange?: (count: number) => void;
}

const CountButton: React.FC<CountButtonProps> = ({
  initialCount = 1,
  onCountChange,
}) => {
  const [count, setCount] = useState(initialCount);

  const handleDecrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      if (onCountChange) onCountChange(newCount);
    }
  };

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    if (onCountChange) onCountChange(newCount);
  };

  return (
    <div className={styles.countButton}>
      <button
        className={`${styles.button} ${styles.decrementButton}`}
        onClick={handleDecrement}
      >
        -
      </button>
      <span className={styles.count}>{count}</span>
      <button
        className={`${styles.button} ${styles.incrementButton}`}
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};

export default CountButton;
