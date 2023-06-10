import { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import Card from "../components/Card";

function Home() {
  const router = useRouter();
  const { recipes, dev } = useContext(RecipeContext);

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
            {category === "snack" ? "snacks" : category}
          </h2>
          <div className="flex overflow-auto sm:px-4 pb-4 gap-x-4 md:gap-x-[2%] md:gap-y-3 md:gap-y-4 mb-4">
            {sortedRecipes[category].map((recipe, index) => (
              <Card
                key={index}
                recipe={recipe}
                openRecipe={openRecipe}
                dev={dev}
              />
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
}

export default Home;
