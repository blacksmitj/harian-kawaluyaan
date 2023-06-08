import getCurrentUser from "@/app/actions/getCurrentUser";
import { IReportsParams, getReports } from "@/app/actions/getReports";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import Heading from "@/app/components/Heading";
import ReportCard from "@/app/components/card/ReportCard";
import ButtonCreate from "../components/ButtonCreate";
import ReportModal from "../components/modals/ReportModal";
import CreateModal from "../components/modals/CreateModal";
import EditModal from "../components/modals/EditModal";

interface DashboardProps {
  searchParams: IReportsParams;
}

const Dashboard = async ({ searchParams }: DashboardProps) => {
  const reports = await getReports(searchParams);

  if (reports.length === 0) {
    return (
      <>
        <EmptyState />
        <ButtonCreate />
      </>
    );
  }

  return (
    <Container>
      <div className="flex flex-col text-darker pt-20">
        <Heading title="Beranda" subtitle="Seluruh data hari ini!" />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 mt-6 pb-20">
          <CreateModal />
          <EditModal />
          <ButtonCreate />
          {reports.map((report) => {
            return <ReportCard key={report.id} data={report} />;
          })}
        </div>
      </div>
    </Container>
  );
};

export const dynamic = "force-dynamic";

export default Dashboard;
