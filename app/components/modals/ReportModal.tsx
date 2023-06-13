"use client";

import { useState } from "react";
import Modal from "./Modal";
import ResumeCard from "../card/ResumeCard";
import useReportModal from "@/app/hooks/useReportModal";
import Avatar from "../Avatar";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import useEditModal from "@/app/hooks/useEditModal";

interface ReportModalProps {
  currentUserId?: string;
}

const ReportModal: React.FC<ReportModalProps> = ({ currentUserId }) => {
  const reportModal = useReportModal();
  const editModal = useEditModal();
  const [isLoading, setIsLoading] = useState(false);

  if (!reportModal.isOpen) {
    return null;
  }

  const onBack = () => {
    setTimeout(() => {
      reportModal.onClose();
    }, 200);
  };

  const onEdit = () => {
    reportModal.onClose();
    editModal.onOpen();
  };

  const report = reportModal.report;

  const isEditable = () => {
    if (currentUserId === report.user.id) {
      return true;
    }

    return false;
  };

  const bodyContent = (
    <div className="flex flex-col gap-4 overflow-y-scroll h-[60vh] tall:h-fit tall:overflow-visible">
      {/* User Section */}
      <div className="flex flex-col gap-4 items-center mb-4">
        <Avatar
          src={
            report.user.image ||
            `https://api.dicebear.com/6.x/big-smile/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=` +
              report.user.name
          }
          size={55}
        />
        <div className="flex flex-col text-center">
          <span className="text-xl font-bold">{report.user.name}</span>
          <span className="text-xs font-light">
            {format(report.createdAt, "cccc, dd MMMM yyyy", { locale: id }) ||
              "Tanggal tidak ditemukan"}
          </span>
        </div>
      </div>
      <ResumeCard report={report} />
    </div>
  );

  return (
    <Modal
      onClose={reportModal.onClose}
      onSubmit={() => onEdit()}
      disabled={isLoading}
      isOpen={reportModal.isOpen}
      title={"Resume Laporan"}
      actionLabel="Ubah Laporan"
      isEditable={isEditable()}
      secondaryActionLabel="Kembali"
      secondaryAction={onBack}
      body={bodyContent}
    />
  );
};

export default ReportModal;
