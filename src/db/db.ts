import pizzaImg from "../images/pizza.png";
import burgerImg from "../images/burger.png";
import cocaImg from "../images/coca.png";
import saladImg from "../images/salad.png";
import waterImg from "../images/water.png";
import iceCreamImg from "../images/icecream.png";
import kebabImg from "../images/kebab.png";

export function getData() {
  return [
    { title: "ភីហ្សា", price: 17.99, Image: pizzaImg,id:1 },
    { title: "បឺហ្គឺ", price: 15, Image: burgerImg,id:2 },
    { title: "កូកាកូឡា", price: 3.5, Image: cocaImg ,id:3},
    { title: "ខេបាប់", price: 13.99, Image: kebabImg,id:4 },
    { title: "ញុំាសាឡាដ", price: 2.5, Image: saladImg,id:5 },
    { title: "ទឹកសុទ្ធ", price: 0.99, Image: waterImg,id:6 },
    { title: "ការ៉េម", price: 2.99, Image: iceCreamImg,id:7 },
  ];
}
