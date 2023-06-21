"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../components/Heading";
import Button from "../components/Button";
import Input from "../components/inputs/Input";
import { RxPerson } from "react-icons/rx";
import { BiLockOpenAlt } from "react-icons/bi";
import { IoLogInOutline } from "react-icons/io5";
import Loader from "../components/Loader";

const LoginClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          router.push("/dashboard");
        }
        if (callback?.error) {
          setErrorMsg(callback.error);
        }
      })
      .catch((e) => {
        setErrorMsg(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const goRegister = useCallback(() => {
    router.push("/register");
  }, [router]);
  return (
    <div className="flex justify-center items-center h-screen bg-white-prime">
      <div className="w-full sm:w-[90%] md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 flex flex-row shadow-2xl shadow-accent/20">
        {isLoading && (
          <div className="fixed inset-0 h-screen w-full bg-white/50 z-[1] justify-center items-center backdrop-blur-sm">
            <Loader />
          </div>
        )}
        <div className="absolute -right-0 circle rounded-full bottom-4"></div>
        <>
          <div className="w-3/4 bg-primary rounded-l-2xl sm:block hidden"></div>
          <div className="bg-white/70 backdrop-blur-[100px] w-full min-w-[30vh] sm:rounded-r-2xl rounded-none items-center flex justify-center px-8 py-20 text-darker sm:h-fit h-screen">
            <div className="flex flex-col gap-6">
              <Heading
                title="Selamat datang!"
                subtitle="Mulai lapor harian anda!"
              />
              <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                icon={RxPerson}
                required
                placeholder="Masukan email anda!"
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
                label="Login"
                icon={IoLogInOutline}
                onClick={handleSubmit(onSubmit)}
              />
              <div className="text-neutral-500 text-center mt-4 font-light text-xs">
                <div className="justify-center flex flex-row items-center gap-2">
                  <div>Akun belum terdaftar?</div>
                  <div
                    onClick={goRegister}
                    className="text-neutral-800 cursor-pointer hover:underline"
                  >
                    Buat akun baru!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default LoginClient;
