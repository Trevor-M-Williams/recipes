import { useState } from "react";
import { db } from "../firebase";
import { ref, push, set } from "firebase/database";

const Form = ({ closeForm }) => {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [directions, setDirections] = useState([]);
  const [servings, setServings] = useState("");
  const [timeToCook, setTimeToCook] = useState("");
  const [category, setCategory] = useState("");

  const writeRecipeToFirebase = () => {
    if (category === "") {
      return;
    }

    const newRecipeRef = push(ref(db, `recipes`));
    set(newRecipeRef, {
      name: recipeName,
      description,
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
        <textarea
          placeholder="Recipe description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
        <textarea
          placeholder="Ingredients (comma-separated)"
          onChange={(e) => setIngredients(e.target.value.split(","))}
          className="block w-full p-2 rounded-md border border-gray-300"
          required
        />
        <textarea
          placeholder="Directions (comma-separated)"
          onChange={(e) => setDirections(e.target.value.split(","))}
          className="block w-full p-2 rounded-md border border-gray-300"
          required
        />

        <button
          onClick={writeRecipeToFirebase}
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 self-start"
        >
          Add Recipe
        </button>
      </div>
    </div>
  );
};

export default Form;
