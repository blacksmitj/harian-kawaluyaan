import getCurrentUser from "@/actions/getCurrentUser";
import ReportsClient from "./components/client";
import EmptyState from "@/components/EmptyState";
import { getReportCountById } from "@/actions/getReportCountById";
import ButtonCreate from "@/components/ButtonCreate";

const ReportsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please Login" />;
  }

  const reports = await getReportCountById({
    userId: currentUser.id,
  });

  if (reports === 0) {
    return (
      <>
        <EmptyState />
        <ButtonCreate verified={currentUser.verifiedAccount} />
      </>
    );
  }

  return (
    <>
      <ButtonCreate verified={currentUser.verifiedAccount} />
      <ReportsClient currentUser={currentUser} />
    </>
  );
};

export default ReportsPage;
