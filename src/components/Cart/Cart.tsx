import React from "react";
import "./Cart.css";
import Button from "../Button/Button";

interface CartItem {
  price: number;
  quantity: number;
  id: string | number;
  // Add any other properties your cart items might have
}

interface CartProps {
  cartItems: CartItem[];
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onCheckout }) => {
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);

  return (
    <div className="cart__container">
      {cartItems.length === 0 ? "No items in cart" : ""}
      <br />
      <span className="">Total Price: ${totalPrice.toFixed(2)}</span>
      <Button
        title={`${cartItems.length === 0 ? "Order!" : "Checkout"} `}
        type={"checkout"}
        disable={cartItems.length === 0}
        onClick={onCheckout}
      />
    </div>
  );
};

export default Cart;
