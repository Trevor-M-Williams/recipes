import React, { useContext } from "react";
import { useRouter } from "next/router";
import { db } from "../firebase";
import { ref, push, set } from "firebase/database";
import { RecipeContext } from "../context/RecipeContext";

const Form = ({ closeForm }) => {
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
  } = useContext(RecipeContext);
  const router = useRouter();

  const addDirection = () => {
    setDirections([...directions, ""]);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
  };

  const clearForm = () => {
    setRecipeName("");
    setIngredients([]);
    setDirections([]);
    setServings("");
    setTimeToCook("");
    setCategory("");
  };

  const writeRecipeToFirebase = async () => {
    if (category === "") {
      return;
    }

    const newRecipeRef = push(ref(db, `recipes`));
    await set(newRecipeRef, {
      name: recipeName,
      ingredients,
      directions,
      servings,
      timeToCook,
      category,
    });

    router.push(`/recipes/${recipeName.replaceAll(" ", "-").toLowerCase()}`);
    clearForm();
    closeForm();
  };

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <form className="space-y-4">
        <h1 className="text-2xl font-medium">New Recipe</h1>
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
          type="number"
          placeholder="Servings"
          onChange={(e) => setServings(e.target.value)}
          className="block w-full p-2 rounded-md border border-gray-300"
          required
        />
        <input
          type="text"
          placeholder="Time to cook"
          onChange={(e) => setTimeToCook(e.target.value)}
          className="block w-full p-2 rounded-md border border-gray-300"
          required
        />

        <fieldset className="border p-2 rounded-md">
          <legend className="text-sm font-medium ">Ingredients</legend>
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="flex rounded-md border border-gray-300 my-1 overflow-hidden"
            >
              <input
                type="text"
                placeholder="Ingredient"
                value={ingredient.name}
                onChange={(e) => {
                  const newIngredients = [...ingredients];
                  newIngredients[index].name = e.target.value;
                  setIngredients(newIngredients);
                }}
                className="p-2  grow"
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
                className="p-2  w-20"
                required
              />
              <select
                value={ingredient.unit}
                onChange={(e) => {
                  const newIngredients = [...ingredients];
                  newIngredients[index].unit = e.target.value;
                  setIngredients(newIngredients);
                }}
                className="p-2  w-20"
              >
                <option value="units">Units</option>
                <option value="lbs">Lbs</option>
                <option value="cups">Cups</option>
                <option value="tbsp">Tbsp</option>
                <option value="tsp">Tsp</option>
              </select>
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
            <input
              key={index}
              type="text"
              placeholder="Direction"
              value={direction}
              onChange={(e) => {
                const newDirections = [...directions];
                newDirections[index] = e.target.value;
                setDirections(newDirections);
              }}
              className="block w-full p-2 rounded-md border border-gray-300 my-1"
              required
            />
          ))}
          <div
            onClick={addDirection}
            className="mt-2 py-1 w-12 flex justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add
          </div>
        </fieldset>

        <div className="mt-4 flex justify-end space-x-2">
          <div
            onClick={clearForm}
            className="py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Clear
          </div>
          <button
            type="submit"
            onClick={writeRecipeToFirebase}
            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
