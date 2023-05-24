"use client";

import Image from "next/image";

interface AvatarProps {
  // src: string | null | undefined;
  size?: number;
}

// const Avatar: React.FC<AvatarProps> = ({ src }) => {
const Avatar: React.FC<AvatarProps> = ({ size }) => {
  return (
    <Image
      alt="Avatar"
      className="rounded-full group-hover:border-darker group-hover:border-[2px] duration-300 transition"
      height={size || 45}
      width={size || 45}
      src={"/images/placeholder.jpg"}
      // src={src || "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
