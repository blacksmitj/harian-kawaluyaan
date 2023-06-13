"use client";

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import TableUsers from "@/app/components/tables/TableUsers";
import { User } from "@prisma/client";

interface SettingsClientProps {
  users: User[];
}

const SettingsClient: React.FC<SettingsClientProps> = ({ users }) => {
  return (
    <Container>
      <div className="flex flex-col text-darker pt-20 gap-4">
        <Heading title="Pengaturan" subtitle="Pengaturan user dan lainnya!" />
        <TableUsers users={users} />
      </div>
    </Container>
  );
};

export default SettingsClient;
