import { Report, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import useReportModal from "./useReportModal";

interface IUseSeen {
  dataReport: Report & {
    user: User;
  };
  currentUser?: User;
}

const useSeen = ({
  dataReport,
  currentUser
}: IUseSeen) => {
  const router = useRouter();
  const seenIds = dataReport.id;
  const reportModal = useReportModal();

  const hasSeen = useMemo(() => {
    const list = currentUser?.seenIds || [];
    return list.includes(seenIds)
  },[currentUser, seenIds]);

  const seenChecked = useCallback(async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation;
    
    if (!currentUser) {
      return;
    }
    
    try {
      let request = () => axios.post(`/api/seen/${seenIds}`);
      
      await request();
      router.refresh();
    } catch (error) {
      console.error(error);
      return
    }

    reportModal.onOpen()
    reportModal.setReport({
      ...dataReport,
      listCanceled: JSON.parse(dataReport.listCanceled),
    });

  },[currentUser, router, seenIds, dataReport, reportModal])

  return {
    hasSeen, seenChecked
  }
}

export default useSeen