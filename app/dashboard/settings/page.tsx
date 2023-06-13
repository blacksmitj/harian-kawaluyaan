import getCurrentUser from "@/app/actions/getCurrentUser";
import SettingsClient from "./SettingsClient";
import EmptyState from "@/app/components/EmptyState";
import { IUsersParams, getUsers } from "@/app/actions/getUsers";
import DeleteUser from "@/app/components/tables/DeleteUser";
import DeleteUserModal from "@/app/components/modals/DeleteUsertModal";

interface SettingsPageProps {
  searchParams: IUsersParams;
}

const SettingsPage = async ({ searchParams }: SettingsPageProps) => {
  const currentUser = await getCurrentUser();

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
      <SettingsClient users={users} />
    </>
  );
};

export default SettingsPage;
