"use client";

import { useCallback } from "react";
import { BsClipboardPlusFill } from "react-icons/bs";
import useCreateModal from "../hooks/useCreateModal";

interface ButtonCreateProps {
  verified: boolean;
}

const ButtonCreate: React.FC<ButtonCreateProps> = ({ verified }) => {
  const createModal = useCreateModal();

  const onCreate = useCallback(() => {
    createModal.onOpen();
  }, [createModal]);

  if (!verified) {
    return null;
  }

  return (
    <div className="fixed m-3 right-5 bottom-14 z-[1]">
      <button
        onClick={onCreate}
        className="shadow-lg rounded-full px-4 hover:px-5 aspect-square bg-primary hover:bg-accent text-white items-center duration-300"
      >
        <BsClipboardPlusFill size={26} className="mb-1" />
      </button>
    </div>
  );
};

export default ButtonCreate;
