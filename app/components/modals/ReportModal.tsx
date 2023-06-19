"use client";

import { useState } from "react";
import Modal from "./Modal";
import ResumeCard from "../card/ResumeCard";
import useReportModal from "@/app/hooks/useReportModal";
import Avatar from "../Avatar";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import useEditModal from "@/app/hooks/useEditModal";
import { User } from "@prisma/client";
import ProfileMenu from "../ProfileMenu";

interface ReportModalProps {
  currentUser?: User;
}

const ReportModal: React.FC<ReportModalProps> = ({ currentUser }) => {
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
    if (currentUser?.id === report.user.id && currentUser.verifiedAccount) {
      return true;
    }

    return false;
  };

  const bodyContent = (
    <div className="flex flex-col gap-4 h-full tall:h-fit tall:overflow-visible">
      <div className="mt-2">
        <ProfileMenu
          id={report.user.id}
          name={report.user.name}
          email={report.user.email}
          verified={report.user.verifiedAccount}
          src={
            report.user.image ||
            `https://api.dicebear.com/6.x/big-smile/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=` +
              report.user.name
          }
        />
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
