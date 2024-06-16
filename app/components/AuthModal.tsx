"use client";

import { useUserModal } from "@/hooks/useUserModal";
import Modal from "./Modal";

const AuthModal = () => {
    const { isModalOpen, onModalClose, currentUser} = useUserModal();

    const onChange = (open: boolean) => {
        if (!open) {
            onModalClose();
        }
    }

  return (
    <Modal title={currentUser?.userName} isOpen={isModalOpen} onChange={onChange}>
        <div className="flex flex-col w-full justify-start gap-y-2">
            <div className="flex flex-row justify-between items-center px-4">
                <p>Age</p>
                <p>{currentUser?.age}</p>
            </div>
            <div className="flex flex-row justify-between items-center px-4">
                <p>Curriculum</p>
                <p>{currentUser?.curr}</p>
            </div>
            <div className="flex flex-row justify-between items-center px-4">
                <p>Location</p>
                <p>{currentUser?.location}</p>
            </div>
            <div className="flex flex-row justify-between items-center px-4">
                <p>Hobbies</p>
                <p>{currentUser?.hobbies}</p>
            </div>
        </div>
    </Modal>
  )
}

export default AuthModal