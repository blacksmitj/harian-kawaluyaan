import { IReportsParams, getReports } from "@/app/actions/getReports";
import EmptyState from "@/app/components/EmptyState";
import ButtonCreate from "../components/ButtonCreate";
import CreateModal from "../components/modals/CreateModal";
import getCurrentUser from "../actions/getCurrentUser";
import DashboardClient from "./DashboardClient";

interface DashboardProps {
  searchParams: IReportsParams;
}

const Dashboard = async ({ searchParams }: DashboardProps) => {
  const currentUser = await getCurrentUser();
  const reports = await getReports(searchParams);

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please Login" />;
  }

  if (reports.length === 0) {
    return (
      <>
        <EmptyState
          title="Laporan tidak ada"
          subtitle="coba untuk mengisi data laporan"
        />
        <CreateModal />
        <ButtonCreate verified={currentUser.verifiedAccount} />
      </>
    );
  }

  return <DashboardClient reports={reports} currentUser={currentUser} />;
};

export const dynamic = "force-dynamic";

export default Dashboard;
