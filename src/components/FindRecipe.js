import React from "react";
import styles from "../styles/FindRecipe.module.css";
import { useState } from "react";
import Navigation from "./assets/Navigation";
import Modal from "./assets/Modal";

const recipes = [
  {
    name: "Beef Stir Fry",
    type: "Meat",
    ingredients: ["Beef", "Brocolli", "Soy sauce", "Garlic"],
    imageUrl: "./images/beef-stir-fry.jpg",
    price: "13.00",
    instructions: [
      "Slice the beef into thin strips.",
      "Stir fry the beef strips in a hot pan until browned.",
      "Add the brocolli and cook until they're tender.",
      "Pour in soy sauce and add grated ginger and garlic to taste.",
      "Serve hot over cooked rice or noodles.",
    ],
  },
  {
    name: "Cherry Tomato Pasta",
    type: "Vegetarian",
    ingredients: ["Pasta", "Cherry tomatoes", "Garlic", "Olive oil", "Basil"],
    imageUrl: "./images/cherry-tomato-pasta.jpg",
    price: "15.00",
    instructions: [
      "Cook pasta in salted boiling water until al dente.",
      "In a pan, sauté garlic in olive oil until fragrant.",
      "Halve cherry tomatoes and add them to the pan, cooking until soft.",
      "Toss the cooked pasta with the tomato mixture.",
      "Garnish with fresh basil and grated Parmesan cheese before serving.",
    ],
  },
  {
    name: "Tofu Tacos",
    type: "Vegan",
    ingredients: ["Tofu", "Taco shells", "Lettuce", "Salsa", "Avocado"],
    imageUrl: "./images/tofu-tacos.jpg",
    price: "12.00",
    instructions: [
      "Slice the tofu into thin strips.",
      "Sauté the tofu in a pan until browned.",
      "Assemble the tacos with tofu, lettuce, salsa, and avocado.",
    ],
  },
  {
    name: "Greek Chicken Bowl",
    type: "Meat",
    ingredients: [
      "Chicken",
      "Rice",
      "Cucumbers",
      "Tomatoes",
      "Feta cheese",
      "Olives",
    ],
    imageUrl: "./images/greek-chicken-bowl.jpg",
    price: "11.00",
    instructions: [
      "Cook rice in salted boiling water until tender.",
      "Grill chicken until cooked through.",
      "Assemble the bowl with rice, chicken, cucumbers, tomatoes, feta cheese, and olives.",
    ],
  },
  {
    name: "BLT Sandwich",
    type: "Meat",
    ingredients: ["Bacon", "Bread", "Lettuce", "Tomato"],
    imageUrl: "./images/btl-sandwich.jpg",
    price: "8.00",
    instructions: [
      "Cook bacon in a pan until crispy.",
      "Toast bread until golden brown.",
      "Assemble the sandwich with bacon, lettuce, tomato, and mayonnaise.",
    ],
  },
  {
    name: "Chickpea Curry",
    type: "Vegetarian",
    ingredients: [
      "Chickpeas",
      "Coconut milk",
      "Curry powder",
      "Tomatoes",
      "Onion",
    ],
    imageUrl: "./images/chickpea-curry.jpg",
    price: "12.00",
    instructions: [
      "Dice the onion and sauté in a pan until soft.",
      "Add the curry powder and cook until fragrant.",
      "Add the chickpeas, coconut milk, and tomatoes.",
      "Simmer until the sauce has thickened.",
      "Serve hot over cooked rice.",
    ],
  },
];

function FindRecipe() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [favorites, setFavorites] = useState(new Set()); // Using a Set for favorites
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to track the selected recipe

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType ? recipe.type === filterType : true)
  );

  const toggleFavorite = (recipeName) => {
    setFavorites((prevFavorites) => {
      // Check if the recipe is already favorited
      const isFavorited = Array.from(prevFavorites).some(
        (favRecipe) => favRecipe.name === recipeName
      );

      let updatedFavorites;
      if (isFavorited) {
        // If it's favorited, create a new set without this recipe
        updatedFavorites = new Set(
          Array.from(prevFavorites).filter(
            (favRecipe) => favRecipe.name !== recipeName
          )
        );
      } else {
        // If it's not favorited, create a new set with this recipe added
        const recipeToAdd = recipes.find(
          (recipe) => recipe.name === recipeName
        );
        updatedFavorites = new Set([...Array.from(prevFavorites), recipeToAdd]);
      }

      // Update localStorage
      localStorage.setItem(
        "favorites",
        JSON.stringify(Array.from(updatedFavorites))
      );

      return updatedFavorites;
    });
  };
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
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search for a recipe"
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        <select
          className={styles.filterDropdown}
          value={filterType}
          onChange={handleFilterChange}
        >
          <option value="">Filter by Type</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Meat">Meat</option>
        </select>
      </div>

      <div className={styles.container}>
        <ul className={styles.recipeList}>
          {filteredRecipes.map((recipe, index) => (
            <li key={index} className={styles.recipeItem}>
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className={styles.recipeImage}
              />
              <h2>{recipe.name}</h2>
              {/* <p>Ingredients: {recipe.ingredients.join(", ")}</p> */}
              <p>Type: {recipe.type}</p>
              <p className={styles.recipePrice}>
                Estimated Price: ${recipe.price}
              </p>

              <div className={styles.buttonContainer}>
                <button
                  className={styles.favoriteButton}
                  onClick={() => toggleFavorite(recipe.name)}
                >
                  {Array.from(favorites).some(
                    (favRecipe) => favRecipe.name === recipe.name
                  )
                    ? "♥"
                    : "♡"}
                </button>

                <button
                  className={styles.openButton}
                  onClick={() => openModal(recipe)}
                >
                  See the Recipe
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedRecipe && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          recipe={selectedRecipe}
        />
      )}
    </>
  );
}

export default FindRecipe;
