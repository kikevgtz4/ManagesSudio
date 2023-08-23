import { Heading } from "@/components/heading";
import { SiGoogleclassroom } from "react-icons/si";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";

export default async function ClassesPage(){
    const supabase = createServerComponentClient({cookies});
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        redirect("/")
    }
    return ( 
        <div>
            <Heading
             title="Classes"
             description="learning and doing, doing and learning"
             icon={SiGoogleclassroom}
             iconColor="text-gray-900"
             bgColor="bg-gray-900/10"
            />
            <div className="pl-6">
                classes page
            </div>
        </div>
     );
}