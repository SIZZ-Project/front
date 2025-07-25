"use client";

import { useEffect } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

// https://github.com/timolins/react-hot-toast/issues/31

export function RootToaster({
  max = 10,
  ...props
}: React.ComponentProps<typeof Toaster> & {
  max?: number;
}) {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= max) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts, max]);

  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        icon: null,
        className:
          "!w-full !max-w-[1200px] h-[100px] !bg-[#282829] !text-coolGray-30 !text-center !text-2xl leading-[150%]",
        success: {
          className:
            "!w-full !max-w-[1200px] h-[100px] !bg-[#282829] !text-coolGray-30 !text-center !text-2xl leading-[150%]",
        },
        error: {
          className:
            "!w-full !max-w-[1200px] h-[100px] !bg-[#282829] !text-coolGray-30 !text-center !text-2xl leading-[150%]",
        },
      }}
      {...props}
    />
  );
}
