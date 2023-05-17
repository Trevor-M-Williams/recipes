import { useRef } from "react";

function Modal({ closeModal, children }) {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed z-10 inset-0 overflow-auto flex items-center justify-center"
      onClick={handleClickOutside}
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
              stroke-width="2"
            ></path>
          </svg>
        </button>

        <div className="bg-white p-4">
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
