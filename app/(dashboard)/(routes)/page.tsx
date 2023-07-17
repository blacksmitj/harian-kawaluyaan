import getCurrentUser from "@/actions/getCurrentUser";
import DashboardClient from "./client";
import { getReports } from "@/actions/getReports";
import EmptyState from "@/components/EmptyState";
import ButtonCreate from "@/components/ButtonCreate";

const Dashboard = async () => {
  const currentUser = await getCurrentUser();
  const reports = await getReports();

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
        <ButtonCreate verified={currentUser.verifiedAccount} />
      </>
    );
  }

  return <DashboardClient reports={reports} currentUser={currentUser} />;
};

export const dynamic = "force-dynamic";

export default Dashboard;
