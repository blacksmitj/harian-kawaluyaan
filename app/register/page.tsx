import { NextResponse } from "next/server";
import getCurrentUser from "../actions/getCurrentUser";
import RegisterClient from "./RegisterClient";
import AuthWrapper from "../components/AuthWrapper";

const RegisterPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <AuthWrapper currentUser={currentUser}>
      <RegisterClient />;
    </AuthWrapper>
  );
};

export default RegisterPage;
