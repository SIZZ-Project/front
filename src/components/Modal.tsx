"use client";

import { ReactNode } from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className = "",
  showCloseButton = true,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        style={{
          background:
            "linear-gradient(104deg, rgba(255, 255, 255, 0.12) 0.37%, rgba(255, 255, 255, 0.20) 99.63%), rgba(0, 0, 0, 0.80)",
        }}
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-scroll mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden px-6 ${className}`}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute cursor-pointer top-4 right-4 z-10 p-2 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-all"
          >
            <Image
              src="/icons/icon-close.svg"
              alt="닫기"
              width={24}
              height={24}
              className="filter brightness-0 invert"
            />
          </button>
        )}

        {/* Modal Body */}
        {children}
      </div>
    </div>
  );
}
