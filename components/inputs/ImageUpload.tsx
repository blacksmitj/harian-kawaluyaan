"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import axios from "axios";
import { useRouter } from "next/navigation";
import useOpenToast from "@/hooks/useOpenToast";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
  name: string | null;
  isChanged: boolean;
  id: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  name,
  isChanged,
  id,
}) => {
  const openToast = useOpenToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  const deletePhoto = useCallback(() => {
    setIsLoading(true);
    axios
      .put(`/api/photo/${id}`)
      .then(() => {
        openToast.setTitle("Foto dihapus");
        openToast.setSubTitle("Foto anda telah dihapus!");
        openToast.onOpen();
        router.refresh();
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, router, openToast]);

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
          <div className="flex flex-col items-center bg-white/20 rounded-lg shadow-lg p-4 backdrop-blur-md border-[1px] border-white/50 md:w-[50vw] w-[70vw] h-fit gap-4">
            <Avatar
              size={70}
              src={value || process.env.NEXT_PUBLIC_API_DICEBAR! + name}
            />
            {isChanged && (
              <div className="flex flex-row gap-4">
                <button
                  onClick={() => open?.()}
                  disabled={!isChanged}
                  className={`cursor-pointer hover:opacity-70 w-fit duration-150  disabled:cursor-default rounded-md border-[2px] border-primary/50 px-2 py-1 text-sm`}
                >
                  Ganti Foto
                </button>
                {value && (
                  <button
                    onClick={deletePhoto}
                    disabled={!isChanged}
                    className={`cursor-pointer hover:opacity-70 w-fit duration-150  disabled:cursor-default rounded-md  px-2 py-1 text-sm`}
                  >
                    Hapus Foto
                  </button>
                )}
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
