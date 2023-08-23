import { Student } from "@/types/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getStudents = async (): Promise<Student[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
        console.log(sessionError.message);
        return [];
      }


    const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('user_id', sessionData.session?.user.id) //have to then change by organization ID
    .order('created_at', {ascending: false});

    if (error) {
        console.log(error);
    }

    return ( data as any) || []
}

export default getStudents;