"use client";

import useDeleteUserModal from "@/hooks/useDeleteUserModal";
import { User } from "@prisma/client";
import { useCallback, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

interface DeleteUserProps {
  user: User;
  disabled?: boolean;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ user, disabled }) => {
  const [isLoading, setIsLoading] = useState(false);
  const deleteUserModal = useDeleteUserModal();

  const onDelete = useCallback(() => {
    setIsLoading(true);
    deleteUserModal.setUser(user);
    deleteUserModal.onOpen();
    setIsLoading(false);
  }, [deleteUserModal, user]);

  return (
    <>
      <button
        onClick={() => onDelete()}
        disabled={isLoading || disabled}
        className="flex justify-start items-center gap-2 w-full text-darker hover:bg-primary hover:text-white px-2 py-3 rounded-md"
      >
        <MdOutlineDeleteOutline size={20} />
        Hapus
      </button>
    </>
  );
};

export default DeleteUser;
