import getCurrentUser from "@/app/actions/getCurrentUser";
import UsersClient from "./UsersClient";
import EmptyState from "@/app/components/EmptyState";
import { IUsersParams, getUsers } from "@/app/actions/getUsers";
import DeleteUser from "@/app/components/tables/DeleteUser";
import DeleteUserModal from "@/app/components/modals/DeleteUsertModal";

interface UsersPageProps {
  searchParams: IUsersParams;
}

const UsersPage = async ({ searchParams }: UsersPageProps) => {
  const currentUser = await getCurrentUser();

  if (currentUser?.role !== "ADMIN") {
    return <EmptyState title="Unauthorized" subtitle="Anda Bukan Admin" />;
  }

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please Login" />;
  }

  const users = await getUsers(searchParams);

  if (!users) {
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
