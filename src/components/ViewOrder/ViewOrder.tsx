import React, { useState } from "react";
import { CartItem, Food } from "../../types/types";


interface ViewOrderProps {
  cartItems: CartItem[];
  onAdd: (food: Food) => void;
  onRemove: (food: Food) => void;
}

const ViewOrder: React.FC<ViewOrderProps> = ({ cartItems, onAdd, onRemove }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="view-order">
      <h1>Your Order</h1>
      {cartItems.length === 0 ? (
        <p>No items in your order.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <h2>{item.title}</h2>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => onAdd(item)}>+</button>
            <button onClick={() => onRemove(item)}>-</button>
          </div>
        ))
      )}
      {cartItems.length > 0 && (
        <>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Add a comment"
          />
          <button onClick={() => alert("Proceed to Payment")}>Pay</button>
        </>
      )}
    </div>
  );
};

export default ViewOrder;
