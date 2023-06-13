import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";


interface IUseActiveUser {
  user: User;
}

const useActiveUser = ({
  user,
}: IUseActiveUser ) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  const hasActived = useMemo(() => {
    return user.verifiedAccount
  },[user.verifiedAccount])

  const toggleActive = useCallback(async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.stopPropagation;

    setIsLoading(true)

    try {
      let request;

      request = () => axios.put(`/api/actived/${user.id}`);

      await request();
      router.refresh();

      setTimeout(() => {
        setIsLoading(false)
      },300)
    } catch (error) {
      console.log('Something Error with activating', user.name);
      setIsLoading(false)
    }
  },[user.id, router, user.name])

  return {
    hasActived, toggleActive, isLoading
  }
}

export default useActiveUser