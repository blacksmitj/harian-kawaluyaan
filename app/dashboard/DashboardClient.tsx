"use client";

import { Report, User } from "@prisma/client";
import ButtonCreate from "../components/ButtonCreate";
import Container from "../components/Container";
import Heading from "../components/Heading";
import CreateModal from "../components/modals/CreateModal";
import EditModal from "../components/modals/EditModal";
import ReportCard from "../components/card/ReportCard";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { BsCloudDownload } from "react-icons/bs";
import useReports from "../hooks/useReports";
import TableLoader from "../components/TableLoader";
import ReportCardLoader from "../components/ReportCardLoader";

export type ReportWithUser = Report & {
  user: User;
};

interface DashboardClientProps {
  currentUser: User;
}

const DashboardClient: React.FC<DashboardClientProps> = ({ currentUser }) => {
  const [start, setStart] = useState(0);
  const { isLoading, error, reports, hasMore } = useReports({
    start,
  });

  const observer = useRef<IntersectionObserver | undefined>();

  const lastBookelementRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setStart(start + 5);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return (
    <>
      <CreateModal />
      <EditModal />
      <Container>
        <div className="flex flex-col text-darker pt-20">
          <Heading title="Dashboard" subtitle="Seluruh data hari ini!" />
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 mt-6">
            <ButtonCreate verified={currentUser.verifiedAccount} />
            {reports.map((report, index) => {
              if (reports.length === index + 1) {
                return (
                  <div ref={lastBookelementRef} key={index}>
                    <ReportCard data={report} currentUser={currentUser} />
                  </div>
                );
              } else {
                return (
                  <div key={index}>
                    <ReportCard data={report} currentUser={currentUser} />
                  </div>
                );
              }
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
              <div className="p-4 bg-primary rounded-full text-white animate-bounce">
                <BsCloudDownload size={20} />
              </div>
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
