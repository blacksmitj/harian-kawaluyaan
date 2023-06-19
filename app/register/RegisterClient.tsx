"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { RxPerson } from "react-icons/rx";
import { BiLockOpenAlt } from "react-icons/bi";
import Button from "../components/Button";
import { BsFillPersonPlusFill } from "react-icons/bs";

const RegisterClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        setErrorMsg(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const goLogin = useCallback(() => {
    router.push("/login");
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full sm:w-[90%] md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 flex flex-row">
        <div className="w-3/4 bg-primary rounded-l-xl sm:block hidden"></div>
        <div className="bg-white w-full min-w-[30vh] sm:rounded-r-xl items-center flex justify-center px-8 py-20 text-darker sm:h-fit h-screen">
          <div className="flex flex-col gap-6">
            <Heading
              title="Daftar akun anda!"
              subtitle="Mulai daftar untuk membuat laporan harian!"
            />
            <Input
              id="name"
              label="Nama"
              disabled={isLoading}
              register={register}
              errors={errors}
              icon={RxPerson}
              required
              placeholder="Asep Hero"
            />
            <Input
              id="email"
              label="Email"
              disabled={isLoading}
              register={register}
              errors={errors}
              icon={RxPerson}
              required
              placeholder="Masukan email aktif"
            />
            <Input
              id="password"
              type="password"
              label="Password"
              disabled={isLoading}
              register={register}
              errors={errors}
              icon={BiLockOpenAlt}
              required
              placeholder="*******"
            />
            <p className="text-xs text-red-400">{errorMsg}</p>
            <hr />
            <Button
              disabled={isLoading}
              label="Buat akun baru"
              icon={BsFillPersonPlusFill}
              onClick={handleSubmit(onSubmit)}
            />
            <div className="text-neutral-500 text-center mt-4 font-light text-xs">
              <div className="justify-center flex flex-row items-center gap-2">
                <div>sudah punya akun?</div>
                <div
                  onClick={goLogin}
                  className="text-neutral-800 cursor-pointer hover:underline"
                >
                  Login disini!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterClient;
