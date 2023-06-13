"use client";

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import TableUsers from "@/app/components/tables/TableUsers";
import { User } from "@prisma/client";

interface UsersClientProps {
  users: User[];
}

const UsersClient: React.FC<UsersClientProps> = ({ users }) => {
  return (
    <Container>
      <div className="flex flex-col text-darker pt-20 gap-4">
        <Heading
          title="Kelola User"
          subtitle="Aktivasi atau hapus user yang tidak diinginkan!"
        />
        <TableUsers users={users} />
      </div>
    </Container>
  );
};

export default UsersClient;
