import { useContext } from "react";
import { useRouter } from "next/router";
import { RecipeContext } from "../../context/RecipeContext";
import Layout from "../../components/Layout";
import Form from "../../components/Form";

function RecipePage() {
  const router = useRouter();
  const { recipes, setEditing, setRecipeToEdit, openModalWithContent } =
    useContext(RecipeContext);
  const { name } = router.query;

  if (!name) {
    return <div>Loading...</div>;
  }

  const allRecipes = Object.values(recipes).flat();
  const currentRecipe = allRecipes.find(
    (recipe) => recipe.name.replaceAll(" ", "-").toLowerCase() === name
  );

  if (!currentRecipe) {
    return (
      <Layout>
        <div>Recipe Not Found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-medium">{currentRecipe.name}</h1>
        <button
          className="h-4 ml-2 mt-1"
          onClick={() => {
            setEditing(true);
            setRecipeToEdit(currentRecipe);
            openModalWithContent(<Form />);
          }}
        >
          <svg
            viewBox="0 0 24 24"
            height="100%"
            fill="none"
            stroke="#2563eb"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8"></path>
            <polygon points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8"></polygon>
          </svg>
        </button>
      </div>
      <div className="w-full h-64 bg-gray-200 mb-4"></div>
      {/* Placeholder Image */}
      <p>
        <strong className="font-bold">Servings: </strong>
        {currentRecipe.servings}
      </p>
      <p>
        <strong className="font-bold">Time to Cook: </strong>
        {currentRecipe.timeToCook} minutes
      </p>
      <p className="mt-4 mb-2 font-bold text-lg">Ingredients:</p>
      <ul className="list-disc list-inside mb-4">
        {currentRecipe.ingredients?.map((ingredient, index) => {
          let { name, quantity, unit } = ingredient;
          if (unit === "units") unit = "";
          else if (unit === "cups" && quantity === "1") unit = "cup";
          return (
            <li key={index}>
              {quantity} {unit} {name.toLowerCase()}
            </li>
          );
        })}
      </ul>
      <p className="mt-4 mb-2 font-bold text-lg">Directions:</p>
      <ol className="list-decimal list-inside mb-4">
        {currentRecipe.directions?.map((direction, index) => (
          <li key={index}>{direction}</li>
        ))}
      </ol>
    </Layout>
  );
}

export default RecipePage;
