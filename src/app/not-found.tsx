import { Button } from "@radix-ui/themes";
import { CloudOff } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex justify-center items-center w-full">
      <div className="bg-gray-900 rounded-xl p-2 md:p-4 lg:p-6 w-10/12 md:w-11/12 lg:w-full max-w-md relative border border-gray-700 shadow-2xl flex flex-col items-center">
        <CloudOff height={100} width={100} />
        <h2 className="font-bold text-2xl">404</h2>
        <p className="font-semibold text-lg text-gray-500">Page not found</p>
        <p className="text-base text-gray-500">
          HTTP 404: issue not found (ironically)
        </p>
        <div className="w-full flex justify-around md:justify-center gap-4 my-2 md:mt-4">
          <Button>
            <Link href={"/"}>To Homepage</Link>
          </Button>
          <Button className="bg-black">
            <Link href={"/Dashboard"}>To Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
