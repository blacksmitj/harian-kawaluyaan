"use client";

import Image from "next/image";

interface AvatarProps {
  src: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, size }) => {
  return (
    <Image
      alt="Avatar"
      className="rounded-full"
      height={size || 45}
      width={size || 45}
      src={src}
      loading="lazy"
      priority={false}
    />
  );
};

export default Avatar;
