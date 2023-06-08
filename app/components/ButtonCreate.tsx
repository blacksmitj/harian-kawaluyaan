"use client";

import { useCallback } from "react";
import { BsClipboardPlusFill } from "react-icons/bs";
import useCreateModal from "../hooks/useCreateModal";

const ButtonCreate = () => {
  const createModal = useCreateModal();

  const onCreate = useCallback(() => {
    createModal.onOpen();
  }, [createModal]);

  return (
    <div className="fixed m-3 right-5 bottom-5 ">
      <button
        // onClick={onCreate}
        onClick={onCreate}
        className="shadow-lg rounded-full px-4 hover:px-5 aspect-square bg-primary hover:bg-accent text-white items-center duration-300"
      >
        <BsClipboardPlusFill size={26} className="mb-1" />
      </button>
    </div>
  );
};

export default ButtonCreate;
