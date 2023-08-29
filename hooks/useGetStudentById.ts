import { Student } from "@/types/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react"
import { toast } from "react-hot-toast";

const useGetStudentById = (id?: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [student, setStudent] = useState<Student | undefined>(undefined);
    const { supabaseClient } = useSessionContext();

    useEffect(() => {
        if (!id) {
            return;
        }

        setIsLoading(true);
        
        const fetchStudent = async () => {
            const { data, error } = await supabaseClient
            .from('students')
            .select('*')
            .eq('id', id)
            .single();

            if (error) {
                setIsLoading(false);
                return toast.error(error.message)
            }

            setStudent(data as Student);
            setIsLoading(false);
        }

        fetchStudent();
    }, [id,supabaseClient])

    return useMemo(() => ({
        isLoading,
        student
    }), [isLoading, student])
}

export default useGetStudentById;