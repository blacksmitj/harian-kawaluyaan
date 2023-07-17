import getCurrentUser from "@/actions/getCurrentUser";
import Navbar from "@/components/navbar/Navbar";
import SideMenu from "@/components/navbar/SideMenu";
import { ModalProvider } from "@/providers/modal-providers";
import { ToasterProvider } from "@/providers/toast-providers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      <ModalProvider currentUser={currentUser} />
      <ToasterProvider />
      <div className="flex">
        <SideMenu currentUser={currentUser} />
        <div className="flex-1 mx-auto h-screen overflow-y-scroll">
          {children}
        </div>
      </div>
    </>
  );
}
