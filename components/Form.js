import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../firebase";
import { ref, push, set, update, remove } from "firebase/database";
import { RecipeContext } from "../context/RecipeContext";

const Form = () => {
  const {
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
    editing,
    setEditing,
    recipeToEdit,
    setRecipeToEdit,
    openModalWithContent,
  } = useContext(RecipeContext);
  const router = useRouter();

  useEffect(() => {
    if (editing && recipeToEdit) {
      setRecipeName(recipeToEdit.name);
      setIngredients(recipeToEdit.ingredients);
      setDirections(recipeToEdit.directions);
      setServings(recipeToEdit.servings);
      setTimeToCook(recipeToEdit.timeToCook);
      setCategory(recipeToEdit.category);
    }
  }, [editing, recipeToEdit]);

  const addDirection = () => {
    setDirections([...directions, ""]);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
  };

  const clearForm = () => {
    setRecipeName("");
    setIngredients([{ name: "", quantity: "", unit: "" }]);
    setDirections([""]);
    setServings("");
    setTimeToCook("");
    setCategory("");
    setEditing(false);
    setRecipeToEdit(null);
  };

  const closeForm = () => {
    clearForm();
    openModalWithContent(null);
  };

  const deleteRecipe = async (id) => {
    await remove(ref(db, `recipes/${id}`));
    router.push("/");
    closeForm();
  };

  const writeRecipeToFirebase = async (e) => {
    e.preventDefault();

    if (category === "") {
      return;
    }

    if (editing) {
      const recipeRef = ref(db, `recipes/${recipeToEdit.id}`);
      await update(recipeRef, {
        name: recipeName,
        ingredients,
        directions,
        servings,
        timeToCook,
        category,
      });
    } else {
      const newRecipeRef = push(ref(db, `recipes`));
      await set(newRecipeRef, {
        name: recipeName,
        ingredients,
        directions,
        servings,
        timeToCook,
        category,
      });
    }

    router.push(`/recipes/${recipeName.replaceAll(" ", "-").toLowerCase()}`);
    closeForm();
  };

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <h1 className="text-2xl font-medium mb-2">New Recipe</h1>
      <form
        className="space-y-4 max-h-[70vh] overflow-auto"
        onSubmit={writeRecipeToFirebase}
      >
        <input
          type="text"
          placeholder="Recipe name"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          className="block w-full p-2 rounded-md border border-gray-300"
          required
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            const color = e.target.value ? "black" : "gray";
            e.target.style.color = color;
          }}
          className="block w-full p-2 rounded-md border border-gray-300"
          style={{ color: category ? "black" : "gray" }}
          required
        >
          <option value="">Category</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="dessert">Dessert</option>
          <option value="snack">Snack</option>
        </select>
        <input
          value={servings}
          type="number"
          placeholder="Servings"
          onChange={(e) => setServings(e.target.value)}
          className="block w-full p-2 rounded-md border border-gray-300"
          required
        />
        <input
          value={timeToCook}
          type="text"
          placeholder="Time to cook"
          onChange={(e) => setTimeToCook(e.target.value)}
          className="block w-full p-2 rounded-md border border-gray-300"
          required
        />

        <fieldset className="border p-2 rounded-md">
          <legend className="text-sm font-medium ">Ingredients</legend>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center">
              <div className="w-[90%] flex rounded-md border border-gray-300 my-1 overflow-hidden">
                <input
                  type="text"
                  placeholder="Ingredient"
                  value={ingredient.name}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].name = e.target.value;
                    setIngredients(newIngredients);
                  }}
                  className="p-2 border-r w-full"
                  required
                />
                <input
                  type="text"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].quantity = e.target.value;
                    setIngredients(newIngredients);
                  }}
                  className="p-2 border-r w-20"
                  required
                />
                <select
                  value={ingredient.unit}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].unit = e.target.value;
                    setIngredients(newIngredients);
                  }}
                  className="p-2 border-r w-20"
                >
                  <option value="units">Units</option>
                  <option value="lbs">Lbs</option>
                  <option value="cups">Cups</option>
                  <option value="tbsp">Tbsp</option>
                  <option value="tsp">Tsp</option>
                </select>
              </div>
              {index !== 0 && (
                <div
                  className="w-[10%]"
                  onClick={() => {
                    const newIngredients = [...ingredients];
                    newIngredients.splice(index, 1);
                    setIngredients(newIngredients);
                  }}
                >
                  <svg viewBox="0 0 1024 1024" fill="#000000">
                    <path d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z"></path>
                    <path d="M328 340.8l32-31.2 348 348-32 32z"></path>
                  </svg>
                </div>
              )}
            </div>
          ))}
          <div
            onClick={addIngredient}
            className="mt-2 py-1 w-12 flex justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add
          </div>
        </fieldset>

        <fieldset className="border p-2 rounded-md">
          <legend className="text-sm font-medium">Directions</legend>
          {directions.map((direction, index) => (
            <div key={index} className="flex items-center">
              <input
                type="text"
                placeholder="Direction"
                value={direction}
                onChange={(e) => {
                  const newDirections = [...directions];
                  newDirections[index] = e.target.value;
                  setDirections(newDirections);
                }}
                className="block w-[90%] p-2 rounded-md border border-gray-300 my-1"
                required
              />
              {index !== 0 && (
                <div
                  className="w-[10%]"
                  onClick={() => {
                    console.log(index);
                    const newDirections = [...directions];
                    newDirections.splice(index, 1);
                    setDirections(newDirections);
                  }}
                >
                  <svg viewBox="0 0 1024 1024" fill="#000000">
                    <path d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z"></path>
                    <path d="M328 340.8l32-31.2 348 348-32 32z"></path>
                  </svg>
                </div>
              )}
            </div>
          ))}
          <div
            onClick={addDirection}
            className="mt-2 py-1 w-12 flex justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add
          </div>
        </fieldset>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
            <div
              onClick={clearForm}
              className="py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              Clear
            </div>
          </div>

          {editing && (
            <div
              onClick={() => deleteRecipe(recipeToEdit.id)}
              className="h-6 stroke-red-500"
            >
              <svg
                viewBox="0 0 24 24"
                height="100%"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 12V17"></path>
                <path d="M14 12V17"></path>
                <path d="M4 7H20"></path>
                <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"></path>
                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"></path>
              </svg>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
