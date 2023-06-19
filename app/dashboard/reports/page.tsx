import { IReportsParams, getReports } from "@/app/actions/getReports";
import ReportsClient from "./ReportsClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import CreateModal from "@/app/components/modals/CreateModal";
import EditModal from "@/app/components/modals/EditModal";
import ButtonCreate from "@/app/components/ButtonCreate";
import DeleteReportModal from "@/app/components/modals/DeleteReportModal";

const ReportsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please Login" />;
  }

  const reports = await getReports({
    userId: currentUser.id,
  });

  if (reports.length === 0) {
    return (
      <>
        <EmptyState />
        <CreateModal />
        <ButtonCreate verified={currentUser.verifiedAccount} />
      </>
    );
  }

  return (
    <>
      <CreateModal />
      <ButtonCreate verified={currentUser.verifiedAccount} />
      <EditModal />
      <DeleteReportModal />
      <ReportsClient currentUser={currentUser} />
    </>
  );
};

export default ReportsPage;
