"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const ConfirmedLogin = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("confirmed") === "true") {
      toast.success("Email bestätigt, Willkommen!", {
        closeButton: true,
        position: "top-center",
      });
    }
  }, [searchParams]);

  return <>{children}</>;
};

export default ConfirmedLogin;
