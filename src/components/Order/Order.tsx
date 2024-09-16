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


  if (cartItems.length > 0) {
    tele.MainButton.text = "View Order";
    tele.MainButton.show();
    tele.MainButton.style = {
    backgroundColor: '#1b19bd',  
    color: '#fff',               
    fontSize: '16px',            
    borderRadius: '5px',         
    padding: '10px 20px'
  };
    tele.MainButton.onClick(() => {
      navigate("/view-order");
    });
    
  }else{
    tele.MainButton.hide();
  }


  const onCheckout = () => {
    navigate("/");
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
