import { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  const recipes = useContext(RecipeContext);

  const sortedRecipes = { ...recipes };
  for (const category in sortedRecipes) {
    sortedRecipes[category] = [...sortedRecipes[category]].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  const openCategory = (category) => {
    router.push(`/categories/${category}`);
  };

  const openRecipe = (name) => {
    router.push(`/recipes/${name.replaceAll(" ", "-").toLowerCase()}`);
  };

  return (
    <Layout>
      {Object.keys(sortedRecipes).map((category) => (
        <div key={category} className="">
          <h2
            className="capitalize text-2xl font-medium mb-4 cursor-pointer"
            onClick={() => openCategory(category)}
          >
            {category}
          </h2>
          <div className="flex overflow-auto gap-x-4 md:gap-x-[2%] md:gap-y-3 md:gap-y-4 mb-4">
            {sortedRecipes[category].map((recipe, index) => (
              <div
                key={index}
                className="w-72 max-w-full shrink-0 border-2 border-gray-200 rounded-md cursor-pointer sm:hover:border-blue-200 overflow-hidden"
                onClick={() => openRecipe(recipe.name)}
              >
                <div className="h-60 sm:h-52 w-full bg-gray-200"></div>
                <div className="p-4 ">
                  <h2 className="text-xl font-medium">{recipe.name}</h2>
                  <p>{recipe.timeToCook}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
}

export default Home;
