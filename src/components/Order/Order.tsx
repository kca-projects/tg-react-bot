import Card from "../Card/Card";
import Cart from "../Cart/Cart";
import { getData } from "../../db/db";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const foods = getData();

interface Food {
  id: string | number;
  title: string;
  Image: string;
  price: number;
}

interface CartItem extends Food {
  quantity: number;
}
const Order = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const tele: any = window.Telegram.WebApp;
  
  const onAdd = (food: Food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  const onRemove = (food: Food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist && exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    } else if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  const onCheckout = () => {
    tele.MainButton.text = "Pay";
    tele.MainButton.show();

    navigate("/pay");
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
