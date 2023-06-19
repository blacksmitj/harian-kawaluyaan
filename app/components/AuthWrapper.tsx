"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface AuthWrapperProps {
  children: React.ReactNode;
  currentUser: User | null;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, currentUser }) => {
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/dashboard");
    }
  }, [currentUser, router]);

  return <>{children}</>;
};

export default AuthWrapper;
