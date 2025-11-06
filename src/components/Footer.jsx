import { Sprout } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <Sprout className="h-8 w-8 text-green-500" />
              <span className="ml-2 text-xl font-bold">Andhra Vikasam</span>
            </div>
            <p className="text-gray-400">
              A youth movement for real change. Building our Andhra together, one village at a time.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-green-500 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 transition-colors">Join Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 transition-colors">Projects</a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 transition-colors">Transparency</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>support@andhravikasam.in</li>
              <li>Andhra Pradesh, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p className="mb-2">
            © 2025 Andhra Vikasam | Mana Andhra, Mana Bharosa
          </p>
          <p className="text-sm">
            A youth movement for real change
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
