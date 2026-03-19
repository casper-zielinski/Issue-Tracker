"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const LoginPage = () => {
  const searchParams = useSearchParams();
  return (
    <div className="min-h-screen p-3">
      <div>LoginPage</div>
    </div>
  );
};

export default LoginPage;
