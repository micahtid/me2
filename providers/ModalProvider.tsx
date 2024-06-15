"use client";

import AuthModal from "@/app/components/AuthModal";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
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
        <ConfirmationModal />
    </>
  );
};

export default ModalProvider;