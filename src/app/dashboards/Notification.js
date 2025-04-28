import React from "react";
import { FiCheck } from "react-icons/fi";

export default function Notification({ show, message, onClose, type = "success" }) {
    if (!show) return null;
    return (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl flex items-center gap-3 shadow-lg min-w-[320px] ${
            type === "error" ? "bg-red-600" : "bg-green-600"
        } text-white`}>
            <FiCheck size={28} className="text-white" />
            <span className="font-semibold text-lg">{message}</span>
            <button
                className="ml-auto text-white/80 hover:text-white text-2xl leading-none"
                onClick={onClose}
                aria-label="Close"
            >
                &times;
            </button>
        </div>
    );
} 