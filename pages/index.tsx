// frontend/pages/index.tsx
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '2rem 0' }}>
      <h1>Pantheon: Confronto dos Deuses</h1>
      <nav
        style={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem'
        }}
      >
        <Link href="/login" className="btn">Login</Link>
        <Link href="/register" className="btn">Register</Link>
      </nav>
    </div>
  )
}

export default Home;
