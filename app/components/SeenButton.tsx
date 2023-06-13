import { useCallback } from "react";
import { AiOutlineEye } from "react-icons/ai";
import useReportModal from "../hooks/useReportModal";
import { Report, User } from "@prisma/client";
import useSeen from "../hooks/useSeen";

export interface SeenButtonProps {
  data: Report & {
    user: User;
  };
  currentUser?: User;
}

const SeenButton: React.FC<SeenButtonProps> = ({ data, currentUser }) => {
  const reportModal = useReportModal();
  let dataReport = data;

  // const onSee = useCallback(
  //   (e: React.MouseEvent<HTMLButtonElement>) => {
  //     e.stopPropagation();
  //     reportModal.onOpen(),
  //       reportModal.setReport({
  //         ...data,
  //         listCanceled: JSON.parse(data.listCanceled),
  //       });
  //   },
  //   [reportModal, data]
  // );

  const { hasSeen, seenChecked } = useSeen({
    dataReport,
    currentUser,
  });

  return (
    <button
      onClick={seenChecked}
      className={`rounded-xl py-1 px-4 flex justify-center items-center gap-2 duration-300
      ${
        hasSeen ? "bg-neutral-50 hover:bg-accent" : "bg-accent hover:opacity-70"
      }
      ${hasSeen ? "text-darker hover:text-white" : "text-white"}
      `}
    >
      <AiOutlineEye size={20} />
      Lihat
    </button>
  );
};

export default SeenButton;
