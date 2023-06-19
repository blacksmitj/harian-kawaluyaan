"use client";

import Breadcumb from "@/app/components/Breadcumb";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import TableReports from "@/app/components/tables/TableReports";
import { Report, User } from "@prisma/client";

interface ReportClientProps {
  currentUser: User;
}

const ReportsClient: React.FC<ReportClientProps> = ({ currentUser }) => {
  return (
    <Container>
      <div className="flex flex-col text-darker pt-20 gap-4">
        <Heading title="Laporan" subtitle="Seluruh histori laporan anda!" />
        <TableReports currentUser={currentUser} />
      </div>
    </Container>
  );
};

export default ReportsClient;
