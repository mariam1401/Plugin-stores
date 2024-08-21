import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        display: 'flex',
      }}
    >
      <h2>404 - Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" scroll>
        Return Home
      </Link>
    </div>
  );
}
