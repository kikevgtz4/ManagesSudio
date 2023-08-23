import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Student } from "@/types/types";

const useLoadImage = (student: Student) => {
  const supabaseClient = useSupabaseClient();
  
  if (!student) {
    return null;
  }

  const { data: imageData } = supabaseClient
    .storage
    .from('images')
    .getPublicUrl(student.image_path);

  return imageData.publicUrl;
};

export default useLoadImage;