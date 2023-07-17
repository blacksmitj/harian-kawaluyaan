"use client";

import { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import useOpenToast from "@/hooks/useOpenToast";
import useDeleteReportModal from "@/hooks/useDeleteReportModal";
import ReportDetail from "../report/report-detail";
import UserHead from "../user-head-section";

const DeleteReportModal = () => {
  const openToast = useOpenToast();
  const deleteReportModal = useDeleteReportModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const report = deleteReportModal.report;

  if (!deleteReportModal.isOpen) {
    return null;
  }

  const onDelete = () => {
    setIsLoading(true);
    axios
      .delete(`/api/report/${report.id}`)
      .then(() => {
        deleteReportModal.onClose();
        router.refresh();
        openToast.setTitle("Laporan Dihapus");
        openToast.setSubTitle("Data laporan telah terhapus!");
        openToast.onOpen();
        openToast.onChange();
      })
      .catch((error) => {
        openToast.setTitle("Error");
        openToast.setSubTitle(
          "Something Error with" + error?.response?.data?.error
        );
        openToast.onOpen();
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
    <div className="flex flex-col gap-4 overflow-y-scroll h-fit tall:h-fit tall:overflow-visible">
      <div className="mt-2">
        <UserHead
          image={report.user.image}
          name={report.user.name}
          userId={report.userId}
          createdAt={report.createdAt}
        />
      </div>
      <ReportDetail
        started={report.started}
        ended={report.ended}
        eSamsat={report.eSamsat}
        canceled={report.canceled}
        listCanceled={report.listCanceled}
        place={report.place}
        location={report.location}
        service={report.service}
      />
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
