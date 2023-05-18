import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState({});
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: "" },
  ]);
  const [directions, setDirections] = useState([""]);
  const [servings, setServings] = useState("");
  const [timeToCook, setTimeToCook] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const recipesRef = ref(db, "recipes/");
    onValue(recipesRef, (snapshot) => {
      const allRecipes = snapshot.val();

      const sortedRecipes = {
        breakfast: [],
        lunch: [],
        dinner: [],
        dessert: [],
        snack: [],
      };

      for (const id in allRecipes) {
        const recipe = allRecipes[id];
        sortedRecipes[recipe.category.toLowerCase()].push(recipe);
      }

      console.log(sortedRecipes);
      setRecipes(sortedRecipes);
    });
  }, []);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        recipeName,
        setRecipeName,
        ingredients,
        setIngredients,
        directions,
        setDirections,
        servings,
        setServings,
        timeToCook,
        setTimeToCook,
        category,
        setCategory,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
