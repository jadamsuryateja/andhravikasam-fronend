import { ArrowRight, Heart, Eye, Gift, ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Hero({ setCurrentView }) {
  const slides = [
    {
      url: "https://images.unsplash.com/uploads/141247613151541c06062/c15fb37d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      alt: "Andhra Pradesh Village",
      title: "Our Andhra, Our Trust",
      text: "Building a better future together"
    },
    {
      url: "https://images.unsplash.com/photo-1520052203542-d3095f1b6cf0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      alt: "Rural India",
      title: "మన ఆంధ్ర, మన భరోసా",
      text: "మన భవిష్యత్తు మన చేతుల్లో"
    },
    {
      url: "https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
      alt: "Youth Volunteers",
      title: "Together, Let's Build Andhra",
      text: "Empowering youth for change"
    },
    {
      url: "https://cdn1.expresscomputer.in/wp-content/uploads/2020/01/15153001/Untitled-design-24.png",
      alt: "Village Development",
      title: "మనం కలిసి ఆంధ్రను నిర్మిద్దాం",
      text: "యువత తో అభివృద్ధి"
    },
    {
      url: "https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
      alt: "Education",
      title: "Youth For Andhra's Future",
      text: "Creating opportunities for all"
    },
    {
      url: "https://images.unsplash.com/uploads/141247613151541c06062/c15fb37d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      alt: "Community",
      title: "ఆంధ్ర భవిష్యత్తు కోసం యువత",
      text: "నేటి యువత రేపటి నాయకులు"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Helper function for navigation
  const handleNavigation = (path) => {
    if (setCurrentView) {
      setCurrentView(path);
    }
    navigate(`/${path}`);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section - Adding overlay background */}
      <div className="relative h-screen overflow-hidden bg-gray-900">
        {/* Image Slider with enhanced gradient */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 
                       ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src={slide.url}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </div>
          ))}
        </div>

        {/* Hero Content - Improved text visibility */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center h-full max-w-3xl">
            <div className="space-y-6">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold 
                   text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl text-white 
                   font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                {slides[currentSlide].text}
              </p>
            </div>

            {/* Enhanced Button Group */}
            <div className="flex flex-col sm:flex-row gap-5 mt-14">
              <button
                onMouseEnter={() => setIsHovered('join')}
                onMouseLeave={() => setIsHovered(null)}
                onClick={() => handleNavigation('join')}  // Updated to use handleNavigation
                className="group relative inline-flex items-center px-8 py-4 
                         bg-gradient-to-r from-primary to-orange-500
                         text-white font-semibold rounded-xl
                         transition-all duration-300 transform hover:scale-105
                         hover:shadow-[0_8px_30px_rgb(255,153,51,0.3)]"
              >
                <Heart 
                  className={`mr-2 h-5 w-5 transition-transform duration-300
                          ${isHovered === 'join' ? 'scale-125' : ''}`}
                />
                Join as Volunteer
              </button>
              
              <button
                onMouseEnter={() => setIsHovered('projects')}
                onMouseLeave={() => setIsHovered(null)}
                onClick={() => handleNavigation('projects')}  // Updated to use handleNavigation
                className="group relative inline-flex items-center px-8 py-4
                         bg-white text-primary font-semibold rounded-xl
                         transition-all duration-300 transform hover:scale-105
                         border-2 border-primary hover:bg-primary hover:text-white
                         hover:shadow-[0_8px_30px_rgb(255,153,51,0.2)]"
              >
                <Eye 
                  className={`mr-2 h-5 w-5 transition-transform duration-300
                          ${isHovered === 'projects' ? 'scale-125' : ''}`}
                />
                View Projects
              </button>
              
              <button
                onMouseEnter={() => setIsHovered('donate')}
                onMouseLeave={() => setIsHovered(null)}
                onClick={() => handleNavigation('donate')}  // Updated to use handleNavigation
                className="group relative inline-flex items-center px-8 py-4
                         bg-gradient-to-r from-primary to-orange-500
                         text-white font-semibold rounded-xl
                         transition-all duration-300 transform hover:scale-105
                         hover:shadow-[0_8px_30px_rgb(255,153,51,0.3)]"
              >
                <Gift 
                  className={`mr-2 h-5 w-5 transition-transform duration-300
                          ${isHovered === 'donate' ? 'scale-125' : ''}`}
                />
                Donate ₹1 for Andhra
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Digital-First Approach Section - Light blue background */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Digital-First Approach
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Leveraging cutting-edge technology to transform civic engagement and create meaningful impact. Our platform connects citizens, volunteers, and administrators to build a more responsive and transparent governance system.
              </p>
              <ul className="space-y-6 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="h-2 w-2 bg-primary rounded-full mr-3 mt-2.5"></span>
                  <div>
                    <strong className="block text-gray-900 mb-1">Real-time Impact Tracking</strong>
                    <p className="text-gray-600">Monitor project progress, volunteer activities, and resource allocation in real-time through our advanced dashboard system.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="h-2 w-2 bg-primary rounded-full mr-3 mt-2.5"></span>
                  <div>
                    <strong className="block text-gray-900 mb-1">Transparent Fund Allocation</strong>
                    <p className="text-gray-600">Every rupee donated is tracked and displayed publicly. View detailed breakdowns of project expenses and outcomes.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="h-2 w-2 bg-primary rounded-full mr-3 mt-2.5"></span>
                  <div>
                    <strong className="block text-gray-900 mb-1">Community-driven Initiatives</strong>
                    <p className="text-gray-600">Empower local communities to identify, report, and solve problems through our mobile-first platform and volunteer network.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img 
                src="https://gulfbusiness.com/wp-content/uploads/2024/10/Untitled-design-2-1.jpg" 
                alt="Digital Dashboard"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-white px-6 py-4 rounded-lg shadow-lg">
                <p className="font-semibold">100% Digital Transparency</p>
                <p className="text-sm opacity-90">Real-time updates & tracking</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Dashboard Section - Light orange background */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Live Impact Dashboard</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real-time tracking of our collective impact across Andhra Pradesh. Every number represents a life touched, a problem solved, and a community transformed.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Problems Solved Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-primary mb-2">0</div>
                <div className="text-gray-600 font-medium">Problems Solved</div>
                <div className="text-sm text-gray-500 mt-2 flex items-center">
                  <span className="text-xs mr-1">↑</span> 
                  0% this month
                </div>
              </div>
            </div>

            {/* Active Volunteers Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-primary mb-2">0</div>
                <div className="text-gray-600 font-medium">Active Volunteers</div>
                <div className="text-sm text-gray-500 mt-2 flex items-center">
                  <span className="text-xs mr-1">↑</span> 
                  0% growth
                </div>
              </div>
            </div>

            {/* Lives Impacted Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-primary mb-2">0</div>
                <div className="text-gray-600 font-medium">Lives Impacted</div>
                <div className="text-sm text-gray-500 mt-2 flex items-center">
                  <span className="text-xs mr-1">↑</span> 
                  0% increase
                </div>
              </div>
            </div>

            {/* Donations Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-primary mb-2">₹0</div>
                <div className="text-gray-600 font-medium">Donations Received</div>
                <div className="text-sm text-gray-500 mt-2 flex items-center">
                  <span className="text-xs mr-1">↑</span> 
                  0% this quarter
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Data updated in real-time. Last refresh: 5 minutes ago
            </p>
            <button 
              onClick={() => handleNavigation('transparency')}
              className="mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-lg
                       hover:bg-primary/90 transition-all duration-300 inline-flex items-center"
            >
              View Detailed Analytics
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>


      {/* Time for Change Section - Deep gradient background */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 
                   drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              The Time for Change is Now
            </h2>
            <p className="text-xl text-white mb-12 leading-relaxed 
                  drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              Join thousands of young leaders who are working together to transform 
              rural Andhra Pradesh. Every village deserves a digital solution for 
              its problems. Together, we're building a stronger state.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => handleNavigation('join')}
                className="px-8 py-4 bg-primary text-white font-semibold rounded-xl
                         hover:bg-orange-600 transition-all duration-300 transform 
                         hover:scale-105 shadow-lg hover:shadow-xl
                         flex items-center justify-center"
              >
                Join Movement
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              
              <button
                onClick={() => handleNavigation('report')}
                className="px-8 py-4 bg-white text-primary font-semibold rounded-xl
                         hover:bg-orange-50 transition-all duration-300 transform 
                         hover:scale-105 shadow-lg hover:shadow-xl border-2 
                         border-primary flex items-center justify-center"
              >
                Report Problem
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Updated gradient background */}
      <section className="py-20 bg-gradient-to-br from-primary via-orange-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Create Change?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Every village problem deserves a digital solution. Join thousands of youth leaders who are transforming governance across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Report Problem Card */}
            <div className="relative group rounded-2xl border-2 border-white/20 overflow-hidden h-[500px]">
              <div className="absolute inset-0">
                <img 
                  src="https://bsmedia.business-standard.com/_media/bs/img/article/2024-09/04/full/1725445000-3884.jpg"
                  alt="Report Problem"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
              </div>
              <div className="relative p-10 h-full flex flex-col justify-between z-10">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4 
                     drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                    Report a Problem
                  </h3>
                  <p className="text-lg text-white mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]
                   leading-relaxed">
                    See an issue in your village or community? Report it now and watch our volunteers spring into action.
                  </p>
                </div>
                <button 
                  onClick={() => handleNavigation('report')}
                  className="w-full px-6 py-4 bg-white text-primary font-semibold 
                           rounded-lg hover:bg-orange-50 transition-all duration-300
                           shadow-lg hover:shadow-xl border-2 border-transparent
                           hover:border-white text-lg"
                >
                  Report Now
                </button>
              </div>
            </div>

            {/* Join Movement Card */}
            <div className="relative group rounded-2xl border-2 border-white/20 overflow-hidden h-[500px]">
              <div className="absolute inset-0">
                <img 
                  src="https://api.fairwear.org/wp-content/uploads/2019/08/perry-grone-lbLgFFlADrY-unsplash-1200x675.jpg"
                  alt="Join Movement"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
              </div>
              <div className="relative p-10 h-full flex flex-col justify-between z-10">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4 
                     drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                    Join the Movement
                  </h3>
                  <p className="text-lg text-white mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]
                   leading-relaxed">
                    Become part of India's largest youth-led governance initiative. Your skills can transform communities.
                  </p>
                </div>
                <button 
                  onClick={() => handleNavigation('join')}
                  className="w-full px-6 py-4 bg-white text-primary font-semibold 
                           rounded-lg hover:bg-orange-50 transition-all duration-300
                           shadow-lg hover:shadow-xl border-2 border-transparent
                           hover:border-white text-lg"
                >
                  Join as Volunteer
                </button>
              </div>
            </div>

            {/* Support Cause Card */}
            <div className="relative group rounded-2xl border-2 border-white/20 overflow-hidden h-[500px]">
              <div className="absolute inset-0">
                <img 
                  src="https://appfrontier.com/wp-content/uploads/2022/09/CB93-500x383.jpg"
                  alt="Support Cause"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
              </div>
              <div className="relative p-10 h-full flex flex-col justify-between z-10">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4 
                     drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                    Support Our Cause
                  </h3>
                  <p className="text-lg text-white mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]
                   leading-relaxed">
                    Every donation directly funds village projects. See exactly where your money goes with our transparency engine.
                  </p>
                </div>
                <button 
                  onClick={() => handleNavigation('donate')}
                  className="w-full px-6 py-4 bg-white text-primary font-semibold 
                           rounded-lg hover:bg-orange-50 transition-all duration-300
                           shadow-lg hover:shadow-xl border-2 border-transparent
                           hover:border-white text-lg"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
