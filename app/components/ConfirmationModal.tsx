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
        <div className="flex flex-col justify-start items-center">
            <p>Are you sure you want to remove remove {userName} </p>
            <div className="flex justify-row w-full ">
                <button className="px-2 py-1" onClick={() => {
                    if (uid1 && uid2) {
                        const chatid =
                        uid1 > uid2 ? uid1 + uid2 : uid2 + uid1;

                        deleteChat(chatid);
                        removeUserFromUserChats(uid1, uid2);
                        removeUserFromUserChats(uid2, uid1);
                        onModalClose();
                    }
                }}>Yes</button>
                <button className="px-2 py-1" onClick={() => {
                    onModalClose();
                }}>No</button>
            </div>
        </div>
    </Modal>
  )
}

export default ConfirmationModal;