import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect("/");
  }
  return <div>{children}</div>;
}
