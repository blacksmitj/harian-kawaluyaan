"use client";

import Button from "@/components/Button";
import Container from "@/components/Container";
import ImageUpload from "@/components/inputs/ImageUpload";
import Input from "@/components/inputs/Input";
import useOpenToast from "@/hooks/useOpenToast";
import { User } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface ProfileClientProps {
  currentUser: User;
  user: User;
}

const ProfileClient: React.FC<ProfileClientProps> = ({ currentUser, user }) => {
  const openToast = useOpenToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const isChanged = () => {
    if (currentUser.id === user.id) {
      return true;
    }
    return false;
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser.name,
      image: currentUser.image,
    },
  });

  useEffect(() => {
    reset(user);
  }, [reset, user]);

  const image = watch("image");

  const setCostumValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    axios
      .put(`/api/user/${currentUser.id}`, data)
      .then(() => {
        reset();
        openToast.setTitle("Profil Disimpan");
        openToast.setSubTitle("Data profil telah tersimpan");
        openToast.onOpen();
        router.refresh();
      })
      .catch(() => {
        setMsg("Tidak dapat menyimpan data!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <div className="flex flex-col text-darker pt-20 xl:pt-24 gap-4">
        <div className="flex flex-col gap-8 bg-white w-full h-full lg:p-6 mb-10">
          <div className="relative flex flex-col items-center h-24 mb-6">
            <div className="absolute flex w-full items-center justify-center gap-4 bg-gradient-to-tl from-darker to-primary rounded-t-xl h-full bg-cover"></div>
            <div className="absolute flex flex-col items-center -bottom-20 justify-center">
              <ImageUpload
                onChange={(value) => setCostumValue("image", value)}
                isChanged={isChanged()}
                value={image}
                name={user.name}
                id={user.id}
              />
            </div>
          </div>
          {/* Information */}
          <div className="flex flex-col gap-4 text-sm md:px-4 mt-16">
            <div className="flex flex-row md:gap-12 gap-3">
              <div className="sm:w-1/4 w-[100px] min-w-[100px] flex flex-col gap-1">
                <div className="font-bold">Nama</div>
                <div className="font-light text-xs">Nama user pengguna</div>
              </div>
              <div className="flex h-fit">
                {currentUser.id === user.id ? (
                  <Input
                    id="name"
                    label=""
                    register={register}
                    disabled={isLoading}
                    errors={errors}
                  />
                ) : (
                  user.name
                )}
              </div>
            </div>
            <div className="flex flex-row md:gap-12 gap-3">
              <div className="sm:w-1/4 w-[100px] min-w-[100px] flex flex-col gap-1">
                <div className="font-bold">Email</div>
                <div className="font-light text-xs">
                  Kontak yang dapat dihubungi!
                </div>
              </div>
              <div className="truncate hover:text-clip">{user.email}</div>
            </div>
            <div className="flex flex-row md:gap-12 gap-3">
              <div className="sm:w-1/4 w-[100px] min-w-[100px] flex flex-col gap-1">
                <div className="font-bold">Tanggal Registrasi</div>
                <div className="font-light text-xs">
                  Registrasi pertama kali
                </div>
              </div>
              <div className="w">
                {format(user.createdAt, "cccc, dd MMMM yyyy", {
                  locale: id,
                }) || "Tanggal tidak ditemukan"}
              </div>
            </div>
            <div className="flex flex-row md:gap-12 gap-3">
              <div className="sm:w-1/4 w-[100px] min-w-[100px] flex flex-col gap-1">
                <div className="font-bold">Verifikasi</div>
                <div className="font-light text-xs">
                  Hubungi admin untuk approve akun anda!
                </div>
              </div>
              <div
                className={`py-1 h-fit rounded-md 
            ${!user.verifiedAccount ? "" : "px-2 text-sm bg-accent"}
            ${!user.verifiedAccount ? "text-darker" : "text-white"}
            `}
              >
                {!user.verifiedAccount
                  ? "Belum Terverifikasi"
                  : "Akun Terverifikasi"}
              </div>
            </div>
          </div>
          <hr />
          <div className="flex flex-row justify-end w-full gap-6">
            <div className="sm:w-40 w-full">
              <Button
                neutral
                label="Kembali"
                onClick={() => router.back()}
              ></Button>
            </div>
            {currentUser.id === user.id && (
              <div className="sm:w-40 w-full">
                <Button
                  label="Save Profile"
                  disabled={isLoading}
                  onClick={handleSubmit(onSubmit)}
                ></Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfileClient;
