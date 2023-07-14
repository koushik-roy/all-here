import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <h1>Home page</h1>
      <Link href={"/calculator"} passHref>
        <button>Calculator</button>
      </Link>
    </>
  );
}
