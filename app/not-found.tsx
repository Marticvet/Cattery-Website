import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="studio-setup">
      <p>404 — A little off the beaten path</p>
      <h1>This page has wandered off.</h1>
      <p>The page may have moved, or this little story has not been published yet.</p>
      <Link className="button" href="/">
        Back to our home
      </Link>
    </main>
  );
}
