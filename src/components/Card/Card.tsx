import React, { useState } from "react";
import "./Card.css";
import Button from "../Button/Button";

interface Food {
  title: string;
  Image: string;
  price: number;
  id: string | number;
}

interface CardProps {
  food: Food;
  onAdd: (food: Food) => void;
  onRemove: (food: Food) => void;
}

const Card: React.FC<CardProps> = ({ food, onAdd, onRemove }) => {
  const [count, setCount] = useState<number>(0);
  const { title, Image, price } = food;

  const handleIncrement = () => {
    setCount(count + 1);
    onAdd(food);
  };

  const handleDecrement = () => {
    setCount(count - 1);
    onRemove(food);
  };

  return (
    <div className="card">
      <span className={`${count !== 0 ? "card__badge" : "card__badge--hidden"}`}>
        {count}
      </span>
      <div className="image__container">
        <img src={Image} alt={title} />
      </div>
      <h4 className="card__title">
        {title} . <span className="card__price">$ {price}</span>
      </h4>

      <div className="btn-container">
        <Button title={"+"} type={"add"} onClick={handleIncrement} />
        {count !== 0 ? (
          <Button title={"-"} type={"remove"} onClick={handleDecrement} />
        ) : null}
      </div>
    </div>
  );
};

export default Card;
