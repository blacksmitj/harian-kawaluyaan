import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import useOpenToast from "./useOpenToast";


interface IUseActiveUser {
  user: User;
}

const useActiveUser = ({
  user,
}: IUseActiveUser ) => {
  const openToast = useOpenToast();
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

      openToast.setTitle("User Konfirmasi");
      openToast.setSubTitle("Konfirmasi user "+ user.name +" dirubah!");
      openToast.onOpen();
      openToast.onChange();
      setTimeout(() => {
        setIsLoading(false)
      },300)
    } catch (error) {
      console.log('Something Error with activating', user.name);
      setIsLoading(false)
    }
  },[user.id, router, user.name, openToast])

  return {
    hasActived, toggleActive, isLoading
  }
}

export default useActiveUser