import EmptyState from "@/app/components/EmptyState";
import ButtonCreate from "../components/ButtonCreate";
import CreateModal from "../components/modals/CreateModal";
import getCurrentUser from "../actions/getCurrentUser";
import DashboardClient from "./DashboardClient";
import { getReports } from "../actions/getReports";

const Dashboard = async () => {
  const currentUser = await getCurrentUser();
  const reports = await getReports();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please Login" />;
  }

  if (reports === 0) {
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

  return <DashboardClient currentUser={currentUser} />;
};

export const dynamic = "force-dynamic";

export default Dashboard;
