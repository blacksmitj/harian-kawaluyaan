import { User } from "@prisma/client";
import React, { useState } from "react";
import useActiveUser from "../hooks/useActiveUser";

interface ToggleActiveUserProps {
  user: User;
}

const ToggleActiveUser: React.FC<ToggleActiveUserProps> = ({ user }) => {
  // const [isLoading, setIsLoading] = useState(false);
  const { hasActived, toggleActive, isLoading } = useActiveUser({ user });

  return (
    <div className="flex flex-col items-start gap-2">
      <label
        className={`relative inline-flex items-center ${
          isLoading ? "cursor-not-allowed" : "cursor-pointer"
        } `}
      >
        <input
          type="checkbox"
          checked={hasActived}
          onChange={toggleActive}
          className="sr-only peer"
        />
        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/50 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all  peer-checked:bg-accent"></div>
      </label>
    </div>
  );
};

export default ToggleActiveUser;
