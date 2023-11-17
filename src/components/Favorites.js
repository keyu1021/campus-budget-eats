import React, { useState, useEffect } from "react";
import styles from "../styles/Favorites.module.css";
import Navigation from "./assets/Navigation";
import Modal from "./assets/Modal";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (recipeName) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.name !== recipeName
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const openModal = (recipe) => {
    setSelectedRecipe(recipe); // Set the clicked recipe as the selected recipe
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null); // Reset the selected recipe
  };

  return (
    <>
      <Navigation />

      <h1>Your Favorite Recipes</h1>

      <div className={styles.favoritesContainer}>
        <ul className={styles.favoritesList}>
          {favorites.map((recipe, index) => (
            <li key={index} className={styles.favoriteItem}>
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className={styles.recipeImage}
              />
              <h2>{recipe.name}</h2>
              <p>Ingredients: {recipe.ingredients.join(", ")}</p>
              <p className={styles.recipePrice}>
                Estimated Price: ${recipe.price}
              </p>
              <button
                className={styles.removeButton}
                onClick={() => removeFavorite(recipe.name)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Favorites;
