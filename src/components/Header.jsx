import { Menu, X, AlertCircle, Wallet2, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'join', label: 'Join', path: '/join' },
    { id: 'projects', label: 'Projects', path: '/projects' },
    { id: 'transparency', label: 'Transparency', path: '/transparency' },
    { id: 'report', label: 'Report Problem', path: '/report' },
    { id: 'contact', label: 'Contact', path: '/contact' },
    ];

  const handleNavigation = (path) => {
    setMobileMenuOpen(false); // Close mobile menu if open
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    navigate(path);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300
                     ${location.pathname === '/donate'
                       ? 'bg-black/20 backdrop-blur-md py-3 lg:py-4'
                       : isScrolled || location.pathname !== '/'
                         ? 'bg-white shadow-md py-2 lg:py-3'
                         : 'bg-transparent py-3 lg:py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Responsive */}
          <div 
            onClick={() => handleNavigation('/')}
            className="flex items-center space-x-2 cursor-pointer flex-shrink-0"
          >
            <img 
              src="/assets/images/favicon.png" 
              alt="Andhra Vikasam Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
            <h1 className={`text-lg sm:text-xl font-bold transition-colors duration-300
               ${location.pathname === '/donate'
                 ? 'text-white'
                 : isScrolled || location.pathname !== '/'
                   ? 'text-orange-500'
                   : 'text-white'}`}>
              Andhra Vikasam
            </h1>
          </div>

          {/* Navigation - Hide on mobile, show on medium+ */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`px-2 xl:px-3 py-2 text-sm font-medium rounded-lg 
                transition-all duration-300 whitespace-nowrap
                ${location.pathname === item.path
                  ? 'bg-orange-500 text-white'
                  : location.pathname === '/donate'
                    ? 'text-white hover:text-white/80'
                    : isScrolled || location.pathname !== '/'
                      ? 'text-gray-800 hover:text-orange-500'
                      : 'text-white hover:text-white/80'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons - Responsive */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 flex-shrink-0">
            <Link
              to="/donate"
              className={`px-3 xl:px-4 py-2 text-sm rounded-lg transition-all duration-300 
                   flex items-center gap-1.5 font-medium shadow hover:shadow-md whitespace-nowrap
                   ${isScrolled || location.pathname !== '/'
                     ? 'bg-green-50 text-green-600 hover:bg-green-100'
                     : 'bg-green-500 text-white hover:bg-green-600'}`}
            >
              <Wallet2 className="h-4 w-4" />
              <span className="hidden xl:inline">Donate</span>
            </Link>

            <Link
              to="/join"
              className={`px-3 xl:px-4 py-2 text-sm font-medium rounded-lg
                transition-all duration-300 shadow hover:shadow-md whitespace-nowrap
                ${isScrolled || location.pathname !== '/'
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-white text-orange-500 hover:bg-white/90'}`}
            >
              Join Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className={`h-6 w-6 ${location.pathname === '/donate' ? 'text-white' : 'text-gray-900'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${
                location.pathname === '/donate'
                  ? 'text-white'
                  : isScrolled || location.pathname !== '/'
                    ? 'text-gray-900'
                    : 'text-white'
              }`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full screen overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white">
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-4 border-b">
              {/* Mobile menu logo - Increased size */}
              <div className="flex items-center space-x-2">
                <img 
                  src="/assets/images/favicon.png" 
                  alt="Andhra Vikasam Logo" 
                  className="w-10 h-10"
                />
                <span className="text-lg font-bold text-orange-500">
                  Andhra Vikasam
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium
                    ${location.pathname === item.path
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-900 hover:bg-gray-50'}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="p-4 border-t">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/donate"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm
                    rounded-lg bg-green-50 text-green-600 font-medium hover:bg-green-100"
                >
                  <Wallet2 className="h-4 w-4" />
                  Donate
                </Link>
                <Link
                  to="/join"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center px-4 py-3 text-sm font-medium
                    rounded-lg bg-orange-500 text-white hover:bg-orange-600"
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
