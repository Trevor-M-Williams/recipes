import { useContext, useEffect, useRef } from "react";
import { RecipeContext } from "../context/RecipeContext";

function FormDirections() {
  const directionInputRef = useRef(null);
  const { directions, setDirections } = useContext(RecipeContext);

  useEffect(() => {
    if (directions.length === 1) return;
    directionInputRef.current?.focus();
  }, [directions.length]);

  const addDirection = (e) => {
    e.preventDefault();
    setDirections([...directions, ""]);
  };

  return (
    <fieldset className="border p-2 rounded-md">
      <legend className="text-sm font-medium">Directions</legend>
      {directions.map((direction, index) => (
        <div key={index} className="flex items-center">
          <textarea
            ref={index === directions.length - 1 ? directionInputRef : null}
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
            <button
              className="w-[10%]"
              onClick={(e) => {
                e.preventDefault();
                const newDirections = [...directions];
                newDirections.splice(index, 1);
                setDirections(newDirections);
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
        onClick={addDirection}
        className="mt-2 py-1 w-12 flex justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Add
      </button>
    </fieldset>
  );
}

export default FormDirections;
