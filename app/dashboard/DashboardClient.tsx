"use client";

import { Report, User } from "@prisma/client";
import ButtonCreate from "../components/ButtonCreate";
import Container from "../components/Container";
import Heading from "../components/Heading";
import CreateModal from "../components/modals/CreateModal";
import EditModal from "../components/modals/EditModal";
import ReportCard from "../components/card/ReportCard";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { BsCloudDownload } from "react-icons/bs";
import ReportCardLoader from "../components/ReportCardLoader";
import useOpenToast from "../hooks/useOpenToast";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import useDidMountEffect from "../hooks/useDidMountEffect";

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

  // const observer = useRef<IntersectionObserver | undefined>();

  // const lastBookelementRef = useCallback(
  //   (node: any) => {
  //     if (isLoading) return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && hasMore) {
  //         setStart(start + 5);
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [isLoading, hasMore]
  // );

  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState<ReportWithUser[]>(initialReports);
  const [start, setStart] = useState(0);
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
    <>
      <CreateModal />
      <EditModal />
      <Container>
        <div className="flex flex-col text-darker pt-20">
          <Heading title="Dashboard" subtitle="Seluruh data hari ini!" />
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 my-6">
            <ButtonCreate verified={currentUser.verifiedAccount} />
            {reports.map((report, index) => {
              return (
                <div key={index}>
                  <ReportCard data={report} currentUser={currentUser} />
                </div>
              );
            })}
          </div>
          {isLoading && (
            <div className="flex flex-col gap-4">
              <ReportCardLoader />
              <ReportCardLoader />
            </div>
          )}
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
    </>
  );
};

export default DashboardClient;
