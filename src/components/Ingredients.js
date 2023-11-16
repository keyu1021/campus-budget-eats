import React from "react";
import styles from "../styles/Ingredients.module.css";
import Navigation from "./assets/Navigation";
//import "../styles/Ingredients.css";

const ingredientsData = [
  {
    category: "Protein",
    name: "Chicken",
    price: "9.99",
    unit: "lb",
    icon: "./icons/chicken.png",
  },
  {
    category: "Protein",
    name: "Short Ribs",
    price: "12.59",
    unit: "lb",
    icon: "./icons/ribs.png",
  },
  {
    category: "Protein",
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
  {
    category: "Protein",
    name: "Egg",
    price: "3.99",
    unit: "ea",
    icon: "./icons/egg.png",
  },
  {
    category: "Protein",
    name: "Tofu",
    price: "1.99",
    unit: "ea",
    icon: "./icons/tofu.png",
  },
  {
    category: "Vegetables",
    name: "Onion",
    price: "2.49",
    unit: "lb",
    icon: "./icons/onion.png",
  },
  {
    category: "Vegetables",
    name: "Cherry Tomato",
    price: "4.49",
    unit: "lb",
    icon: "./icons/cherrytomato.png",
  },
  {
    category: "Protein",
    name: "Bacon",
    price: "4.49",
    unit: "lb",
    icon: "./icons/bacon.png",
  },
  {
    category: "Protein",
    name: "Cheese",
    price: "7.49",
    unit: "ea",
    icon: "./icons/cheese.png",
  },
];

const Ingredient = ({ name, price, unit, icon }) => (
  <div className={styles.ingredient}>
    <img src={icon} className={styles.ingredientIcon} />
    <div className={styles.ingredientName}>{name}</div>
    <div className={styles.ingredientPrice}>
      ${price}/{unit}
    </div>
  </div>
);

const Ingredients = () => {
  return (
    <React.Fragment>
      <Navigation />
      <div className={styles.ingredientsPage}>
        <h1 className={styles.ingredientsHeader}>Your Weekly Grocery Picks</h1>
        <button className={styles.turnRecipesBtn}>Turn into Recipes</button>
        <div className={styles.ingredientsContainer}>
          {ingredientsData.map((ingredient, index) => (
            <Ingredient
              key={index} // It's important to provide a unique key for list items
              name={ingredient.name}
              price={ingredient.price}
              unit={ingredient.unit}
              icon={ingredient.icon}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Ingredients;
