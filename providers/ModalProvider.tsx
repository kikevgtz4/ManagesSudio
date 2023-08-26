"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";
//import SubscribeModal from "@/components/SubscribeModal";
import AddStudentModal from "@/components/modals/AddStudentModal";
//import { ProductWithPrice } from "@/types";

interface ModalProviderProps {
  //products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({
  //products
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
    </>
  );
}

export default ModalProvider;