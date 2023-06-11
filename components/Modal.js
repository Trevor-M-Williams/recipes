import { useEffect, useRef, useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";

function Modal() {
  const modalRef = useRef();
  const {
    showModal, // Assuming this state is available in your context
    setShowModal,
    modalContent,
    editing,
    setEditing,
    setRecipeName,
    setIngredients,
    setDirections,
    setServings,
    setCategory,
    setTimeToCook,
    setRecipeToEdit,
  } = useContext(RecipeContext);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  const closeModal = () => {
    if (editing) {
      setRecipeName("");
      setIngredients([{ name: "", quantity: "", unit: "" }]);
      setDirections([""]);
      setServings("");
      setTimeToCook("");
      setCategory("");
      setEditing(false);
      setRecipeToEdit(null);
    }
    setShowModal(false);
  };

  // const handleClickOutside = (event) => {
  //   if (modalRef.current && !modalRef.current.contains(event.target)) {
  //     closeModal();
  //   }
  // };

  return (
    <div
      className="fixed z-10 inset-0 overflow-auto flex items-center justify-center"
      // onClick={handleClickOutside}
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div
        ref={modalRef}
        className="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-[90%]"
      >
        <button
          type="button"
          className="absolute top-6 right-4 h-6 w-6"
          onClick={closeModal}
        >
          <svg viewBox="0 0 24 24">
            <path
              d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
              stroke="#666"
              strokeWidth="2"
            ></path>
          </svg>
        </button>

        <div className="bg-white p-4">
          <div className="">{modalContent}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
