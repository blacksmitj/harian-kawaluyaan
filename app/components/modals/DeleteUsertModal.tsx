"use client";

import useDeleteUserModal from "@/app/hooks/useDeleteUserModal";
import Modal from "./Modal";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const DeleteUserModal = () => {
  const deleteUserModal = useDeleteUserModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const UserId = deleteUserModal.user.id;

  const onDelete = () => {
    setIsLoading(true);
    axios
      .delete(`/api/user/${UserId}`)
      .then(() => {
        deleteUserModal.onClose();
        router.refresh();
      })
      .catch((error) => {
        console.log(error?.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onBack = () => {
    setTimeout(() => {
      deleteUserModal.onClose();
      deleteUserModal.onCancel();
    }, 200);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4 overflow-y-scroll h-[60vh] tall:h-fit tall:overflow-visible">
      {/* <div className="flex flex-col"> */}
      <h1 className="text-xl font-bold py-4 text-center">
        Yakin hapus akun{" "}
        <span className="text-accent">{deleteUserModal.user.name}</span> ?
      </h1>
    </div>
  );

  return (
    <Modal
      onClose={deleteUserModal.onClose}
      onSubmit={() => onDelete()}
      isOpen={deleteUserModal.isOpen}
      title={"Hapus Laporan"}
      actionLabel="Hapus"
      isEditable
      secondaryActionLabel="Kembali"
      secondaryAction={onBack}
      body={bodyContent}
    />
  );
};

export default DeleteUserModal;
