"use client"

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
//import { useUser } from "@/hooks/useUser";
import { BarChart3, ArrowRight, CircleDollarSign } from "lucide-react";

import { PiStudentBold, PiChalkboardTeacherBold } from "react-icons/pi"
import { SiGoogleclassroom } from "react-icons/si";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";

const tools = [
    {
        label: "Analytics",
        icon: BarChart3,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/analytics"
    },
    {
        label: "Students",
        icon: PiStudentBold,
        href: "/students",
        color: "text-pink-700",
        bgcolor: "text-pink-700/10",
    },
    {
        label: "Teachers",
        icon: PiChalkboardTeacherBold,
        href: "/teachers",
        color: "text-orange-700",
        bgcolor: "text-orange-700/10",
    },
    {
        label: "Classes",
        icon: SiGoogleclassroom,
        href: "/classes",
        color: "text-emerald-500",
        bgcolor: "text-emerald-500/10",
    },
    {
        label: "Accounting",
        icon: CircleDollarSign ,
        href: "/accounting",
        color: "text-green-700",
        bgcolor: "text-green-700/10",
    },
]

export default async function DashboardPage() {
    //const supabase = createServerComponentClient({cookies});
    //const {
    //    data: { session },
    //} = await supabase.auth.getSession();
//
    //if (!session) {
    //    redirect("/login")
    //}

    //const { user } = useUser(); // Get the user object
    const router = useRouter();

    // Check if user is authenticated
    //if (!user) {
        // Redirect to login or another page if not authenticated
        //router.replace('/login'); // Change 'login' to your desired route
        //return null; // Render nothing if user is not authenticated
  
  return (
    <div>
       <div className="mb-8 space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center">
                Explore the power of AI
            </h2>
            <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                Chat with the smartest AI - Experience the power of AI
            </p>
       </div>
       <div className="px-4 md:px-20 lg:px-32 space-y-4">
            {
                tools.map((tool) => (
                    <Card 
                     onClick={() => router.push(tool.href)}
                     key={tool.href}
                     className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                    >
                        <div className="flex items-center gap-x-4">
                            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                <tool.icon className={cn("w-8 h-8", tool.color)} />
                            </div>
                            <div className="font-semibold">
                                {tool.label}
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5"/>
                    </Card>
                ))
            }
       </div>
    </div>
  )
}