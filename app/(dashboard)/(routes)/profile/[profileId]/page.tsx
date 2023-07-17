import { getUsersById } from "@/actions/getUsersById";
import ProfileClient from "./ProfileClient";
import getCurrentUser from "@/actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";

interface IParams {
  profileId: string;
}

const ProfilePage = async ({ params }: { params: IParams }) => {
  const user = await getUsersById({
    id: params.profileId,
  });

  if (!user) {
    return (
      <EmptyState
        title="User tidak ditemukan!"
        subtitle="Ada yang salah dengan referensi user anda!"
      />
    );
  }

  // for Edditing
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title="Anda belum login!" subtitle="Silahkan login dahulu!" />
    );
  }

  return (
    <>
      <ProfileClient currentUser={currentUser} user={user} />
    </>
  );
};

export default ProfilePage;
