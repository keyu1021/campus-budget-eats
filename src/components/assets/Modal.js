import React from "react";
import styles from "../../styles/Modal.module.css"; // Ensure you have the corresponding CSS

const Modal = ({ isOpen, onClose, recipe }) => {
  if (!isOpen || !recipe) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          ⓧ
        </button>

        <h2>{recipe.name}</h2>

        <img src={recipe.imageUrl} alt={recipe.name} />
        <h3>Type: {recipe.type}</h3>
        <p>Ingredients: {recipe.ingredients.join(", ")}</p>

        <h3>Instructions</h3>
        <ol>
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        <p className={styles.recipePrice}>Estimated Price: ${recipe.price}</p>
      </div>
    </div>
  );
};

export default Modal;
