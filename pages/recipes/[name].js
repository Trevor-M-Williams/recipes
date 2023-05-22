import { useContext } from "react";
import { useRouter } from "next/router";
import { RecipeContext } from "../../context/RecipeContext";
import Layout from "../../components/Layout";
import Form from "../../components/Form";
import Image from "next/image";

import defaultImage from "../../public/images/default.jpg";

function RecipePage() {
  const router = useRouter();
  const { recipes, setEditing, setRecipeToEdit, openModalWithContent, dev } =
    useContext(RecipeContext);
  const { name } = router.query;

  if (!name) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  const allRecipes = Object.values(recipes).flat();
  const recipe = allRecipes.find(
    (recipe) => recipe.name.replaceAll(" ", "-").toLowerCase() === name
  );

  if (!recipe) {
    return <Layout></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-4">
          <h1 className="text-2xl font-medium capitalize">{recipe.name}</h1>
          <button
            className="h-4 ml-2 mt-1"
            onClick={() => {
              setEditing(true);
              setRecipeToEdit(recipe);
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
        <div className="relative h-[30vh] md:h-[50vh] mb-4 rounded overflow-hidden">
          <Image
            src={recipe.imageUrl || defaultImage}
            alt={recipe.name}
            fill={true}
            className=" object-cover"
          />
        </div>
        <p>
          <strong className="font-bold">Servings: </strong>
          {recipe.servings}
        </p>
        <p>
          <strong className="font-bold">Time to Cook: </strong>
          {recipe.timeToCook} minutes
        </p>
        <p className="mt-4 mb-2 font-bold text-lg">Ingredients:</p>
        <ul className="list-disc list-inside mb-4">
          {recipe.ingredients?.map((ingredient, index) => {
            let { name, quantity, unit } = ingredient;
            if (unit === "units") unit = "";
            else if (unit === "cups" && parseFloat(quantity) <= 1) unit = "cup";
            return (
              <li key={index}>
                {quantity} {unit} {name.toLowerCase()}
              </li>
            );
          })}
        </ul>
        <p className="mt-4 mb-2 font-bold text-lg">Directions:</p>
        <ol className="list-decimal list-inside mb-4">
          {recipe.directions?.map((direction, index) => (
            <li key={index}>{direction}</li>
          ))}
        </ol>
      </div>
    </Layout>
  );
}

export default RecipePage;
