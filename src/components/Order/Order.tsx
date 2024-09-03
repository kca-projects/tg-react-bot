import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import Cart from "../Cart/Cart";
import { CartItem, Food } from "../../types/types";
import { getData } from "../../db/db";


const foods = getData();

interface OrderProps {
  cartItems: CartItem[];
  onAdd: (food: Food) => void;
  onRemove: (food: Food) => void;
}

const Order: React.FC<OrderProps> = ({ cartItems, onAdd, onRemove }) => {
  const navigate = useNavigate();
  const tele: any = window.Telegram.WebApp;


  const onCheckout = () => {
    tele.MainButton.text = "View Order";
    tele.MainButton.show();
    navigate("/view-order");
  };

  return (
    <>
      <h1 className="heading">Order Food</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div className="cards__container">
        {foods.map((food: Food) => (
          <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
        ))}
      </div>
    </>
  );
};

export default Order;
