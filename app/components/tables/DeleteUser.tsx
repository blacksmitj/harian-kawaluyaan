"use client";

import useDeleteUserModal from "@/app/hooks/useDeleteUserModal";
import { User } from "@prisma/client";
import { useCallback, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

interface DeleteUserProps {
  user: User;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ user }) => {
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
        disabled={isLoading}
        className="rounded-xl py-1 flex justify-start items-center gap-2 hover:text-rose-500 text-darker duration-300 w-full"
      >
        <MdOutlineDeleteOutline size={20} />
        <span className="hidden sm:inline">Hapus</span>
      </button>
    </>
  );
};

export default DeleteUser;
