import { Student } from "@/types/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getStudentById = async (id: string): Promise<Student[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase
    .from('students')
    .select('*').eq('id', id)
    .order('created_at', {ascending: false});

    if (error) {
        console.log(error);
    }

    return ( data as any) || []
}

export default getStudentById;