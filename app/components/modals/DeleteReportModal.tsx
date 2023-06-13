"use client";

import useDeleteReportModal from "@/app/hooks/useDeleteReportModal";
import { useState } from "react";
import Modal from "./Modal";
import ResumeCard from "../card/ResumeCard";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteReportModal = () => {
  const deleteReportModal = useDeleteReportModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const report = deleteReportModal.report;

  const onDelete = () => {
    setIsLoading(true);
    axios
      .delete(`/api/report/${report.id}`)
      .then(() => {
        deleteReportModal.onClose();
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
      deleteReportModal.onClose();
      deleteReportModal.onCancel();
    }, 200);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4 overflow-y-scroll h-[60vh] tall:h-fit tall:overflow-visible">
      <h1 className="text-xl font-bold py-4 text-accent text-center">
        Yakin hapus laporan ini?
      </h1>
      <ResumeCard report={report} />
    </div>
  );

  return (
    <Modal
      onClose={deleteReportModal.onClose}
      onSubmit={() => onDelete()}
      disabled={isLoading}
      isOpen={deleteReportModal.isOpen}
      title={"Hapus Laporan"}
      actionLabel="Hapus"
      isEditable
      secondaryActionLabel="Kembali"
      secondaryAction={onBack}
      body={bodyContent}
    />
  );
};

export default DeleteReportModal;
