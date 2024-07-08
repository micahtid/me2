"use client";

import { useConfirmationModal } from "@/hooks/useConfirmationModal";
import Modal from "./Modal";

import { deleteChat } from "../utils/chatfunctions";
import { removeUserFromUserChats } from "../utils/usersfunctions";

const ConfirmationModal = () => {
    const { isModalOpen, onModalClose, onModalOpen, deleteData } = useConfirmationModal();

    const uid1 = deleteData?.uid1;
    const uid2 = deleteData?.uid2;
    const userName = deleteData?.userName;

    const onChange = (open: boolean) => {
        if (!open) {
            onModalClose();
        }
    }

  return (
    <Modal title="Confirmation" isOpen={isModalOpen} onChange={onChange}>
        <div className="flex flex-col justify-start items-center gap-y-4">
            <p className="text-left">Are you sure you want to close your chat with 
                <span className="font-semibold"> {userName}</span>?</p>
            <div className="flex justify-row w-full gap-x-2">
                <button className="px-4 py-1 bg-accent
                rounded-lg" onClick={() => {
                    if (uid1 && uid2) {
                        const chatid =
                        uid1 > uid2 ? uid1 + uid2 : uid2 + uid1;

                        deleteChat(chatid);
                        removeUserFromUserChats(uid1, uid2);
                        removeUserFromUserChats(uid2, uid1);
                        onModalClose();
                    }
                }}>Yes</button>
                <button className="px-4 py-1 bg-secondary
                rounded-lg" onClick={() => {
                    onModalClose();
                }}>No</button>
            </div>
        </div>
    </Modal>
  )
}

export default ConfirmationModal;