import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  overlayClassName?: string;   
  contentClassName?: string;   // Classe da caixa do modal
};

export default function Modal({
  isOpen,
  onClose = () => {},
  children,
  overlayClassName = "bg-black/70 backdrop-blur-sm",
  contentClassName = "bg-white text-gray-900",
}: ModalProps) {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setVisible(true);
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false);
  };

  const handleExited = () => {
    onClose();
  };

  return createPortal(
    <AnimatePresence onExitComplete={handleExited}>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 flex items-center justify-center ${overlayClassName}`}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`w-full max-w-md p-6 rounded-2xl shadow-xl relative ${contentClassName}`}
          >
            <Button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-black rounded-full p-1 h-8 w-8"
              variant="ghost"
              aria-label="Fechar modal"
            >
              ×
            </Button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
