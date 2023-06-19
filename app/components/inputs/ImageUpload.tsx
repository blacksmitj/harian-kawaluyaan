"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useCallback } from "react";
import Avatar from "../Avatar";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
  name: string | null;
  isChanged: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  name,
  isChanged,
}) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="dfewblo9"
      options={{
        maxFiles: 1,
        sources: ["local"],
      }}
    >
      {({ open }) => {
        return (
          <>
            <button
              onClick={() => open?.()}
              disabled={!isChanged}
              className={`cursor-pointer hover:scale-90 w-fit duration-150 disabled:hover:scale-90 disabled:cursor-default border-4 hover:border-2 rounded-full`}
            >
              <Avatar
                size={70}
                src={
                  value ||
                  `https://api.dicebear.com/6.x/big-smile/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=` +
                    name
                }
              />
            </button>
          </>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
