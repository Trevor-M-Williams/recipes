import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [dev, setDev] = useState(false);

  const [recipes, setRecipes] = useState({});
  const [recipeName, setRecipeName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: "" },
  ]);
  const [directions, setDirections] = useState([""]);
  const [servings, setServings] = useState("");
  const [timeToCook, setTimeToCook] = useState("");
  const [category, setCategory] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [editing, setEditing] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState(null);

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
        sortedRecipes[recipe.category.toLowerCase()].push({ ...recipe, id });
      }

      setRecipes(sortedRecipes);
    });
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setDev(true);
    }
  }, []);

  const openModalWithContent = (content) => {
    if (!content) {
      setShowModal(false);
      return;
    }
    setModalContent(content);
    setShowModal(true);
  };

  return (
    <RecipeContext.Provider
      value={{
        dev,
        recipes,
        recipeName,
        imageUrl,
        setImageUrl,
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
        showModal,
        setShowModal,
        modalContent,
        setModalContent,
        openModalWithContent,
        editing,
        setEditing,
        recipeToEdit,
        setRecipeToEdit,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
