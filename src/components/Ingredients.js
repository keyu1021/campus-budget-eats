import React, { useEffect, useState } from "react";
import styles from "../styles/Ingredients.module.css";
import Navigation from "./assets/Navigation";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, getFirestore } from "firebase/firestore";

//import "../styles/Ingredients.css";

const ingredientsData = [
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

const Ingredient = ({ id, name, price, unit, icon, isSelected, onToggle }) => {
  // Define a click handler for the ingredient box
  const handleClick = () => {
    onToggle(id);
  };

  return (
    <div
      className={`${styles.ingredient} ${isSelected ? styles.selected : ""}`}
      onClick={handleClick}
    >
      <img src={icon} alt={name} className={styles.ingredientIcon} />
      <div className={styles.ingredientName}>{name}</div>
      <div className={styles.ingredientPrice}>
        ${price}/{unit}
      </div>
      {/* The checkbox can be hidden if not needed */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => {}}
        className={styles.hiddenCheckbox}
      />
    </div>
  );
};

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState(new Set());
  const [filterCategory, setFilterCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ingredients"));
        const fetchedIngredients = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIngredients(fetchedIngredients);

        // Extract and set categories after fetching ingredients
        const fetchedCategories = new Set(
          fetchedIngredients.map((ing) => ing.category)
        );
        setCategories(Array.from(fetchedCategories));
        console.log("Categories:", Array.from(fetchedCategories)); // Debugging
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, [db]);

  const handleIngredientSelection = (ingredientName) => {
    setSelectedIngredients((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(ingredientName)) {
        newSelected.delete(ingredientName);
      } else {
        newSelected.add(ingredientName);
      }
      return newSelected;
    });
  };

  const goToFindRecipe = () => {
    navigate("/findrecipe");
  };

  // Only include ingredients that match the selected category,
  // or include all if 'All' is selected
  const displayedIngredients =
    filterCategory === "All"
      ? ingredients
      : ingredients.filter(
          (ingredient) => ingredient.category === filterCategory
        );

  useEffect(() => {
    console.log("Selected Ingredients saves", selectedIngredients);
    localStorage.setItem(
      "selectedIngredients",
      JSON.stringify(Array.from(selectedIngredients))
    );
  }, [selectedIngredients]);

  return (
    <React.Fragment>
      <Navigation />
      <div className={styles.ingredientsPage}>
        <h1 className={styles.ingredientsHeader}>Your Weekly Grocery Picks</h1>
        <p className={styles.instructions}>
          Select the items you want and turn them into recipes.
        </p>

        <div className={styles.filterContainer}>
          <select
            className={styles.categoryFilter}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.ingredientsContainer}>
          {displayedIngredients.map((ingredient) => (
            <Ingredient
              key={ingredient.id}
              {...ingredient}
              isSelected={selectedIngredients.has(ingredient.name)}
              onToggle={() => handleIngredientSelection(ingredient.name)}
            />
          ))}
        </div>

        <button className={styles.saveButton} onClick={goToFindRecipe}>
          Turn into Recipes
        </button>
      </div>
    </React.Fragment>
  );
};

export default Ingredients;
