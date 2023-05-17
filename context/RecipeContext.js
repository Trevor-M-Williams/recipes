import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState({});

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

      setRecipes(sortedRecipes);
    });
  }, []);

  return (
    <RecipeContext.Provider value={recipes}>{children}</RecipeContext.Provider>
  );
};
