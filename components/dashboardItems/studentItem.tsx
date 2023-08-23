"use client"

import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { Student } from "@/types/types";

interface StudentItemProps {
  data: Student;
  onClick: (id: string) => void
}

const StudentItem: React.FC<StudentItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);

  return (
    <div
      className="
        relative 
        group 
        flex 
        flex-col 
        items-center 
        justify-center 
        rounded-md 
        overflow-hidden 
        gap-x-4 
        bg-neutral-400/5 
        cursor-pointer 
        hover:bg-neutral-400/10 
        transition 
        p-3
      "
    >
      <div
        className="
          relative 
          aspect-square 
          w-full
          h-full 
          rounded-md 
          overflow-hidden
        "
      >
        <Image
          className="object-cover"
          src={imagePath || '/images/default-placeholder.png'}
          alt="Image"
          width={200}
          height={200}
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">
          {data.first_name} {data.last_name}
        </p>
        <p className="text-neutral-400 text-sm pb-4 w-full truncate">
          Age: {data.age}
        </p>
      </div>
      {/* Additional student information can be added here */}
    </div>
  );
};

export default StudentItem;
