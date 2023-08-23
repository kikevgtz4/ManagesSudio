import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"
import { PiStudentBold } from "react-icons/pi";
import { Heading } from "@/components/heading"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { UserNav } from "@/components/ui/user-nav"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import getStudents from "@/actions/getStudents";

export const metadata: Metadata = {
    title: "Students",
    description: "A student management system using Tanstack Table.",
  };
  
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
          <div>
            <div className="md:hidden">
              <Image
                src="/logo.png"
                width={1280}
                height={998}
                alt="Playground"
                className="block dark:hidden"
              />
              <Image
                src="/images/image_holder.jpg"
                width={1280}
                height={998}
                alt="Playground"
                className="hidden dark:block"
              />
            </div>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    Welcome back!
                  </h2>
                  <p className="text-muted-foreground">
                    Here&apos;s a list of your students!
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <UserNav />
                </div>
              </div>
              <DataTable data={students} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    );
  }