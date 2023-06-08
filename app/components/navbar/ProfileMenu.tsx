import { useRouter } from "next/navigation";
import Avatar from "../Avatar";

interface ProfileMenuProps {
  id: string;
  name: string;
  email: string;
  src: string;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ name, email, src, id }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`dashboard/profile/${id}`)}
      className="flex items-center gap-3 py-3 mx-3 cursor-pointer group duration-300"
    >
      <Avatar src={src} />
      <div className="flex flex-col text-darker">
        <span className="text-sm whitespace-pre font-semibold group-hover:underline group-hover:underline-offset-1">
          {name}
        </span>
        <span className="text-xs whitespace-pre font-light">{email}</span>
      </div>
    </div>
  );
};

export default ProfileMenu;
