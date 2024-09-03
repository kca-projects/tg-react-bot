import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Order from "./components/Order/Order";
import ViewOrder from "./components/ViewOrder/ViewOrder";
import { CartItem, Food } from "./types/types";

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        MainButton: {
          text: string;
          show: () => void;
        };
      };
    };
  }
}

const tele: any = window.Telegram.WebApp;
const allowedPublicIP = "43.230.193.188";

function App() {
  useEffect(() => {
    tele.ready();

    const checkUserIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        const userPublicIP = data.ip;

        if (userPublicIP !== allowedPublicIP) {
          document.body.innerHTML =
            "<h1>Access Denied: You must be connected to the abc-wifi network.</h1>";
        } else {
          window.Telegram.WebApp.ready();
        }
      } catch (error) {
        console.error("Error fetching public IP:", error);
        document.body.innerHTML = "<h1>Internal Server Error</h1>";
      }
    };

    checkUserIP();
  }, []);

  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  // Handle adding items to the cart
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

  // Handle removing items from the cart
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
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Order cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />}
        />
        <Route
          path="/view-order"
          element={
            <ViewOrder
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
