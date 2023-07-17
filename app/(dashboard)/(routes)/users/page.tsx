import getCurrentUser from "@/actions/getCurrentUser";
import UsersClient from "./components/client";
import EmptyState from "@/components/EmptyState";
import DeleteUserModal from "@/components/modals/DeleteUsertModal";
import { getUsersCount } from "@/actions/getUsersCount";

const UsersPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser?.role !== "ADMIN") {
    return <EmptyState title="Unauthorized" subtitle="Anda Bukan Admin" />;
  }

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please Login" />;
  }

  const users = await getUsersCount();

  if (users === 0) {
    return <EmptyState title="Tidak Ada Users" subtitle="Daftarkan User" />;
  }

  return (
    <>
      <DeleteUserModal />
      <UsersClient />
    </>
  );
};

export default UsersPage;
