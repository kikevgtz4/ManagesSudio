"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";
//import SubscribeModal from "@/components/SubscribeModal";
import AddStudentModal from "@/components/modals/AddStudentModal";
import UpdateStudentModal from "@/components/modals/UpdateStudentModal";
//import { ProductWithPrice } from "@/types";
import { Student } from "@/types/types";

interface ModalProviderProps {
  //products: ProductWithPrice[];
  students: Student[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({
  //products
  students,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      {/*<SubscribeModal products={products} />*/}
      <AddStudentModal />
      
      <UpdateStudentModal/>
      
      
    </>
  );
};

export default ModalProvider;
