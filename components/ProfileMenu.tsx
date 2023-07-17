import { useRouter } from "next/navigation";
import Avatar from "./Avatar";
import { MdVerifiedUser } from "react-icons/md";
import useCreateModal from "../hooks/useCreateModal";
import useReportModal from "../hooks/useDetailReportModal";
import useEditModal from "../hooks/useEditModal";

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
  const createModal = useCreateModal();
  const reportModal = useReportModal();
  const editModal = useEditModal();

  const toProfile = () => {
    if (createModal.isOpen) {
      createModal.onClose();
    }
    if (reportModal.isOpen) {
      reportModal.onClose();
    }
    if (editModal.isOpen) {
      editModal.onClose();
    }
    return router.push(`profile/${id}`);
  };
  return (
    <div className="p-3">
      <div
        onClick={toProfile}
        className="flex items-center gap-3 cursor-pointer group duration-300 whitespace-pre overflow-x-hidden"
      >
        <Avatar src={src} />
        <div className="flex flex-col text-darker gap-1">
          <span className="text-sm font-semibold group-hover:text-accent duration-300 flex gap-1">
            {name}
            <MdVerifiedUser
              size={18}
              className={`${verified ? "text-accent" : "text-neutral-300"}`}
            />
          </span>
          <span className="text-xs font-light">{email}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
