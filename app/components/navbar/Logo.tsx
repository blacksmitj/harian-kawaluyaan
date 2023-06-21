"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/dashboard")}
      alt="Logo"
      height={44}
      width={151}
      className="p-4 -m-2 cursor-pointer"
      src="/images/p3dw-kawaluyaan.png"
    />
  );
};

export default Logo;
