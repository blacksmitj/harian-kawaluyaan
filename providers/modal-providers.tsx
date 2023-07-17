"use client";

import DeleteReportModal from "@/components/modals/DeleteReportModal";
import ReportModal from "@/components/modals/ReportModal";
import CreateReportModal from "@/components/modals/create-report-modal";
import EditReportModal from "@/components/modals/edit-report-modal";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

interface ModalProviderProps {
  currentUser: User | null;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({
  currentUser,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <ReportModal currentUser={currentUser} />
      <CreateReportModal />
      <EditReportModal />
      <DeleteReportModal />
    </>
  );
};
