import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem, Food } from "../../types/types";
import "./ViewOrder.css";

interface ViewOrderProps {
  cartItems: CartItem[];
  onAdd: (food: Food) => void;
  onRemove: (food: Food) => void;
}
const ViewOrder: React.FC<ViewOrderProps> = ({ cartItems }) => {
  const [comment, setComment] = useState("");
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const navigate = useNavigate();
  const tele: any = window.Telegram.WebApp;



  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0.00);
  tele.MainButton.text = `Pay ${total.toFixed(2)} $`;
  tele.MainButton.show();
  tele.MainButton.onClick(() => {
      navigate("/payment-method"); 
    });
 
  return (
    <div className="container">
      <div className="order-container">
        <div className="order-header">
          <h3>Your Order</h3>
          <a href="/" className="edit-link">Edit</a>
        </div>

        <div className="order-items">
          {cartItems.length === 0 ? (
            <p>No items in your order.</p>
          ) :
            cartItems.map((item, index) => (
              <div key={index} className="order-item">
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <div className="image-container">
                    <img src={item.Image} alt={item.title} className="item-image" />
                  </div>
                  <h4>{item.title}</h4>
                </div>
                <div className="item-price">${item.price.toFixed(2)}</div>
              </div>
            ))}
        </div>
        {cartItems.length > 0 && (
          <div className="add-comment">
            <textarea value={comment}
              onChange={handleCommentChange} placeholder="Add comment..." />
          </div>)}
      </div>
    </div>
  );
};

export default ViewOrder;
