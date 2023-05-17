import { useContext } from "react";
import { useRouter } from "next/router";
import { RecipeContext } from "../../context/RecipeContext";
import Layout from "../../components/Layout";

function RecipePage() {
  const recipes = useContext(RecipeContext);
  const router = useRouter();
  const { name } = router.query;

  if (!name) {
    return <div>Loading...</div>;
  }

  const allRecipes = Object.values(recipes).flat();
  const currentRecipe = allRecipes.find(
    (recipe) => recipe.name.replaceAll(" ", "-").toLowerCase() === name
  );

  if (!currentRecipe) {
    return <div>Recipe Not Found</div>;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-medium mb-4">{currentRecipe.name}</h1>
      <div className="w-full h-64 bg-gray-200 mb-4"></div>{" "}
      {/* Placeholder Image */}
      <p>
        <strong className="font-bold">Servings:</strong>{" "}
        {currentRecipe.servings}
      </p>
      <p>
        <strong className="font-bold">Time to Cook:</strong>{" "}
        {currentRecipe.timeToCook}
      </p>
      <p className="mt-4 mb-2 font-bold text-lg">Ingredients:</p>
      <ul className="list-disc list-inside mb-4">
        {currentRecipe.ingredients.map((ingredient, index) => (
          <li key={index} className="capitalize">
            {ingredient}
          </li>
        ))}
      </ul>
      <p className="mt-4 mb-2 font-bold text-lg">Directions:</p>
      <ol className="list-decimal list-inside mb-4">
        {currentRecipe.directions.map((direction, index) => (
          <li key={index}>{direction}</li>
        ))}
      </ol>
    </Layout>
  );
}

export default RecipePage;
