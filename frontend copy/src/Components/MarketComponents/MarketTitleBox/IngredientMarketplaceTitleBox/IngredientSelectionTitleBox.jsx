import React from 'react';
import './IngredientSelectionTitleBox.css'; // Import the CSS file

function IngredientSelectionTitleBox() {
  const description = "Please select ingredients below ";

  return (
    <div className="ingredient-title-box">
      <h2>Ingredient Selection</h2>
      <p>{description}</p>
    </div>
  );
}

export default IngredientSelectionTitleBox;
