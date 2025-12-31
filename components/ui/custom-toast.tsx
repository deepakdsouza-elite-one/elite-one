"use client";

import { createContext, useContext, useState } from "react";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "warning";

type Toast = {
  id: number;
  title: string;
  description?: string;
  type: ToastType;
};

const ToastContext = createContext<(toast: Omit<Toast, "id">) => void>(
  () => {}
);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, "id">) => {
    const id = Date.now();
    setToasts((t) => [...t, { ...toast, id }]);

    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}

      <div className="fixed bottom-6 right-6 z-9999 space-y-3">
        {toasts.map((toast) => {
          const Icon =
            toast.type === "success"
              ? CheckCircle
              : toast.type === "error"
              ? XCircle
              : AlertTriangle;

          return (
            <div
              key={toast.id}
              className={cn(
                "flex items-start gap-3 rounded-xl border bg-white p-4 shadow-xl w-[320px]",
                toast.type === "success" && "border-green-500",
                toast.type === "error" && "border-red-500",
                toast.type === "warning" && "border-yellow-500"
              )}
            >
              <Icon
                size={20}
                className={cn(
                  toast.type === "success" && "text-green-600",
                  toast.type === "error" && "text-red-600",
                  toast.type === "warning" && "text-yellow-600"
                )}
              />

              <div>
                <p className="font-medium">{toast.title}</p>
                {toast.description && (
                  <p className="text-sm text-gray-600">{toast.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
