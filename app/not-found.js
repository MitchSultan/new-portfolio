import Link from "next/link";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-lg text-neutral-600">
        That page may have moved or the address may be incorrect.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link className="underline underline-offset-4" href="/">
          Return to the homepage
        </Link>
        <Link className="underline underline-offset-4" href="/Services">
          Explore web services
        </Link>
      </div>
    </main>
  );
}
