import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <>
    <NavBar />
    <h1 className="mb-3 text-2xl font-bold">Next.js Workshop: House Builder</h1>
    <p className="mb-4 text-sm ">
      In this exercise you will explore:
    </p>
    <ul className="mb-6 list-disc space-y-1 pl-5 text-sm">
      <li>Components and props</li>
      <li>API Routes in the App Router</li>
      <li>Server-side rendering with Server Components</li>
      <li>Client-side rendering with Client Components</li>
    </ul>

    <ol className="list-decimal space-y-2 pl-5 text-sm">
      <li>Start on this page and read the README in the repository.</li>
      <li>Open the <code className="rounded bg-slate-200 px-1">/api</code> routes and understand how they work.</li>
      <li>Compare the <code className="rounded bg-slate-200 px-1">/server</code> and <code className="rounded bg-slate-200 px-1">/client</code> pages.</li>
      <li>Complete the TODOs in the code.</li>
    </ol>
  </>
  );
}
