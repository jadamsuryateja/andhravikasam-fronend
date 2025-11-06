import { Link } from 'react-router-dom';
import { Sprout, AlertCircle, Wallet2, Users2, Phone, FileText, BookOpen, Target } from 'lucide-react';

function Footer() {
  const mainLinks = [
    { icon: BookOpen, label: 'About Us', path: '/about' },
    { icon: Users2, label: 'Join Us', path: '/join' },
    { icon: Target, label: 'Projects', path: '/projects' },
    { icon: FileText, label: 'Transparency', path: '/transparency' },
    { icon: AlertCircle, label: 'Report Problem', path: '/report' },
    { icon: Phone, label: 'Contact', path: '/contact' },
    { icon: Wallet2, label: 'Donate', path: '/donate' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <Sprout className="h-8 w-8 text-green-500" />
              <span className="ml-2 text-xl font-bold">Andhra Vikasam</span>
            </Link>
            <p className="text-gray-400">
              A youth movement for real change. Building our Andhra together, one village at a time.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              {mainLinks.map(({ icon: Icon, label, path }) => (
                <li key={path}>
                  <Link 
                    to={path} 
                    className="hover:text-green-500 transition-colors inline-flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 123 456 7890</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>support@andhravikasam.in</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Andhra Pradesh, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p className="mb-2">
            © {new Date().getFullYear()} Andhra Vikasam | Mana Andhra, Mana Bharosa
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
