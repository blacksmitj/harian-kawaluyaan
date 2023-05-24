import Avatar from "../Avatar";

interface ProfileMenuProps {
  name: string;
  position: string;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ name, position }) => {
  return (
    <div className="flex items-center gap-3 py-3 mx-3 cursor-pointer group duration-300">
      <Avatar />
      <div className="flex flex-col text-darker">
        <span className="text-sm whitespace-pre font-semibold group-hover:underline group-hover:underline-offset-1">
          {name}
        </span>
        <span className="text-xs whitespace-pre font-light">{position}</span>
      </div>
    </div>
  );
};

export default ProfileMenu;
