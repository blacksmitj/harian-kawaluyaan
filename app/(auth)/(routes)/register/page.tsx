import RegisterClient from "./RegisterClient";
import getCurrentUser from "@/actions/getCurrentUser";
import AuthWrapper from "@/components/AuthWrapper";

const RegisterPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <AuthWrapper currentUser={currentUser}>
      <RegisterClient />;
    </AuthWrapper>
  );
};

export default RegisterPage;
