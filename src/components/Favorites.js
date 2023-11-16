import React, { useState, useEffect } from "react";
import styles from "../styles/Favorites.module.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (recipeName) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite !== recipeName
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className={styles.favoritesContainer}>
      <h1>Your Favorite Recipes</h1>
      <ul className={styles.favoritesList}>
        {favorites.map((recipeName, index) => (
          <li key={index} className={styles.favoriteItem}>
            <h2>{recipeName}</h2>
            <button onClick={() => removeFavorite(recipeName)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
