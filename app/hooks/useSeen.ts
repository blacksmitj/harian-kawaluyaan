import { Report, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false)

  const hasSeen = useMemo(() => {
    const list = currentUser?.seenIds || [];
    return list.includes(seenIds)
  },[currentUser, seenIds]);

  const seenChecked = useCallback(async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation;

    setIsLoading(true);
    
    if (!currentUser) {
      return;
    }

    if (!hasSeen) {
      try {
        let request = () => axios.post(`/api/seen/${seenIds}`);
        await request();
        router.refresh();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
        return
      }
    }

    reportModal.onOpen()
    reportModal.setReport({
      ...dataReport,
      listCanceled: JSON.parse(dataReport.listCanceled),
    });
    setIsLoading(false);

  },[currentUser, router, seenIds, dataReport, reportModal, hasSeen])

  return {
    hasSeen, seenChecked, isLoading
  }
}

export default useSeen