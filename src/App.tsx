import { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Order from "./components/Order/Order";
import Payment from "./components/Payment/Payment";

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Order />} />
        <Route path="/pay" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
