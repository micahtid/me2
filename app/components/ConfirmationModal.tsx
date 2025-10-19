"use client";

import { useConfirmationModal } from "@/hooks/useConfirmationModal";
import Modal from "./Modal";
import { IoWarningOutline } from "react-icons/io5";
import { deleteChat } from "../utils/chatfunctions";
import { removeUserFromUserChats } from "../utils/usersfunctions";

const ConfirmationModal = () => {
    const { isModalOpen, onModalClose, deleteData } = useConfirmationModal();
    const { uid1, uid2, userName } = deleteData || {};

    const onChange = (open: boolean) => {
        if (!open) {
            onModalClose();
        }
    }

    const handleDelete = () => {
        if (uid1 && uid2) {
            const chatid = uid1 > uid2 ? uid1 + uid2 : uid2 + uid1;
            deleteChat(chatid);
            removeUserFromUserChats(uid1, uid2);
            removeUserFromUserChats(uid2, uid1);
            onModalClose();
        }
    }

    return (
        <Modal 
            title="Close Chat" 
            isOpen={isModalOpen} 
            onChange={onChange}
        >
            <div className="flex flex-col items-center gap-y-6 px-2">
                {/* Warning Icon */}
                <div className="
                    w-16 h-16 
                    flex items-center justify-center 
                    bg-red-50 rounded-full
                ">
                    <IoWarningOutline className="w-8 h-8 text-red-500" />
                </div>

                {/* Message */}
                <p className="text-gray-500 text-center">
                    Are you sure you want to close your chat with
                    <span className="font-medium text-gray-900"> {userName}</span>?
                </p>

                {/* Buttons */}
                <div className="flex gap-x-3 w-full">
                    <button
                        onClick={onModalClose}
                        className="
                            flex-1 px-4 py-2.5
                            border-2 border-gray-200
                            text-gray-700 font-semibold
                            rounded-xl
                            hover:bg-gray-50 hover:border-gray-300 hover:scale-105
                            transition-all duration-200
                        "
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="
                            flex-1 px-4 py-2.5
                            bg-red-500 border-2 border-red-500
                            text-white font-semibold
                            rounded-xl
                            hover:bg-red-600 hover:border-red-600 hover:scale-105
                            transition-all duration-200
                        "
                    >
                        Close Chat
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmationModal;