"use client";

import DeleteReportModal from "@/components/modals/delete-report-modal";
import DetailReportModal from "@/components/modals/detail-report-modal";
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
      <DetailReportModal currentUser={currentUser} />
      <CreateReportModal />
      <EditReportModal />
      <DeleteReportModal />
    </>
  );
};
