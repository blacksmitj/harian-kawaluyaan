import { useRouter } from "next/navigation";
import Avatar from "./Avatar";
import { MdVerifiedUser } from "react-icons/md";
import useCreateModal from "../hooks/useCreateModal";
import useReportModal from "../hooks/useReportModal";
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
    return router.push(`dashboard/profile/${id}`);
  };
  return (
    <>
      <div
        onClick={toProfile}
        className="flex items-center gap-3 cursor-pointer group duration-300"
      >
        <Avatar src={src} />
        <div className="flex flex-col text-darker gap-1">
          <span className="text-sm whitespace-pre font-semibold group-hover:text-accent duration-300 flex gap-1">
            {name?.substring(0, 18) + "..."}
            <MdVerifiedUser
              size={18}
              className={`${verified ? "text-accent" : "text-neutral-300"}`}
            />
          </span>
          <span className="text-xs whitespace-pre font-light">
            {email?.substring(0, 20) + "..."}
          </span>
        </div>
      </div>
    </>
  );
};

export default ProfileMenu;
