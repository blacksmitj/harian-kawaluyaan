import { Report, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import useReportModal from "./useDetailReportModal";

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
  const detailReportModal = useReportModal();
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

    detailReportModal.onOpen()
    detailReportModal.setReport({
      ...dataReport,
      listCanceled: JSON.parse(dataReport.listCanceled),
    });
    setIsLoading(false);

  },[currentUser, router, seenIds, dataReport, detailReportModal, hasSeen])

  return {
    hasSeen, seenChecked, isLoading
  }
}

export default useSeen