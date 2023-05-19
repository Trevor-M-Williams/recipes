import { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Card from "../../components/Card";

function CategoryPage() {
  const router = useRouter();
  const { recipes } = useContext(RecipeContext);
  console.log(recipes);
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

  const sortedRecipes = recipes[category]?.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <Layout>
      <h1 className="capitalize text-2xl font-medium mb-4">
        {category} Recipes
      </h1>
      <div className="flex flex-col px-4 gap-6 xs:flex-row xs:flex-wrap xs:gap-x-[2%] xs:gap-y-4">
        {sortedRecipes &&
          sortedRecipes.map((recipe, index) => (
            <Card key={index} recipe={recipe} openRecipe={openRecipe} />
          ))}
      </div>
    </Layout>
  );
}

export default CategoryPage;
