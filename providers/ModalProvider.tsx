"use client";

import UserModal from "@/app/components/UserModal";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import RoomModal from "@/app/components/RoomModal";
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
        <UserModal />
        <ConfirmationModal />
        <RoomModal />
    </>
  );
};

export default ModalProvider;