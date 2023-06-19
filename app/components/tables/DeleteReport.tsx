"use client";

import useDeleteReportModal from "@/app/hooks/useDeleteReportModal";
import { Report, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

interface DeleteReportProps {
  report: Report & { user: User };
}

const DeleteReportModal: React.FC<DeleteReportProps> = ({ report }) => {
  const [isLoading, setIsLoading] = useState(false);
  const deleteReportModal = useDeleteReportModal();

  const onDelete = useCallback(
    (id: string) => {
      setIsLoading(true);
      deleteReportModal.setReport({
        ...report,
        listCanceled: JSON.parse(report.listCanceled),
      });
      deleteReportModal.onOpen();
      setIsLoading(false);
    },
    [deleteReportModal, report]
  );
  return (
    <button
      onClick={() => onDelete(report.id)}
      disabled={isLoading}
      className="rounded-xl py-1 flex justify-start items-center gap-2 w-full"
    >
      <MdOutlineDeleteOutline size={20} />
      Hapus
    </button>
  );
};

export default DeleteReportModal;
