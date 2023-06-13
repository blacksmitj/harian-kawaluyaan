import { useRouter } from "next/navigation";
import Avatar from "../Avatar";
import { MdVerifiedUser } from "react-icons/md";

interface ProfileMenuProps {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  src: string;
  verified?: boolean;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  name,
  email,
  src,
  id,
  verified,
}) => {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.push(`dashboard/profile/${id}`)}
        className="flex items-center gap-3 py-3 mx-3 cursor-pointer group duration-300"
      >
        <Avatar src={src} />
        <div className="flex flex-col text-darker gap-1">
          <span className="text-sm whitespace-pre font-semibold group-hover:underline group-hover:underline-offset-1 flex gap-1">
            {name}
            <MdVerifiedUser
              size={18}
              className={`${verified ? "text-accent" : "text-neutral-300"}`}
            />
          </span>
          <span className="text-xs whitespace-pre font-light">{email}</span>
        </div>
      </div>
    </>
  );
};

export default ProfileMenu;
