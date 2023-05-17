import { useState } from "react";
import Nav from "./Nav";
import Modal from "./Modal";

function Layout({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModalWithContent = (content) => {
    if (!content) {
      setShowModal(false);
      return;
    }
    setModalContent(content);
    setShowModal(true);
  };

  return (
    <div className="px-4 sm:px-6 flex flex-col items-center mb-8">
      <div className="relative w-full max-w-7xl">
        <Nav openModalWithContent={openModalWithContent} />
        <main className="container mx-auto max-w-6xl">{children}</main>
        {showModal && (
          <Modal closeModal={() => setShowModal(false)}>{modalContent}</Modal>
        )}
      </div>
    </div>
  );
}

export default Layout;
