import { useContext, useRef, useEffect } from "react";
import { RecipeContext } from "../context/RecipeContext";

function FormIngredients() {
  const ingredientInputRef = useRef(null);
  const { ingredients, setIngredients } = useContext(RecipeContext);

  useEffect(() => {
    if (ingredients.length === 1) return;
    ingredientInputRef.current?.focus();
  }, [ingredients.length]);

  const addIngredient = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
  };

  return (
    <fieldset className="border p-2 rounded-md">
      <legend className="text-sm font-medium ">Ingredients</legend>
      {ingredients.map((ingredient, index) => (
        <div key={index} className="flex items-center">
          <div className="w-[90%] flex rounded-md border border-gray-300 my-1 overflow-hidden">
            <input
              ref={index === ingredients.length - 1 ? ingredientInputRef : null}
              type="text"
              placeholder="Ingredient"
              value={ingredient.name}
              onChange={(e) => {
                const newIngredients = [...ingredients];
                newIngredients[index].name = e.target.value;
                setIngredients(newIngredients);
              }}
              className="p-2 border-r w-full rounded-none rounded-l-md"
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
              className="p-2 border-r rounded-none w-20"
              required
            />
            <select
              value={ingredient.unit}
              onChange={(e) => {
                const newIngredients = [...ingredients];
                newIngredients[index].unit = e.target.value;
                setIngredients(newIngredients);
              }}
              className="p-2 border-r w-20 rounded-none rounded-r-md"
            >
              <option value="units">Units</option>
              <option value="lbs">Lbs</option>
              <option value="cups">Cups</option>
              <option value="tbsp">Tbsp</option>
              <option value="tsp">Tsp</option>
            </select>
          </div>
          {index !== 0 && (
            <button
              className="w-[10%]"
              onClick={(e) => {
                e.preventDefault();
                const newIngredients = [...ingredients];
                newIngredients.splice(index, 1);
                setIngredients(newIngredients);
              }}
            >
              <svg viewBox="0 0 1024 1024" fill="#000000">
                <path d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z"></path>
                <path d="M328 340.8l32-31.2 348 348-32 32z"></path>
              </svg>
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addIngredient}
        className="mt-2 py-1 w-12 flex justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Add
      </button>
    </fieldset>
  );
}

export default FormIngredients;
