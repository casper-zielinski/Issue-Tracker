import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center grow">
        <main>
          <h1 className="p-0.5 text-light">Hello World</h1>
        </main>
        <Link
          href="/users"
          className="p-5 my-5 bg-sky-400 text-white text-xl-center flex w-100 hover:bg-sky-950"
        >
          Users
        </Link>
        <ProductCard />
      </div>
    </>
  );
}
