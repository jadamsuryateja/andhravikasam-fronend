import { Menu, X, AlertCircle, Wallet2 } from 'lucide-react';
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
                     ${isScrolled || location.pathname !== '/'
                       ? 'bg-white shadow-md py-3'
                       : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Update the logo link */}
          <div 
            onClick={() => handleNavigation('/')}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <span className="text-2xl">🌿</span>
            <h1 className={`text-xl font-bold transition-colors duration-300
               ${isScrolled || location.pathname !== '/'
                 ? 'text-orange-500'
                 : 'text-white'}`}>
              Andhra Vikasam
            </h1>
          </div>

          {/* Update navigation links */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`px-3 py-2 text-sm font-medium rounded-lg 
             transition-all duration-300
             ${location.pathname === item.path
               ? 'bg-orange-500 text-white'
               : isScrolled || location.pathname !== '/'
                 ? 'text-gray-800 hover:text-orange-500'
                 : 'text-white hover:text-white/80'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Update action buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/report"
              className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 
                   flex items-center gap-1.5 font-medium shadow hover:shadow-md
                   ${isScrolled || location.pathname !== '/'
                     ? 'bg-orange-50 text-orange-500 hover:bg-orange-100'
                     : 'bg-orange-500 text-white hover:bg-orange-500/90'}`}
            >
              <AlertCircle className="h-4 w-4" />
              Report Problem
            </Link>

            <Link
              to="/donate"
              className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 
                   flex items-center gap-1.5 font-medium shadow hover:shadow-md
                   ${isScrolled || location.pathname !== '/'
                     ? 'bg-green-50 text-green-600 hover:bg-green-100'
                     : 'bg-green-500 text-white hover:bg-green-600'}`}
            >
              <Wallet2 className="h-4 w-4" />
              Donate
            </Link>

            <Link
              to="/join"
              className={`px-4 py-2 text-sm font-medium rounded-lg
             transition-all duration-300 shadow hover:shadow-md
             ${isScrolled || location.pathname !== '/'
               ? 'bg-orange-500 text-white hover:bg-orange-600'
               : 'bg-white text-orange-500 hover:bg-white/90'}`}
            >
              Join the Movement
            </Link>
          </div>

          {/* Mobile Menu Button - Slightly smaller */}
          <button
            className="md:hidden p-1.5 rounded-lg transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Updated layout with better text visibility */}
      {mobileMenuOpen && (
        <nav className={`md:hidden border-t transition-all duration-300
               ${isScrolled || location.pathname !== '/'
                 ? 'bg-white border-gray-100' 
                 : 'bg-orange-500/95 border-white/10'}`}>
          <div className="px-4 py-2 space-y-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`block w-full text-left px-4 py-2 rounded-lg text-sm
                         ${location.pathname === item.path
                           ? 'bg-white text-primary font-medium'
                           : isScrolled || location.pathname !== '/'
                             ? 'text-gray-700 hover:bg-gray-50'
                             : 'text-white hover:bg-white/10'
                         }`}
              >
                {item.label}
              </button>
            ))}
            <div className="grid grid-cols-3 gap-2 pt-2 px-4 pb-2">
              <Link 
                to="/report"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs 
                         rounded-lg bg-white text-orange-500 font-medium hover:bg-orange-50"
              >
                <AlertCircle className="h-3.5 w-3.5" />
                Report
              </Link>
              <Link 
                to="/donate"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs 
                         rounded-lg bg-green-50 text-green-600 font-medium hover:bg-green-100"
              >
                <Wallet2 className="h-3.5 w-3.5" />
                Donate
              </Link>
              <Link 
                to="/join"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center px-3 py-2 text-xs font-medium 
                         rounded-lg bg-primary text-white hover:bg-primary/90"
              >
                Join
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
