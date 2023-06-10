import { useState } from "react";
import { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { db } from "../firebase";
import { ref, push } from "firebase/database";
import { useRouter } from "next/router";

const GPTForm = () => {
  const [prompt, setPrompt] = useState("");

  const { openModalWithContent } = useContext(RecipeContext);

  const router = useRouter();

  const convertKeysToLowercase = (obj) => {
    const convertedObj = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const lowercaseKey = key.toLowerCase();
        convertedObj[lowercaseKey] = obj[key];
        if (lowercaseKey !== key) {
          delete obj[key];
        }
      }
    }

    return convertedObj;
  };

  const generateRecipe = async () => {
    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      if (!response.ok) {
        throw new Error("Response was not OK");
      }

      const data = await response.json();

      if (data) {
        const recipe = JSON.parse(data.data);
        const convertedRecipe = convertKeysToLowercase(recipe);
        writeRecipeToFirebase(convertedRecipe);
      } else {
        console.log("No data received");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    generateRecipe();
    openModalWithContent(null);
  };

  const writeRecipeToFirebase = async (recipe) => {
    try {
      const recipeRef = ref(db, `recipes`);
      await push(recipeRef, {
        ...recipe,
        imageUrl: "",
      });
      const slug = recipe.name.toLowerCase().replace(/\s/g, "-");
      router.push("/recipes/" + slug);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <h1 className="text-2xl font-medium mb-2">{"New Recipe"}</h1>

      <form
        className="space-y-4 max-h-[70vh] overflow-auto"
        onSubmit={handleSubmit}
      >
        <input
          value={prompt}
          type="text"
          placeholder="Describe your recipe..."
          onChange={(e) => setPrompt(e.target.value)}
          className="block w-full p-2 rounded-md border border-gray-300"
          required
        />

        <button
          type="submit"
          className="block w-full p-2 rounded-md border border-gray-300 bg-blue-500 text-white font-bold"
        >
          Generate
        </button>
      </form>
    </div>
  );
};

export default GPTForm;
