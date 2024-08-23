import React from "react";
import "./Button.css";

interface ButtonProps {
  type: "add" | "remove" | "checkout"; // Restricting type to specific strings
  title: string;
  disable?: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  type,
  title,
  disable = false,
  onClick,
}) => {
  const getClassName = () => {
    switch (type) {
      case "add":
        return "add";
      case "remove":
        return "remove";
      case "checkout":
        return "checkout";
      default:
        return ""; // Or a default class name if needed
    }
  };

  return (
    <button
      className={`btn ${getClassName()}`}
      disabled={disable}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
