'use client';
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: '15vh 24px',
          textAlign: 'center',
          fontFamily: 'Georgia, serif',
          background: '#faf9f7',
          color: '#24211f',
        }}
      >
        <h1>A brief pause.</h1>
        <p>Our website could not load right now. Please try again shortly.</p>
        <button onClick={reset} style={{ padding: '14px 24px', marginTop: 20, cursor: 'pointer' }}>
          Try again
        </button>
      </body>
    </html>
  );
}
