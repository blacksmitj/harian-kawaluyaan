"use client";

import * as Toast from "@radix-ui/react-toast";
import { useState } from "react";
import useOpenToast from "../hooks/useOpenToast";
import { IoClose, IoCloseOutline } from "react-icons/io5";

const Notification = () => {
  const openToast = useOpenToast();

  if (openToast.isOpen) {
    setTimeout(() => {
      openToast.onClose();
    }, 5000);
  }

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        open={openToast.isOpen}
        className="bg-white/70 backdrop-blur-md rounded-md shadow-lg shadow-darker/10 p-4 items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut border-[1px] border-primary/20"
      >
        <div className="flex flex-row justify-between items-center gap-8">
          <div className="flex flex-col 0.5">
            <Toast.Title className="font-semibold app-title text-lg">
              {openToast.title}
            </Toast.Title>
            <Toast.Description>
              <p className="text-darker text-sm">{openToast.subTitle}</p>
            </Toast.Description>
          </div>
          <div>
            <Toast.Action className="" asChild altText="close">
              <button
                onClick={openToast.onClose}
                className="border-[2px] rounded-full border-primary/40 p-0.5 hover:opacity-70 text-primary"
              >
                <IoCloseOutline size={20} />
              </button>
            </Toast.Action>
          </div>
        </div>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed top-10 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-fit max-w-[100vw] m-0 list-none z-[99] outline-none" />
    </Toast.Provider>
  );
};

export default Notification;
