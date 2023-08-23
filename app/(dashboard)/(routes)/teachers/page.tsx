import { Heading } from "@/components/heading";
import { PiChalkboardTeacher } from "react-icons/pi";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";

export default async function StudentsPage(){
    const supabase = createServerComponentClient({cookies});
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        redirect("/login")
    }
    return ( 
        <div>
            <Heading
             title="Teachers"
             description="Professors professing their profession"
             icon={PiChalkboardTeacher}
             iconColor="text-gray-900"
             bgColor="bg-gray-900/10"
            />
            <div className="pl-6">
                teachears page
            </div>
        </div>
     );
}