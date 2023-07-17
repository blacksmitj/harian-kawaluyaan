"use client";

import { useRouter } from "next/navigation";
import Avatar from "./Avatar";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface UserHeadProps {
  image?: string | null;
  name: string | null;
  userId: string;
  createdAt: Date;
}

const UserHead: React.FC<UserHeadProps> = ({
  image,
  name,
  userId,
  createdAt,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-row gap-4 items-center">
      <Avatar
        src={image || process.env.NEXT_PUBLIC_API_DICEBAR! + name}
        size={55}
      />
      <div className="flex flex-col">
        <span
          onClick={() => router.push(`profile/${userId}`)}
          className="text-md font-bold hover:text-accent cursor-pointer group duration-300"
        >
          {name}
        </span>
        <span className="text-xs font-light">
          {format(createdAt, "cccc, dd MMMM yyyy - hh:mm a", {
            locale: id,
          })}
        </span>
      </div>
    </div>
  );
};

export default UserHead;
