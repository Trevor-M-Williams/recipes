import { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

function CategoryPage() {
  const router = useRouter();
  const { recipes } = useContext(RecipeContext);
  const { category } = router.query;

  const openRecipe = (name) => {
    router.push(`/recipes/${name.replaceAll(" ", "-").toLowerCase()}`);
  };

  if (!category) {
    return (
      <Layout>
        <div className="p-4 md:p-6 flex flex-col items-center">
          <div className="relative w-full max-w-7xl">
            <h1 className="capitalize text-2xl font-medium mb-4">
              Category Not Found
            </h1>
          </div>
        </div>
      </Layout>
    );
  }

  const sortedRecipes = recipes[category].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <Layout>
      <h1 className="capitalize text-2xl font-medium mb-4">
        {category} Recipes
      </h1>
      <div className="flex flex-wrap gap-6 sm:gap-x-[2%] sm:gap-y-4">
        {sortedRecipes &&
          sortedRecipes.map((recipe, index) => (
            <div
              key={index}
              className="w-full sm:w-[49%] md:w-[32%] shrink-0 border-2 border-gray-200 rounded-md cursor-pointer sm:hover:border-blue-300 overflow-hidden"
              onClick={() => openRecipe(recipe.name)}
            >
              <div className="h-52 w-full bg-gray-200"></div>
              <div className="py-6 px-4 md:p-4 ">
                <h2 className="text-xl font-medium">{recipe.name}</h2>
                <p>{recipe.timeToCook} min</p>
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
}

export default CategoryPage;
