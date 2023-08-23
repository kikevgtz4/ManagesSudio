"use client"

// src/components/auth/CheckAuth.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const CheckAuth = () => {
    useEffect(() => {
        const checkAuth = async () => {
            const supabase = createServerComponentClient({ cookies });
            const { data: session } = await supabase.auth.getSession();

            if (!session) {
                redirect("/login"); // Redirect to login if not authenticated
            }
        };

        checkAuth();
    }, []);

    return null;
};

export default CheckAuth;
