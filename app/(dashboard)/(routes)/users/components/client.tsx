"use client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import TableUsers from "@/app/(dashboard)/(routes)/users/components/table-user";

const UsersClient = () => {
  return (
    <Container>
      <div className="flex flex-col text-darker pt-20 gap-4">
        <Heading
          title="Kelola User"
          subtitle="Aktivasi atau hapus user yang tidak diinginkan!"
        />
        <TableUsers />
      </div>
    </Container>
  );
};

export default UsersClient;
