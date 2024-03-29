"use client"

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils"
import { LayoutDashboard, Settings, BarChart3, CircleDollarSign  } from "lucide-react";
import { usePathname } from "next/navigation";
import { PiChalkboardTeacherBold, PiStudentBold } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";

const montserrat = Montserrat({ weight: "600", subsets:['latin'] });

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Analytics",
        icon: BarChart3,
        color: "text-violet-500",
        href: "/analytics"
    },
    {
        label: "Students",
        icon: PiStudentBold,
        href: "/students",
        color: "text-pink-700",
    },
    {
        label: "Teachers",
        icon: PiChalkboardTeacherBold,
        href: "/teachers",
        color: "text-orange-700",
    },
    {
        label: "Classes",
        icon: SiGoogleclassroom,
        href: "/classes",
        color: "text-emerald-500",
    },
    {
        label: "Accounting",
        icon: CircleDollarSign,
        href: "/accounting",
        color: "text-green-700",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    },
];

const Sidebar = () => {
    const pathname = usePathname();

    return ( 
        <div className="space-y-4 py-4 flex flex-col h-full bg-gray text-neutral-200">
            <div className="px-3 py-2 flex-1">
                <Link href={"/dashboard"} className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image 
                            fill
                            alt="Logo"
                            src="/logo.png"
                        />
                    </div>
                    <h1 className={cn ("text-2xl font-bold", montserrat.className)}>
                        Manager 2.0
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link 
                        href={route.href}
                        key={route.href}
                        className={cn ("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                        pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default Sidebar;