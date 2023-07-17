"use client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import TableReports from "@/app/(dashboard)/(routes)/reports/components/table-reports";
import { User } from "@prisma/client";

interface ReportClientProps {
  currentUser: User;
}

const ReportsClient: React.FC<ReportClientProps> = ({ currentUser }) => {
  return (
    <Container>
      <div className="flex flex-col text-darker pt-20 gap-y-4">
        <Heading title="Laporan" subtitle="Seluruh histori laporan anda!" />
        <TableReports currentUser={currentUser} />
      </div>
    </Container>
  );
};

export default ReportsClient;
