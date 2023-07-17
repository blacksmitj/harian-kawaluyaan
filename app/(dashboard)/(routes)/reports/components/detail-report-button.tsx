"use client";

import useDetailReportModal from "@/hooks/useDetailReportModal";
import { User, Report } from "@prisma/client";
import { useCallback } from "react";
import { AiOutlineEye } from "react-icons/ai";

interface DetailReportButtonProps {
  report: Report & { user: User };
}

const DetailReportButton: React.FC<DetailReportButtonProps> = ({ report }) => {
  const reportModal = useDetailReportModal();

  const onSee = useCallback(
    (report: Report & { user: User }) => {
      reportModal.onOpen(),
        reportModal.setReport({
          ...report,
          listCanceled: JSON.parse(report.listCanceled),
        });
    },
    [reportModal]
  );

  return (
    <button
      onClick={() => onSee(report)}
      className="rounded-xl py-1 flex justify-start items-center gap-2 w-full"
    >
      <AiOutlineEye size={20} />
      Lihat
    </button>
  );
};

export default DetailReportButton;
