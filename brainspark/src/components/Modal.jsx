import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button"

export default function Modal({ isOpen, onClose = () => {}, children }) {
  const [visible, setVisible] = useState(isOpen);

  // Atualiza visibilidade quando isOpen muda
  useEffect(() => {
    if (isOpen) setVisible(true);
  }, [isOpen]);

  // Ao sair da animação, chama onClose
  const handleClose = () => {
    setVisible(false);
  };

  const handleExited = () => {
    onClose(); // chama função de fechar depois da animação
  };

  return createPortal(
    <AnimatePresence onExitComplete={handleExited}>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-900 text-white w-full max-w-md p-6 rounded-2xl shadow-xl relative"
          >
            <Button
              onClick={handleClose}
              className="absolute top-3 right-3 transition text-white/60 text-sm p-1 bg-transparent border-none shadow-none outline-none
               hover:text-white hover:bg-transparent active:border-none"
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
