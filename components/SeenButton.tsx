import { Report, User } from "@prisma/client";
import useSeen from "../hooks/useSeen";

export interface SeenButtonProps {
  data: Report & {
    user: User;
  };
  currentUser?: User;
}

const SeenButton: React.FC<SeenButtonProps> = ({ data, currentUser }) => {
  let dataReport = data;

  const { hasSeen, seenChecked, isLoading } = useSeen({
    dataReport,
    currentUser,
  });

  return (
    <button
      onClick={seenChecked}
      disabled={isLoading}
      className={`rounded-xl py-1 px-4 flex justify-center items-center gap-2 duration-300 disabled:opacity-25
      ${
        hasSeen
          ? "bg-neutral-50 hover:bg-accent"
          : "bg-primary hover:opacity-70"
      }
      ${hasSeen ? "text-darker hover:text-white" : "text-white"}
      `}
    >
      Lihat
    </button>
  );
};

export default SeenButton;
