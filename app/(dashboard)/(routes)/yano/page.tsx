import React from "react";
import { Heading } from "@/components/heading";
import { PiStudentBold } from "react-icons/pi";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"; // Removed unused import
import { DataTable } from "@/components/ui/data-table/data-table";
import { columns } from "./columns"; // Removed unused import
import getStudents from "@/actions/getStudents";
import { Button } from "@/components/ui/button";

export default async function StudentsPage() {
    const students = await getStudents();

    const supabase = createServerComponentClient({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        redirect("/login");
    }

    return (
        <div>
            <Heading
                title="Students"
                description="People, many people"
                icon={PiStudentBold}
                iconColor="text-gray-900"
                bgColor="bg-gray-900/10"
            />
            <div className="container mx-auto py-10 w-full">



                <div className="abolsute right-0">
                    bebo
                </div>
                <div>
                    <DataTable columns={columns} data={students} />
                </div>
            </div>
        </div>
    );
}
