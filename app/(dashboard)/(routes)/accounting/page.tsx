import { Heading } from "@/components/heading";
import { CircleDollarSign } from "lucide-react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";

export default async function AccountingPage () {
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
             title="Accounting"
             description="run the numbers again"
             icon={CircleDollarSign}
             iconColor="text-gray-900"
             bgColor="bg-gray-900/10"
            />
            <div className="pl-6">
                Accounting page
            </div>
        </div>
     );
}