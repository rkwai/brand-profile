export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <p>&copy; 2023 Brand Voice Profile. All rights reserved.</p>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}