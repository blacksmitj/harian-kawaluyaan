"use client";

import { Report, User } from "@prisma/client";
import { useState } from "react";
import { BsCloudDownload } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/navigation";
import useOpenToast from "@/hooks/useOpenToast";
import useDidMountEffect from "@/hooks/useDidMountEffect";
import ReportCardLoader from "@/components/ReportCardLoader";
import Container from "@/components/Container";
import ButtonCreate from "@/components/ButtonCreate";
import ReportCard from "@/components/card/report-card";

export type ReportWithUser = Report & {
  user: User;
};

interface DashboardClientProps {
  currentUser: User;
  reports: (Report & {
    user: User;
  })[];
}

const DashboardClient: React.FC<DashboardClientProps> = ({
  currentUser,
  reports: initialReports,
}) => {
  const openToast = useOpenToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState<ReportWithUser[]>(initialReports);
  const [start, setStart] = useState(10);
  const [limit, setLimit] = useState(5);
  const [hasMore, setHasMore] = useState(true);

  useDidMountEffect(() => {
    setReports([]);
    setStart(0);
    router.refresh();
  }, [openToast.isChange]);

  const getReports = async () => {
    setIsLoading(true);
    const response = await axios.get(`/api/dashboard`, {
      params: {
        start,
        limit,
      },
    });

    const results = response.data.result.map((result: any) => ({
      ...result,
      createdAt: new Date(result.createdAt),
      updatedAt: new Date(result.updatedAt),
      user: {
        ...result.user,
        createdAt: new Date(result.user.createdAt),
      },
    }));

    setReports([...reports, ...results]);
    setIsLoading(false);
    setHasMore(response.data.hasMore);

    if (hasMore) {
      setStart(start + 5);
    }
  };

  return (
    <Container>
      <div className="grid text-darker pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 my-6">
          <ButtonCreate verified={currentUser.verifiedAccount} />
          {reports.map((report, index) => {
            return (
              <div key={index}>
                <ReportCard data={report} currentUser={currentUser} />
              </div>
            );
          })}
          {isLoading && (
            <>
              <ReportCardLoader />
              <ReportCardLoader />
              <ReportCardLoader />
              <ReportCardLoader />
              <ReportCardLoader />
              <ReportCardLoader />
              <ReportCardLoader />
              <ReportCardLoader />
              <ReportCardLoader />
            </>
          )}
        </div>

        <div className="m-8 flex justify-center">
          {hasMore ? (
            <button
              onClick={getReports}
              className="p-4 bg-primary rounded-lg text-white border-[1px] border-darker/60 animate-bounce flex gap-2"
            >
              <BsCloudDownload size={20} />
              Unduh Data
            </button>
          ) : (
            <p>data terakhir disini...</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default DashboardClient;
