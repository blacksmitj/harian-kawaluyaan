"use client";

import { useState } from "react";
import Modal from "./Modal";
import ResumeCard from "../report-detail";
import { User } from "@prisma/client";
import ProfileMenu from "../ProfileMenu";
import useReportModal from "@/hooks/useDetailReportModal";
import useEditModal from "@/hooks/useEditModal";
import UserHead from "../user-head-section";

interface ReportModalProps {
  currentUser?: User | null;
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
        <UserHead
          image={report.user.image}
          name={report.user.name}
          userId={report.userId}
          createdAt={report.createdAt}
        />
      </div>
      <ResumeCard
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
