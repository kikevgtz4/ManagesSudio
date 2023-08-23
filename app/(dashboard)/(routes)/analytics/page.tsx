import { Heading } from "@/components/heading";
import { BarChart3 } from "lucide-react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";

export default async function AnalyticsPage(){
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
             title="Analytics"
             description="Numbers go up and down"
             icon={BarChart3}
             iconColor="text-gray-900"
             bgColor="bg-gray-900/10"
            />
            <div className="pl-6">
                analytics page
            </div>
        </div>
     );
}