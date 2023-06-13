"use client";

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";
import Button from "./components/Button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-bl from-darker to-neutral-950 h-screen flex justify-center">
      <div className="flex flex-col justify-center items-center h-3/4 w-3/4 text-white gap-5">
        <p className="text-sm font-semibold text-yellow-500">
          Ada masalah disini
        </p>
        <p className="text-5xl font-bold text-center">{error.message}</p>
        <p className="text-xs font-light mt-6">
          Pilih menu di bawah atau hubungi administrator service!
        </p>
        <div className="flex flex-row gap-2 w-full mt-8">
          <Button label="Login" onClick={() => router.push("/login")} />
          <Button
            neutral
            label="Clear Cache"
            onClick={() => {
              signOut();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
