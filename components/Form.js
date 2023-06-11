import { useState, useContext, useEffect } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { useRouter } from "next/router";
import Image from "next/image";
import { db } from "../firebase";
import { ref, push, update, remove } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import FormIngredients from "./FormIngredients";
import FormDirections from "./FormDirections";
import ProgressBar from "./ProgressBar";

const Form = () => {
  const [newImage, setNewImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);

  const {
    recipeName,
    setRecipeName,
    imageUrl,
    setImageUrl,
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
      setImageUrl(recipeToEdit.imageUrl || null);
    }
  }, [editing, recipeToEdit]);

  const clearForm = (e) => {
    e.preventDefault();
    setRecipeName("");
    setIngredients([{ name: "", quantity: "", unit: "" }]);
    setDirections([""]);
    setServings("");
    setTimeToCook("");
    setCategory("");
    setEditing(false);
    setRecipeToEdit(null);
    setImageUrl(null);
    setUploadProgress(null);
  };

  const closeForm = (e) => {
    clearForm(e);
    openModalWithContent(null);
  };

  const deleteRecipe = async (e, id) => {
    await remove(ref(db, `recipes/${id}`));
    router.push("/");
    closeForm(e);
  };

  const handleImageUpload = (e) => {
    setNewImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  async function uploadImageToFirebase(file) {
    const storage = getStorage();
    const newStorageRef = storageRef(storage, "images/" + file.name);

    const uploadTask = uploadBytesResumable(newStorageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }

  const writeRecipeToFirebase = async (e) => {
    e.preventDefault();

    if (category === "") {
      return;
    }

    let newImageUrl = recipeToEdit?.imageUrl || "";
    if (newImage) {
      console.log("uploading image");
      newImageUrl = await uploadImageToFirebase(newImage);
      console.log(newImageUrl);
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
        imageUrl: newImageUrl,
      });
    } else {
      const recipeRef = ref(db, `recipes`);
      await push(recipeRef, {
        name: recipeName,
        ingredients,
        directions,
        servings,
        timeToCook,
        category,
        imageUrl: newImageUrl,
      });
    }

    router.push(`/recipes/${recipeName.replaceAll(" ", "-").toLowerCase()}`);
    closeForm(e);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <h1 className="text-2xl font-medium mb-2">
        {editing ? "Edit Recipe" : "New Recipe"}
      </h1>
      {uploadProgress !== null && <ProgressBar progress={uploadProgress} />}

      <form
        className="space-y-4 max-h-[70vh] overflow-auto overflow-x-hidden"
        onSubmit={writeRecipeToFirebase}
      >
        <input
          value={recipeName}
          type="text"
          placeholder="Recipe name"
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
          <option value="dinner">Dinner</option>
          <option value="dessert">Dessert</option>
          <option value="snack">Snack</option>
        </select>

        {imageUrl && (
          <div className="relative w-72 max-w-full h-40 mb-4">
            <Image
              src={imageUrl}
              alt={recipeName}
              fill={true}
              className="rounded-md object-cover"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className=""
        />

        <input
          value={servings || ""}
          type="number"
          min={1}
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

        <FormIngredients />
        <FormDirections />

        <div className="mt-4 flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
            {editing ? (
              <button
                onClick={closeForm}
                className="py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={clearForm}
                className="py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Clear
              </button>
            )}
          </div>

          {editing && (
            <div
              onClick={(e) => deleteRecipe(e, recipeToEdit.id)}
              className="h-6 stroke-red-500 cursor-pointer"
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
