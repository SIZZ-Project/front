"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface LoginSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export default function LoginSuccessModal({
  isOpen,
  onClose,
  children,
}: LoginSuccessModalProps) {
  // Prevent SSR errors and hide when closed
  if (typeof document === "undefined" || !isOpen) {
    return null;
  }

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    console.error("Modal root element not found");
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="bg-white p-6 z-10 rounded shadow-lg">{children}</div>
    </div>,
    modalRoot
  );
}
