import { useState } from "react";
import { db } from "../firebase";
import { ref, push, set } from "firebase/database";

const Form = ({ closeForm }) => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [directions, setDirections] = useState([]);
  const [servings, setServings] = useState("");
  const [timeToCook, setTimeToCook] = useState("");
  const [category, setCategory] = useState("");

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
  };

  const writeRecipeToFirebase = () => {
    if (category === "") {
      return;
    }

    const newRecipeRef = push(ref(db, `recipes`));
    set(newRecipeRef, {
      name: recipeName,
      ingredients,
      directions,
      servings,
      timeToCook,
      category,
    });
    closeForm();
  };

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="space-y-4">
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
                <option value="cups">Cups</option>
                <option value="tbsp">Tbsp</option>
                <option value="tsp">Tsp</option>
              </select>
            </div>
          ))}
          <button
            onClick={addIngredient}
            className="mt-2 py-1 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 self-start"
          >
            Add
          </button>
        </fieldset>

        <textarea
          placeholder="Directions (comma-separated)"
          onChange={(e) => setDirections(e.target.value.split(","))}
          className="block w-full p-2 rounded-md border border-gray-300"
          required
        />

        <button
          onClick={writeRecipeToFirebase}
          className="py-2 px-4 bg-blue-600 text-white rounded-md sm:hover:bg-blue-700 self-start"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Form;
