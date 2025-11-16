import NavBar from "@/components/NavBar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <NavBar />
      <h1 className="mb-3 text-2xl font-bold">Next.js Workshop: House Builder</h1>

      <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
        <p>I am going to learn:</p>
        <li>API routes</li>
        <li>Server Components (SSR)</li>
        <li>Client Components (CSR)</li>
        <li>Tailwind components</li>
      </ul>

      <Link href="/client">Go to Client Page</Link>

    </>
  );
}
