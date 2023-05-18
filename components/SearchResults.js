import { useContext, useState } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { useRouter } from "next/router";

function SearchResults({ closeSearch }) {
  const { recipes } = useContext(RecipeContext);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const openRecipe = (name) => {
    router.push(`/recipes/${name.replaceAll(" ", "-").toLowerCase()}`);
    closeSearch();
  };

  const allRecipes = Object.values(recipes)
    .flat()
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="bg-white rounded-md w-full max-w-lg">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for recipes..."
        className="w-full p-2 border rounded-md outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-500"
      />
      <div className="h-[60vh] sm:h-[50vh] overflow-auto">
        {allRecipes
          .filter((recipe) =>
            recipe.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((recipe, index) => (
            <div
              key={index}
              onClick={() => openRecipe(recipe.name)}
              className="cursor-pointer border-b sm:hover:bg-gray-100 p-2 py-3 text-xl"
            >
              {recipe.name}
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchResults;
