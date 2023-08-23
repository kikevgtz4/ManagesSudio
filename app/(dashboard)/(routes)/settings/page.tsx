import { Heading } from "@/components/heading";
import { CircleDollarSign, Settings } from "lucide-react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";

export default async function AccountingPage(){
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
             title="Settings"
             description="really get my gears grinding"
             icon={Settings}
             iconColor="text-gray-900"
             bgColor="bg-gray-900/10"
            />
            <div className="pl-6">
                settings page
            </div>
        </div>
     );
}