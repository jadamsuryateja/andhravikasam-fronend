import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Eye, 
  Gift, 
  Users, 
  AlertCircle, 
  MapPin, 
  CheckCircle,
  ArrowDown,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';


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
  const [impactStats, setImpactStats] = useState({
    villages: 0,
    problems: 0,
    funds: 0,
    volunteers: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Animation variants for buttons
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Handler functions for buttons
  const handleJoinClick = () => {
    navigate('/join');
  };

  const handleProjectsClick = () => {
    navigate('/projects');
  };

  const handleDonateClick = () => {
    // Add your donation handling logic here
    window.open('https://your-donation-link.com', '_blank');
  };

  // Helper function for navigation
  const handleNavigation = (path) => {
    if (setCurrentView) {
      setCurrentView(path);
    }
    navigate(`/${path}`);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative min-h-[600px] h-[100svh] overflow-hidden bg-gray-900">
        {/* Image Slider */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out
                       ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
            >
              <img
                src={slide.url}
                alt={slide.alt}
                loading={index === 0 ? "eager" : "lazy"}
                className="w-full h-full object-cover"
              />
              {/* Updated gradient overlay with lighter fade effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center items-center h-full text-center">
            <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold 
                   text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]
                   tracking-tight leading-[1.1]">
                {slides[currentSlide].title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90
                   font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                {slides[currentSlide].text}
              </p>
            </div>
          </div>

          {/* Scroll Indicator - Centered */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 
                         animate-bounce hidden sm:block">
            <ArrowDown className="h-5 w-5 text-white/80" />
          </div>
        </div>
      </div>

      {/* Digital-First Approach Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4 text-gray-900">
              How Andhra Vikasam Transforms Civic Engagement
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              We're not just another NGO. We're a revolutionary platform that bridges the gap between India's digital-native youth and grassroots governance needs.
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {/* Digital-First Approach - Image on left */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-6 sm:gap-8">
              <div className="w-full md:w-1/2">
                <img 
                  src="https://images.pexels.com/photos/5198239/pexels-photo-5198239.jpeg"
                  alt="Digital Approach" 
                  className="rounded-lg w-full h-[250px] sm:h-[300px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 mt-6 md:mt-0">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                    <span className="text-white text-sm">1</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Digital-First Approach</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  Every village problem gets a digital solution. Our platform connects rural challenges with tech-savvy youth solutions.
                </p>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    GPS-enabled problem reporting
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Real-time photo documentation
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Instant volunteer matching
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Progress tracking dashboard
                  </li>
                </ul>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button 
                    onClick={() => handleNavigation('join')}
                    className="w-full sm:w-auto px-4 py-2 bg-orange-500 text-white rounded-full text-sm hover:bg-orange-600 transition-colors"
                  >
                    Join as Volunteer
                  </button>
                  <button 
                    onClick={() => handleNavigation('transparency')}
                    className="w-full sm:w-auto px-4 py-2 border border-orange-500 text-orange-500 rounded-full text-sm hover:bg-orange-50 transition-colors"
                  >
                    See Transparency
                  </button>
                </div>
              </div>
            </div>

            {/* Radical Transparency - Image on right */}
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              <div className="w-full md:w-1/2">
                <img 
                  src="https://images.pexels.com/photos/7567444/pexels-photo-7567444.jpeg"
                  alt="Radical Transparency" 
                  className="rounded-lg w-full h-[250px] sm:h-[300px] object-cover shadow-lg"
                />
              </div>
              <div className="w-full md:w-1/2 mt-6 md:mt-0">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                    <span className="text-white text-sm">2</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Radical Transparency</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  Track every rupee, every project, every impact. Our transparency engine ensures accountability at every step.
                </p>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Real-time fund tracking
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Public audit trails
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Impact measurement metrics
                  </li>
                </ul>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button 
                    onClick={() => handleNavigation('join')}
                    className="w-full sm:w-auto px-4 py-2 bg-orange-500 text-white rounded-full text-sm hover:bg-orange-600 transition-colors"
                  >
                    Join as Volunteer
                  </button>
                  <button 
                    onClick={() => handleNavigation('transparency')}
                    className="w-full sm:w-auto px-4 py-2 border border-orange-500 text-orange-500 rounded-full text-sm hover:bg-orange-50 transition-colors"
                  >
                    See Transparency
                  </button>
                </div>
              </div>
            </div>

            {/* Youth-Led Governance - Image on left */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-6 sm:gap-8">
              <div className="w-full md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846"
                  alt="Youth-Led Governance" 
                  className="rounded-lg w-full h-[250px] sm:h-[300px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 mt-6 md:mt-0">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                    <span className="text-white text-sm">3</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Youth-Led Governance</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  From campus to constituency, we're building the next generation of civic leaders who create measurable change.
                </p>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Skill-based volunteer matching
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Leadership development programs
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    Career impact documentation
                  </li>
                </ul>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button 
                    onClick={() => handleNavigation('join')}
                    className="w-full sm:w-auto px-4 py-2 bg-orange-500 text-white rounded-full text-sm hover:bg-orange-600 transition-colors"
                  >
                    Join as Volunteer
                  </button>
                  <button 
                    onClick={() => handleNavigation('transparency')}
                    className="w-full sm:w-auto px-4 py-2 border border-orange-500 text-orange-500 rounded-full text-sm hover:bg-orange-50 transition-colors"
                  >
                    See Transparency
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Dashboard Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1E293B] mb-4">
              Live Impact Dashboard
            </h2>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto">
              Real-time metrics showing the power of youth-led governance across India.
              Every number represents lives touched, problems solved, and communities transformed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Villages Covered */}
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200">
              <div className="flex flex-col">
                <div className="text-gray-400 text-sm mb-2">
                  LIVE COUNT
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-6 h-6 text-orange-500" />
                  <span className="text-4xl font-bold text-orange-500">
                    {impactStats.villages.toLocaleString()}
                  </span>
                </div>
                <div className="text-gray-700 font-medium">
                  Villages Covered
                </div>
                <div className="text-gray-500 text-sm mt-1">
                  Across Andhra Pradesh
                </div>
                <div className="w-full h-1 bg-orange-500 rounded mt-4" />
              </div>
            </div>

            {/* Problems Solved */}
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200">
              <div className="flex flex-col">
                <div className="text-gray-400 text-sm mb-2">
                  LIVE COUNT
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-4xl font-bold text-green-500">
                    {impactStats.problems.toLocaleString()}
                  </span>
                </div>
                <div className="text-gray-700 font-medium">
                  Problems Solved
                </div>
                <div className="text-gray-500 text-sm mt-1">
                  Real issues, real solutions
                </div>
                <div className="w-full h-1 bg-green-500 rounded mt-4" />
              </div>
            </div>

            {/* Funds Utilized */}
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200">
              <div className="flex flex-col">
                <div className="text-gray-400 text-sm mb-2">
                  LIVE COUNT
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl font-bold text-yellow-500">
                    ₹
                  </span>
                  <span className="text-4xl font-bold text-yellow-500">
                    {impactStats.funds.toLocaleString()}Cr
                  </span>
                </div>
                <div className="text-gray-700 font-medium">
                  Funds Utilized
                </div>
                <div className="text-gray-500 text-sm mt-1">
                  100% transparent allocation
                </div>
                <div className="w-full h-1 bg-yellow-500 rounded mt-4" />
              </div>
            </div>

            {/* Active Volunteers */}
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200">
              <div className="flex flex-col">
                <div className="text-gray-400 text-sm mb-2">
                  LIVE COUNT
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-6 h-6 text-green-500" />
                  <span className="text-4xl font-bold text-green-500">
                    {impactStats.volunteers.toLocaleString()}
                  </span>
                </div>
                <div className="text-gray-700 font-medium">
                  Active Volunteers
                </div>
                <div className="text-gray-500 text-sm mt-1">
                  Youth leaders making change
                </div>
                <div className="w-full h-1 bg-green-500 rounded mt-4" />
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-2 text-green-500 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm">
                Updates from Admin Dashboard
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Our 4-Step Impact Process Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-4">
              Our 4-Step Impact Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From problem identification to solution implementation, every step is transparent and community-driven.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {/* Report */}
            <div className="flex flex-col items-center">
              <div className="bg-white w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <div className="bg-red-500 w-8 h-8 rounded-full flex items-center justify-center mb-3">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Report
              </h3>
              <p className="text-center text-gray-600 text-sm">
                Citizens report problems through our platform   
              </p>
            </div>

            {/* Verify */}
            <div className="flex flex-col items-center">
              <div className="bg-white w-16 h-16 rounded-full border-2 border-[#F59E0B] flex items-center justify-center mb-4">
                <Eye className="w-8 h-8 text-[#F59E0B]" />
              </div>
              <div className="bg-[#F59E0B] w-8 h-8 rounded-full flex items-center justify-center mb-3">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Verify
              </h3>
              <p className="text-center text-gray-600 text-sm">
                Local volunteers verify and document issues
              </p>
            </div>

            {/* Solve */}
            <div className="flex flex-col items-center">
              <div className="bg-white w-16 h-16 rounded-full border-2 border-[#3B82F6] flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-[#3B82F6]" />
              </div>
              <div className="bg-[#3B82F6] w-8 h-8 rounded-full flex items-center justify-center mb-3">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Solve
              </h3>
              <p className="text-center text-gray-600 text-sm">
                Skilled teams implement sustainable solutions
              </p>
            </div>

            {/* Track */}
            <div className="flex flex-col items-center">
              <div className="bg-white w-16 h-16 rounded-full border-2 border-[#10B981] flex items-center justify-center mb-4">
                <Gift className="w-8 h-8 text-[#10B981]" />
              </div>
              <div className="bg-[#10B981] w-8 h-8 rounded-full flex items-center justify-center mb-3">
                <span className="text-white font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Track
              </h3>
              <p className="text-center text-gray-600 text-sm">
                Community monitors progress and impact
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => handleNavigation('report')}
              className="inline-flex items-center px-6 py-3 bg-[#FF5A1F] text-white font-semibold rounded-lg"
            >
              Start the Process
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Time for Change Section - Updated with subtle white-orange gradient */}
      <section className="py-24 bg-gradient-to-br from-orange-100 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-orange-900 mb-6">
              The Time for Change is Now
            </h2>
            <p className="text-xl text-gray-700 mb-12 leading-relaxed">
              Join thousands of young leaders who are working together to transform 
              rural Andhra Pradesh. Every village deserves a digital solution for 
              its problems. Together, we're building a stronger state.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => handleNavigation('join')}
                className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 
                         text-white font-semibold rounded-full hover:from-orange-700 hover:to-orange-600 
                         transition transform hover:scale-105 shadow-sm hover:shadow-md 
                         focus:outline-none focus:ring-2 focus:ring-orange-400/50"
              >
                Join Movement
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>

              <button
                onClick={() => handleNavigation('report')}
                className="inline-flex items-center px-5 py-2.5 bg-white text-orange-600 
                         font-semibold rounded-full hover:bg-orange-50 transition transform 
                         hover:scale-105 shadow-sm hover:shadow-md border-2 border-orange-400 
                         focus:outline-none focus:ring-2 focus:ring-orange-400/30"
              >
                Report Problem
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - White background */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Ready to Create Change?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every village problem deserves a digital solution. Join thousands of youth leaders who are transforming governance across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Report a Problem Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-9 relative">
                <img 
                  src="https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg" 
                  alt="Report a Problem" 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Report a Problem</h3>
                <p className="text-gray-600 mb-4">
                  See an issue in your village or community? Report it now and watch our volunteers spring into action.
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  2,847 problems reported this month
                </p>
                {/* Report a Problem Card Button */}
                <button 
                  onClick={() => handleNavigation('report')}
                  className="w-full py-2 px-4 text-sm bg-red-500 text-white rounded-lg 
                           hover:bg-red-600 transition-colors flex items-center 
                           justify-center space-x-2"
                >
                  <span>Report Now</span>
                </button>
              </div>
            </div>

            {/* Join the Movement Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-9 relative">
                <img 
                  src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg" 
                  alt="Join the Movement" 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Join the Movement</h3>
                <p className="text-gray-600 mb-4">
                  Become part of India's largest youth-led governance initiative. Your skills can transform communities.
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  50,000+ active volunteers nationwide
                </p>
                {/* Join the Movement Card Button */}
                <button 
                  onClick={() => handleNavigation('join')}
                  className="w-full py-2 px-4 text-sm bg-gradient-to-r from-orange-500 
                           to-orange-400 text-white rounded-lg hover:from-orange-600 
                           hover:to-orange-500 transition-colors flex items-center 
                           justify-center space-x-2"
                >
                  <span>Join as Volunteer</span>
                </button>
              </div>
            </div>

            {/* Support Our Cause Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-9 relative">
                <img 
                  src="https://images.pexels.com/photos/7238759/pexels-photo-7238759.jpeg" 
                  alt="Support Our Cause" 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Support Our Cause</h3>
                <p className="text-gray-600 mb-4">
                  Every donation directly funds village projects. See exactly where your money goes with our transparency engine.
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  ₹2.4Cr+ transparently allocated
                </p>
                {/* Support Our Cause Card Button */}
                <button 
                  onClick={() => handleNavigation('donate')}
                  className="w-full py-2 px-4 text-sm bg-green-500 text-white rounded-lg 
                           hover:bg-green-600 transition-colors flex items-center 
                           justify-center space-x-2"
                >
                  <span>Donate Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Replace the existing buttons section with this code */}
      <div className="absolute bottom-32 left-0 right-0 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6 z-20">
        <motion.button
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          onClick={handleJoinClick}
          className="px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl w-64 sm:w-auto"
        >
          Join as Volunteer
        </motion.button>

        <motion.button
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          onClick={handleProjectsClick}
          className="px-6 py-3 bg-white text-orange-500 rounded-full font-semibold hover:bg-orange-50 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl w-64 sm:w-auto border border-orange-500"
        >
          View Projects
        </motion.button>

        <motion.button
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          onClick={handleDonateClick}
          className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl w-64 sm:w-auto"
        >
          Donate ₹1 for Andhra
        </motion.button>
      </div>
    </div>
  );
}

export default Hero;
