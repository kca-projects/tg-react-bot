import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card/Card";
import Cart from "./components/Cart/Cart";
import { getData } from "./db/db";
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
const allowedPublicIP = "96.9.70.228";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    tele.ready();

    const checkUserIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        const userPublicIP = data.ip;

        if (userPublicIP !== allowedPublicIP) {
          document.body.innerHTML = "<h1>Access Denied: You must be connected to the abc-wifi network.</h1>";
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
    tele.MainButton.text = "Pay :)";
    tele.MainButton.show();
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
}

export default App;
