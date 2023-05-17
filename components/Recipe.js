function Recipe({ recipe }) {
  return (
    <div>
      <h2 className="text-2xl">{recipe.name}</h2>
      <p>{recipe.description}</p>
      <p>
        <strong>Ingredients:</strong>
      </p>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p>
        <strong>Directions:</strong>
      </p>
      <ol>
        {recipe.directions.map((direction, index) => (
          <li key={index}>{direction}</li>
        ))}
      </ol>
      <p>
        <strong>Servings:</strong> {recipe.servings}
      </p>
      <p>
        <strong>Time to Cook:</strong> {recipe.timeToCook}
      </p>
    </div>
  );
}

export default Recipe;
