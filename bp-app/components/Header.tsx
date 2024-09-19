import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">Brand Voice Profile</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link href="/create-profile" className="hover:text-blue-600">Create Profile</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}