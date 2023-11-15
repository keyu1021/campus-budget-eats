import React from "react";
import "../styles/Ingredients.css";
import Navigation from "./assets/Navigation";

const ingredientsData = [
  {
    category: "Meat",
    name: "Chicken",
    price: "9.99",
    unit: "lb",
    icon: "./icons/chicken.png",
  },
  {
    category: "Meat",
    name: "Short Ribs",
    price: "12.59",
    unit: "lb",
    icon: "./icons/ribs.png",
  },
  {
    category: "Meat",
    name: "Steak",
    price: "14.59",
    unit: "lb",
    icon: "./icons/steak.png",
  },
  {
    category: "Vegetables",
    name: "Broccoli",
    price: "3.49",
    unit: "ea",
    icon: "./icons/broccoli.png",
  },
  {
    category: "Vegetables",
    name: "Cabbage",
    price: "1.99",
    unit: "lb",
    icon: "./icons/cabbage.png",
  },
  {
    category: "Vegetables",
    name: "Carrot",
    price: "3.99",
    unit: "ea",
    icon: "./icons/carrot.png",
  },
  {
    category: "Carbohydrates",
    name: "Rice",
    price: "4.59",
    unit: "lb",
    icon: "./icons/rice.png",
  },
  {
    category: "Carbohydrates",
    name: "Pasta",
    price: "2.49",
    unit: "ea",
    icon: "./icons/pasta.png",
  },
  {
    category: "Carbohydrates",
    name: "Bread",
    price: "2.50",
    unit: "ea",
    icon: "./icons/bread.png",
  },
];

const Ingredient = ({ name, price, unit, icon }) => (
  <div className="ingredient">
    <img src={icon} className="ingredient-icon" />
    <div className="ingredient-name">{name}</div>
    <div className="ingredient-price">
      ${price}/{unit}
    </div>
  </div>
);

// The list component for Ingredients
const Ingredients = () => {
  return (
    <div className="ingredients-page">
      <Navigation />
      <h1 className="ingredients-header">Your Weekly Grocery Picks</h1>
      <button className="turn-recipes-btn">Turn into Recipes</button>
      <div className="ingredients-container">
        {ingredientsData.map((ingredient) => (
          <Ingredient
            name={ingredient.name}
            price={ingredient.price}
            unit={ingredient.unit}
            icon={ingredient.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Ingredients;
