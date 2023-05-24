"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="Logo"
      className="cursor-pointer -mx-4"
      height="150"
      width="150"
      src="/images/p3dw-kawaluyaan-black.png"
    />
  );
};

export default Logo;
