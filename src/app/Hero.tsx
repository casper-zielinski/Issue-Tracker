"use client";

import React from "react";
import Styles from "./Hero.module.css";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <div className={Styles.Hero}>
      <div className="join absolute left-1/2 top-9/12 -translate-x-1/2">
        <button
          className="btn btn-lg btn-outline btn-info w-28 join-item bg-sky-700"
          onClick={() => router.push("/Dashboard")}
        >
          Dashboard
        </button>
        <button
          className="btn btn-lg btn-soft btn-accent w-28 join-item bg-sky-700"
          onClick={() => router.push("/Issues")}
        >
          Issues
        </button>
      </div>
    </div>
  );
};

export default Hero;
