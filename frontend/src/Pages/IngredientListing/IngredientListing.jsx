import React, { useEffect, useState } from 'react';

function IngredientListing({ ingredientId }) {
  const [ingredient, setIngredient] = useState(null);

  useEffect(() => {
    // Fetch the ingredient details from an API or other data source
    fetch(`https://your-api/ingredients/${ingredientId}`)
      .then(response => response.json())
      .then(data => setIngredient(data))
      .catch(err => console.error('Error fetching ingredient details:', err));
  }, [ingredientId]);

  if (!ingredient) return <p>Loading...</p>;

  return (
    <div>
      <h1>{ingredient.name}</h1>
      <p>{ingredient.description}</p>
      {/* Display more ingredient details here */}
    </div>
  );
}

export default IngredientListing;
