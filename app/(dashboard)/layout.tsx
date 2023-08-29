
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import DashboardHeader from "@/components/dashboardHeader";
import CheckAuth from "@/components/auth/checkAuth"; // Import the CheckAuth component
import ModalProvider from "@/providers/ModalProvider";
import getStudentById from "@/actions/getStudentsByID";

export default async function DashboardLayout ({
    children,
    id,
}: {
    children: React.ReactNode;
    id: string
}) {
    const student = await getStudentById(id);
    return ( 
        <div className="h-full relative">
            <DashboardHeader>
                    mima
            </DashboardHeader>
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900 text-neutral-200">
                <Sidebar />
            </div>
            <main className="md:pl-72">
                <Navbar />
                <ModalProvider students={student}/>
                {children}
            </main>
        </div>
     );
}
