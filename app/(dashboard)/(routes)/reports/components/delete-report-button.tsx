"use client";

import useDeleteReportModal from "@/hooks/useDeleteReportModal";
import { Report, User } from "@prisma/client";
import { useCallback, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

interface DeleteReportButtonProps {
  report: Report & { user: User };
}

const DeleteReportButton: React.FC<DeleteReportButtonProps> = ({ report }) => {
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

export default DeleteReportButton;
