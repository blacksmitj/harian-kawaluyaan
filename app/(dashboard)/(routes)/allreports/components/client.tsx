"use client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { User } from "@prisma/client";
import TableReports from "./table-reports";

interface ReportClientProps {
  currentUser: User;
}

const ReportsClient: React.FC<ReportClientProps> = ({ currentUser }) => {
  return (
    <Container>
      <div className="flex flex-col text-darker pt-20 gap-y-4">
        <Heading
          title="Laporan Admin"
          subtitle="Seluruh histori laporan user!"
        />
        <TableReports currentUser={currentUser} />
      </div>
    </Container>
  );
};

export default ReportsClient;
