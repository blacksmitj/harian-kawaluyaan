import getCurrentUser from "@/app/actions/getCurrentUser";
import UsersClient from "./UsersClient";
import EmptyState from "@/app/components/EmptyState";
import DeleteUserModal from "@/app/components/modals/DeleteUsertModal";
import { getUsersCount } from "@/app/actions/getUsersCount";

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
