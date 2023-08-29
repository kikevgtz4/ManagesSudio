"use client";

import uniqid from "uniqid";
import React, { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from "@/hooks/useUser";

import Modal from '../Modal';
import { Input } from "../ui/input";
import { Button } from "../ui/button";


const AddStudentModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const AddStudentModal = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      first_name: '',
      last_name: '',
      DoB: '',
      status: "", // Provide the default status or choose one
      email: "", // Provide the email or leave it empty
      middle_name: null, // Provide the middle name or leave it empty
      image_path: null,
    }
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      AddStudentModal.onClose();
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

      
      // Create record 
      const { error: supabaseError } = await supabaseClient
        .from("students")
        .insert({
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
      AddStudentModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Add a Student"
      description="description"
      isOpen={AddStudentModal.isOpen}
      onChange={onChange}
    >
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
        <Input
          id="middle_name"
          disabled={isLoading}
          {...register('middle_name', { required: false })}
          placeholder="Middle Name"
        />
        <Input
          id="last_name"
          disabled={isLoading}
          {...register('last_name', { required: true })}
          placeholder="last_name"
        />
        <Input
          id="email"
          disabled={isLoading}
          {...register('email', { required: true })}
          placeholder="Email"
        />
        <Input
          id="DoB"
          disabled={isLoading}
          {...register('DoB', { required: true })}
          placeholder="Date of Birth"
        />
        <Input
          id="status"
          disabled={isLoading}
          {...register('status', { required: true })}
          placeholder="Status"
        />
        <div>
          <div className="pb-1">
            Select an image
          </div>
          <Input
            placeholder="test" 
            disabled={isLoading}
            type="file"
            accept="image/*"
            id="image"
            {...register('image', { required: false })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
}

export default AddStudentModal;