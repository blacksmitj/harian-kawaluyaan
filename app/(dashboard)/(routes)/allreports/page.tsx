import getCurrentUser from "@/actions/getCurrentUser";
import ReportsClient from "./components/client";
import EmptyState from "@/components/EmptyState";

const ReportsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please Login" />;
  }

  return (
    <>
      <ReportsClient currentUser={currentUser} />
    </>
  );
};

export default ReportsPage;
