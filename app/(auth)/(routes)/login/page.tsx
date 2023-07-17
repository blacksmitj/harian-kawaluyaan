import getCurrentUser from "@/actions/getCurrentUser";
import LoginClient from "./LoginClient";
import AuthWrapper from "@/components/AuthWrapper";

const LoginPage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <AuthWrapper currentUser={currentUser}>
      <LoginClient />
    </AuthWrapper>
  );
};

export default LoginPage;
