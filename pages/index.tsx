import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className="container">
      <h1>Pantheon: Confronto dos Deuses</h1>
      <nav>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </nav>
    </div>
  )
}

export default Home;
