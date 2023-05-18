import { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import Nav from "./Nav";
import Modal from "./Modal";

function Layout({ children }) {
  const { showModal, setShowModal, modalContent } = useContext(RecipeContext);
  return (
    <div className="px-4 sm:px-6 flex flex-col items-center mb-8">
      <div className="relative w-full max-w-7xl">
        <Nav />
        <main className="px-4">{children}</main>
        {showModal && <Modal />}
      </div>
    </div>
  );
}

export default Layout;
