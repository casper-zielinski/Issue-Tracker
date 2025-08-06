'use client'

import Image from "next/image";
import Styles from "./Hero.module.css"
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <>
      <div className={Styles.Hero}>
       <div className="join absolute left-1/2 top-9/12 -translate-x-1/2">
         <button className="btn btn-lg w-28 join-item bg-sky-700" onClick={() => router.push("/Dashboard")}>Dashboard</button>
         <button className="btn btn-lg w-28 join-item bg-sky-700" onClick={() => router.push("/Issues")}>Issues</button>
       </div>
        </div>
    </>
  );
}
