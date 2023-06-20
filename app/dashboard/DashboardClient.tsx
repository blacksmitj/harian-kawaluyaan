"use client";

import { Report, User } from "@prisma/client";
import ButtonCreate from "../components/ButtonCreate";
import Container from "../components/Container";
import Heading from "../components/Heading";
import CreateModal from "../components/modals/CreateModal";
import EditModal from "../components/modals/EditModal";
import ReportCard from "../components/card/ReportCard";
import { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import { BsCloudDownload } from "react-icons/bs";

interface DashboardClientProps {
  reports: (Report & {
    user: User;
  })[];
  currentUser: User;
}

type ReportWithUser = Report & {
  user: User;
};

type PageChangeHandler = (selectedItem: { selected: number }) => void;

const DashboardClient: React.FC<DashboardClientProps> = ({
  reports: initialReports,
  currentUser,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState<ReportWithUser[]>(initialReports);
  const [start, setStart] = useState(5);
  const [limit, setLimit] = useState(5);
  const [hasMore, setHasMore] = useState(true);

  // useEffect(() => {
  //   getReports();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [start]);

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
          <Heading title="Beranda" subtitle="Seluruh data hari ini!" />
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 mt-6">
            <ButtonCreate verified={currentUser.verifiedAccount} />
            {reports.map((report, index) => {
              return (
                <div key={index}>
                  <ReportCard
                    key={report.id}
                    data={report}
                    currentUser={currentUser}
                  />
                </div>
              );
            })}
          </div>
          <div className="m-8 flex justify-center">
            {hasMore ? (
              <button
                onClick={getReports}
                className="p-4 bg-primary rounded-full text-white animate-bounce"
              >
                <BsCloudDownload size={20} />
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
