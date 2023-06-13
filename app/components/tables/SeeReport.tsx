"use client";

import useReportModal from "@/app/hooks/useReportModal";
import { User, Report } from "@prisma/client";
import { useCallback } from "react";
import { AiOutlineEye } from "react-icons/ai";
import EditModal from "../modals/EditModal";

interface SeeReportProps {
  report: Report & { user: User };
}

const SeeReport: React.FC<SeeReportProps> = ({ report }) => {
  const reportModal = useReportModal();

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
    <div>
      <button
        onClick={() => onSee(report)}
        className="rounded-xl py-1 flex justify-start items-center gap-2 hover:text-darker text-accent duration-300 w-full"
      >
        <AiOutlineEye size={20} />
        <span className="hidden sm:inline">Lihat</span>
      </button>
    </div>
  );
};

export default SeeReport;
