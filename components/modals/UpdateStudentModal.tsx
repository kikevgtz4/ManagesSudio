"use client"

import uniqid from "uniqid";
import useEditModal from "@/hooks/useEditModal"
import Modal from "../Modal"
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Input } from "../ui/input";
import useGetStudentById from "@/hooks/useGetStudentById";

const UpdateStudentModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const UpdateStudentModal = useEditModal();

    const { student } = useGetStudentById(UpdateStudentModal.activeId);

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();
    const router = useRouter();

    if (!student || !UpdateStudentModal.activeId) {
        return null;
    }

    const { 
        register, 
        handleSubmit, 
        reset 
    } = useForm<FieldValues>({
        defaultValues: {
            first_name: '',
            last_name: '',
            DoB: '',
            status: "", // Provide the default status or choose one
            email: "", // Provide the email or leave it empty
            middle_name: null, // Provide the middle name or leave it empty
            image_path: null,
        },
      });

      const onChange = (open: boolean) => {
        if (!open) {
          reset();
          UpdateStudentModal.onClose();
        }
      }

      const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
          setIsLoading(true);
          
          const imageFile = values.image?.[0];
          
          if (!user) {
            toast.error('Missing fields')
            return;
          }
    
          const uniqueID = uniqid();
          // Upload image
          const { 
            data: imageData, 
            error: imageError
          } = await supabaseClient
            .storage
            .from('images')
            .upload(`image-${values.title}-${uniqueID}`, imageFile, {
              cacheControl: '3600',
              upsert: false
            });
    
          if (imageError) {
            setIsLoading(false);
            return toast.error('Failed image upload');
          }

        // Update record 
      const { error: supabaseError } = await supabaseClient
      .from("students")
      .update({
        user_id: user.id,
        first_name: values.first_name,
        last_name: values.last_name,
        DoB: values.DoB,
        status: values.status,
        email: values.status, 
        middle_name: values.middle_name, 
        image_path: imageData.path,
      });

    if (supabaseError) {
      return toast.error(supabaseError.message);
    }
    
    router.refresh();
    setIsLoading(false);
    toast.success('Student created!');
    reset();
    UpdateStudentModal.onClose();
  } catch (error) {
    toast.error('Something went wrong');
  } finally {
    setIsLoading(false);
  }
}

    return (
        <Modal
        title="title"
        description="descri"
        isOpen = {UpdateStudentModal.isOpen}
        onChange={onChange}>
            Content
            <form 
             onSubmit={handleSubmit(onSubmit)}
             className="flex flex-col gap-y-4"
             >
                <Input
                id="first_name"
                disabled={isLoading}
                {...register('first_name', { required: true })}
                placeholder="First Name"
                 />
             </form>
             </Modal>
    )
}

export default UpdateStudentModal