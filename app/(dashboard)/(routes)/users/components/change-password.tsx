"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import { AiOutlineUnlock } from "react-icons/ai";
import Heading from "../../../../../components/Heading";
import Input from "../../../../../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import Button from "../../../../../components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import useOpenToast from "@/hooks/useOpenToast";

interface ChangePasswordProps {
  user: User;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ user }) => {
  const openToast = useOpenToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const passwordModal = () => {
    setIsOpen(!isOpen);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      password: "",
    },
  });

  useEffect(() => {
    reset(user);
  }, [reset, user]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    setMsg("");

    if (data.password !== data.rePassword) {
      setIsLoading(false);
      setMsg("Password tidak sama");
      return;
    }

    axios
      .put(`/api/password/${user.id}`, data)
      .then(() => {
        reset();
        router.refresh();

        openToast.setTitle("Password Dirubah");
        openToast.setSubTitle("Password telah dirubah!");
        openToast.onOpen();
        openToast.onChange();
      })
      .catch(() => {
        setMsg("Tidak dapat menyimpan data!");
      })
      .finally(() => {
        setMsg("");
        setIsLoading(false);
        setIsOpen(false);
      });
  };

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Trigger asChild>
        <button
          onClick={passwordModal}
          disabled={isLoading}
          className="flex justify-start items-center gap-2 w-full text-darker hover:bg-primary hover:text-white px-2 py-3 rounded-md"
        >
          <AiOutlineUnlock size={20} />
          Ganti Password
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 data-[state=open]: fixed inset-0 z-10" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white px-6 py-4 shadow-lg focus:outline-none z-20">
          <Heading
            title="Ganti Password"
            subtitle="Mengganti user password secara overwrite oleh Admin"
          />
          <div className="flex flex-col py-4 gap-4">
            <Input
              id="password"
              label="Ganti Password"
              type="password"
              disabled={isLoading}
              errors={errors}
              register={register}
              required
            />
            <Input
              id="rePassword"
              label="Ulangi Password"
              type="password"
              disabled={isLoading}
              errors={errors}
              register={register}
              required
            />
          </div>
          {msg && (
            <div className="">
              <p className="text-red-400">{msg}</p>
            </div>
          )}
          <div className="mt-4 flex justify-end mb-4">
            <Button
              disabled={isLoading}
              label="Save"
              onClick={handleSubmit(onSubmit)}
            />
          </div>
          <button
            onClick={passwordModal}
            disabled={isLoading}
            className="text-darker hover:text-accent absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:opacity-70 focus:outline-none"
            aria-label="Close"
          >
            <IoClose size={16} />
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ChangePassword;
