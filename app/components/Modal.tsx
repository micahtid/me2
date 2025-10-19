import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  children
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/50 backdrop-blur-[1px] fixed inset-0 z-30" />
        <Dialog.Content className="fixed top-[50%] left-[50%]
        max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px]
        translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white p-[25px] focus:outline-none z-40 border border-gray-200">
            <Dialog.Title className="text-xl text-center font-bold mb-4">
                {title}
            </Dialog.Title>
            <div className="">
                {children}
            </div>
            <Dialog.Close asChild>
                <button className="text-gray-400 hover:text-header hover:bg-primary/20 transition-colors duration-200 absolute top-[10px] right-[10px] inline-flex h-[28px] w-[28px]
                appearance-none items-center justify-center rounded-full focus:outline-none">
                    <IoMdClose size={18} />
                </button>
            </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;