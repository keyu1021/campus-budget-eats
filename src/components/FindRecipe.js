import React from "react";
import styles from "../styles/FindRecipe.module.css";
import { useState } from "react";

const recipes = [
  {
    name: "Spaghetti Carbonara",
    ingredients: ["spaghetti", "eggs", "bacon", "parmesan cheese"],
  },
  {
    name: "Chicken Alfredo",
    ingredients: ["fettuccine", "chicken", "heavy cream", "parmesan cheese"],
  },
  {
    name: "Beef Stroganoff",
    ingredients: ["beef", "egg noodles", "sour cream", "mushrooms"],
  },
  // add more recipes here
];

function FindRecipe() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search for a recipe"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className={styles.container}>
        <ul className={styles.recipeList}>
          {filteredRecipes.map((recipe, index) => (
            <li key={index} className={styles.recipeItem}>
              <h2>{recipe.name}</h2>
              <p>Ingredients: {recipe.ingredients.join(", ")}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default FindRecipe;
