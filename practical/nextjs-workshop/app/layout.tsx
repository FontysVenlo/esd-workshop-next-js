import "./globals.css";

export const metadata = {
  title: "Next.js Workshop - House Builder",
  description: "Practice project for learning components, API Routes, CSR and SSR in Next.js."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className="bg-stone-100">
      <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
    </body>
  </html>
  );
}
