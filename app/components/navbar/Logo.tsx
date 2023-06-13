"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/dashboard")}
      alt="Logo"
      className="cursor-pointer p-2"
      height="150"
      width="150"
      src="/images/p3dw-kawaluyaan.png"
    />
  );
};

export default Logo;
