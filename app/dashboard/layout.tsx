import getCurrentUser from "@/app/actions/getCurrentUser";
import Navbar from "@/app/components/navbar/Navbar";
import SideMenu from "@/app/components/navbar/SideMenu";
import ReportModal from "../components/modals/ReportModal";
import Notification from "../components/Notification";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <>
      <Notification />
      <Navbar />
      <ReportModal currentUser={currentUser} />
      <div className="flex">
        <SideMenu currentUser={currentUser} />
        <div className="flex-1 mx-auto h-screen overflow-y-scroll">
          {children}
        </div>
      </div>
    </>
  );
}
