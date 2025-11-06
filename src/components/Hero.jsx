import { ArrowRight, Heart, Eye, Gift, Users, AlertCircle, MapPin, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Add these variants at the top of your file
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const numberVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      duration: 0.8
    }
  }
};

const slideFromLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const slideFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const progressBarVariant = {
  hidden: { width: 0 },
  visible: { 
    width: "100%",
    transition: {
      duration: 1.5,
      ease: "easeInOut"
    }
  }
};

const pulseVariant = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const processItemVariant = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const iconVariant = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};

// Add this to your existing variants at the top
const readyToChangeVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  },
  middleCard: {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },
  leftCard: {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },
  rightCard: {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }
};

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

  // Helper function for navigation
  const handleNavigation = (path) => {
    if (setCurrentView) {
      setCurrentView(path);
    }
    navigate(`/${path}`);
  };

  // Simulate live updates for impact stats (replace with actual API call)
  useEffect(() => {
    // This would be your API call to fetch latest stats
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/impact-stats');
        const data = await response.json();
        setImpactStats(data);
      } catch (error) {
        console.error('Failed to fetch impact stats:', error);
      }
    };

    // Initial fetch
    fetchStats();

    // Set up interval for live updates
    const interval = setInterval(fetchStats, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Add this section in your Hero component
  const ReadyToChange = () => {
    return (
      <motion.div
        variants={readyToChangeVariants.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 bg-gray-50"
      >
        <h2 className="text-4xl font-bold text-center mb-12">Ready to Create Change?</h2>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            variants={readyToChangeVariants.leftCard}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Volunteer</h3>
            <p className="mb-4">Join our network of change-makers and make a difference in your community.</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full">Join Now</button>
          </motion.div>

          <motion.div
            variants={readyToChangeVariants.middleCard}
            className="bg-blue-600 text-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Report an Issue</h3>
            <p className="mb-4">Help us identify and solve problems in your village.</p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-full">Report Now</button>
          </motion.div>

          <motion.div
            variants={readyToChangeVariants.rightCard}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Donate</h3>
            <p className="mb-4">Support our initiatives with your contribution.</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full">Donate Now</button>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section with Image Slider */}
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

        {/* Hero Content - Text Animation Container */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-in-out transform
              ${index === currentSlide ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
          >
            <div className="text-center max-w-3xl space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                {slide.title}
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-white font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                {slide.text}
              </p>
            </div>
          </div>
        ))}

        {/* Fixed Button Container - Overlay on Hero */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-50 
             bg-white/90 backdrop-blur-sm rounded-full shadow-lg
             w-max max-w-[90%] mx-auto">
          <div className="flex flex-row gap-2 sm:gap-4 justify-center items-center px-3 py-2 sm:px-4 sm:py-3">
            <button
              onMouseEnter={() => setIsHovered('join')}
              onMouseLeave={() => setIsHovered(null)}
              onClick={() => handleNavigation('join')}
              className="inline-flex items-center 
                px-3 sm:px-4 py-1.5 sm:py-2
                text-xs sm:text-sm
                bg-gradient-to-r from-primary to-orange-500 
                text-white font-medium rounded-full 
                transition transform hover:scale-105 
                shadow-sm hover:shadow-md"
            >
              <Heart className={`mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 ${isHovered === 'join' ? 'scale-125' : ''}`} />
              Join as Volunteer
            </button>

            <button
              onMouseEnter={() => setIsHovered('projects')}
              onMouseLeave={() => setIsHovered(null)}
              onClick={() => handleNavigation('projects')}
              className="inline-flex items-center 
                px-3 sm:px-4 py-1.5 sm:py-2
                text-xs sm:text-sm
                bg-white text-primary font-medium 
                rounded-full border border-primary 
                transition transform hover:bg-primary hover:text-white 
                shadow-sm hover:shadow-md"
            >
              <Eye className={`mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 ${isHovered === 'projects' ? 'scale-125' : ''}`} />
              View Projects
            </button>

            <button
              onMouseEnter={() => setIsHovered('donate')}
              onMouseLeave={() => setIsHovered(null)}
              onClick={() => handleNavigation('donate')}
              className="inline-flex items-center 
                px-3 sm:px-4 py-1.5 sm:py-2
                text-xs sm:text-sm
                bg-gradient-to-r from-primary to-orange-500 
                text-white font-medium rounded-full 
                transition transform hover:scale-105 
                shadow-sm hover:shadow-md"
            >
              <Gift className={`mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 ${isHovered === 'donate' ? 'scale-125' : ''}`} />
              Donate ₹1
            </button>
          </div>
        </div>
      </div>

      {/* Digital-First Approach Section */}
      <motion.section 
        className="py-12 sm:py-16 md:py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4 text-gray-900">
              How Andhra Vikasam Transforms Civic Engagement
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              We're not just another NGO. We're a revolutionary platform that bridges the gap between India's digital-native youth and grassroots governance needs.
            </p>
          </motion.div>

          <div className="space-y-8 sm:space-y-12">
            {/* Digital-First Approach - Image on left */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-6 sm:gap-8">
              <motion.div 
                className="w-full md:w-1/2"
                variants={slideFromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.pexels.com/photos/5198239/pexels-photo-5198239.jpeg"
                  alt="Digital Approach" 
                  className="rounded-lg w-full h-[250px] sm:h-[300px] object-cover"
                />
              </motion.div>
              <motion.div 
                className="w-full md:w-1/2 mt-6 md:mt-0"
                variants={slideFromLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
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
              </motion.div>
            </div>

            {/* Radical Transparency - Image on right */}
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              <motion.div 
                className="w-full md:w-1/2"
                variants={slideFromLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.pexels.com/photos/7567444/pexels-photo-7567444.jpeg"
                  alt="Radical Transparency" 
                  className="rounded-lg w-full h-[250px] sm:h-[300px] object-cover shadow-lg"
                />
              </motion.div>
              <motion.div 
                className="w-full md:w-1/2 mt-6 md:mt-0"
                variants={slideFromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
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
              </motion.div>
            </div>

            {/* Youth-Led Governance - Image on left */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-6 sm:gap-8">
              <motion.div 
                className="w-full md:w-1/2"
                variants={slideFromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846"
                  alt="Youth-Led Governance" 
                  className="rounded-lg w-full h-[250px] sm:h-[300px] object-cover"
                />
              </motion.div>
              <motion.div 
                className="w-full md:w-1/2 mt-6 md:mt-0"
                variants={slideFromLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
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
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Impact Dashboard Section */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-[#1E293B] mb-4">
              Live Impact Dashboard
            </h2>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto">
              Real-time metrics showing the power of youth-led governance across India.
              Every number represents lives touched, problems solved, and communities transformed.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Villages Covered */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div 
                  className="text-gray-400 text-sm mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  LIVE COUNT
                </motion.div>
                <div className="flex items-center gap-2 mb-1">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                      delay: 0.4
                    }}
                  >
                    <MapPin className="w-6 h-6 text-orange-500" />
                  </motion.div>
                  <motion.span 
                    className="text-4xl font-bold text-orange-500"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.8,
                      delay: 0.5,
                      ease: "easeOut"
                    }}
                  >
                    {impactStats.villages.toLocaleString()}
                  </motion.span>
                </div>
                <motion.div 
                  className="text-gray-700 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Villages Covered
                </motion.div>
                <motion.div 
                  className="text-gray-500 text-sm mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Across 175 constituencies in India
                </motion.div>
                <motion.div 
                  className="w-full h-1 bg-orange-500 rounded mt-4"
                  variants={progressBarVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
              </motion.div>
            </motion.div>

            {/* Problems Solved */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div 
                  className="text-gray-400 text-sm mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  LIVE COUNT
                </motion.div>
                <div className="flex items-center gap-2 mb-1">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                      delay: 0.4
                    }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </motion.div>
                  <motion.span 
                    className="text-4xl font-bold text-green-500"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.8,
                      delay: 0.5,
                      ease: "easeOut"
                    }}
                  >
                    {impactStats.problems.toLocaleString()}
                  </motion.span>
                </div>
                <motion.div 
                  className="text-gray-700 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Problems Solved
                </motion.div>
                <motion.div 
                  className="text-gray-500 text-sm mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Real issues, real solutions
                </motion.div>
                <motion.div 
                  className="w-full h-1 bg-green-500 rounded mt-4"
                  variants={progressBarVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
              </motion.div>
            </motion.div>

            {/* Funds Utilized */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div 
                  className="text-gray-400 text-sm mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  LIVE COUNT
                </motion.div>
                <div className="flex items-center gap-2 mb-1">
                  <motion.span 
                    className="text-2xl font-bold text-yellow-500"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                      delay: 0.4
                    }}
                  >
                    ₹
                  </motion.span>
                  <motion.span 
                    className="text-4xl font-bold text-yellow-500"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.8,
                      delay: 0.5,
                      ease: "easeOut"
                    }}
                  >
                    {impactStats.funds.toLocaleString()}Cr
                  </motion.span>
                </div>
                <motion.div 
                  className="text-gray-700 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Funds Utilized
                </motion.div>
                <motion.div 
                  className="text-gray-500 text-sm mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  100% transparent allocation
                </motion.div>
                <motion.div 
                  className="w-full h-1 bg-yellow-500 rounded mt-4"
                  variants={progressBarVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
              </motion.div>
            </motion.div>

            {/* Active Volunteers */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div 
                  className="text-gray-400 text-sm mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  LIVE COUNT
                </motion.div>
                <div className="flex items-center gap-2 mb-1">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                      delay: 0.4
                    }}
                  >
                    <Users className="w-6 h-6 text-green-500" />
                  </motion.div>
                  <motion.span 
                    className="text-4xl font-bold text-green-500"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.8,
                      delay: 0.5,
                      ease: "easeOut"
                    }}
                  >
                    {impactStats.volunteers.toLocaleString()}+
                  </motion.span>
                </div>
                <motion.div 
                  className="text-gray-700 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Active Volunteers
                </motion.div>
                <motion.div 
                  className="text-gray-500 text-sm mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Youth leaders making change
                </motion.div>
                <motion.div 
                  className="w-full h-1 bg-green-500 rounded mt-4"
                  variants={progressBarVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-12 text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 text-green-500 mb-6">
              <motion.div 
                className="w-2 h-2 rounded-full bg-green-500"
                variants={pulseVariant}
                initial="initial"
                animate="animate"
              />
              <motion.span 
                className="text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Live updates every 30 seconds
              </motion.span>
              <motion.svg 
                className="w-4 h-4" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                animate={{ 
                  rotate: 360,
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              >
                <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
              </motion.svg>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our 4-Step Impact Process Section */}
      <motion.section 
        className="bg-white py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-4">
              Our 4-Step Impact Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From problem identification to solution implementation, every step is transparent and community-driven.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Report */}
            <motion.div 
              className="flex flex-col items-center"
              variants={processItemVariant}
            >
              <motion.div 
                className="bg-white w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center mb-4"
                variants={iconVariant}
              >
                <AlertCircle className="w-8 h-8 text-red-500" />
              </motion.div>
              <motion.div 
                className="bg-red-500 w-8 h-8 rounded-full flex items-center justify-center mb-3"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-white font-bold">1</span>
              </motion.div>
              <motion.h3 
                className="text-xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Report
              </motion.h3>
              <motion.p 
                className="text-center text-gray-600 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Citizens report problems through our platform   
              </motion.p>
            </motion.div>

            {/* Verify */}
            <motion.div 
              className="flex flex-col items-center"
              variants={processItemVariant}
            >
              <motion.div 
                className="bg-white w-16 h-16 rounded-full border-2 border-[#F59E0B] flex items-center justify-center mb-4"
                variants={iconVariant}
              >
                <Eye className="w-8 h-8 text-[#F59E0B]" />
              </motion.div>
              <motion.div 
                className="bg-[#F59E0B] w-8 h-8 rounded-full flex items-center justify-center mb-3"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-white font-bold">2</span>
              </motion.div>
              <motion.h3 
                className="text-xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Verify
              </motion.h3>
              <motion.p 
                className="text-center text-gray-600 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Local volunteers verify and document issues
              </motion.p>
            </motion.div>

            {/* Solve */}
            <motion.div 
              className="flex flex-col items-center"
              variants={processItemVariant}
            >
              <motion.div 
                className="bg-white w-16 h-16 rounded-full border-2 border-[#3B82F6] flex items-center justify-center mb-4"
                variants={iconVariant}
              >
                <Users className="w-8 h-8 text-[#3B82F6]" />
              </motion.div>
              <motion.div 
                className="bg-[#3B82F6] w-8 h-8 rounded-full flex items-center justify-center mb-3"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-white font-bold">3</span>
              </motion.div>
              <motion.h3 
                className="text-xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Solve
              </motion.h3>
              <motion.p 
                className="text-center text-gray-600 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Skilled teams implement sustainable solutions
              </motion.p>
            </motion.div>

            {/* Track */}
            <motion.div 
              className="flex flex-col items-center"
              variants={processItemVariant}
            >
              <motion.div 
                className="bg-white w-16 h-16 rounded-full border-2 border-[#10B981] flex items-center justify-center mb-4"
                variants={iconVariant}
              >
                <Gift className="w-8 h-8 text-[#10B981]" />
              </motion.div>
              <motion.div 
                className="bg-[#10B981] w-8 h-8 rounded-full flex items-center justify-center mb-3"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-white font-bold">4</span>
              </motion.div>
              <motion.h3 
                className="text-xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Track
              </motion.h3>
              <motion.p 
                className="text-center text-gray-600 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Community monitors progress and impact
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-12 text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => handleNavigation('report')}
              className="inline-flex items-center px-6 py-3 bg-[#FF5A1F] text-white font-semibold rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start the Process
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

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

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={readyToChangeVariants.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Report a Problem Card */}
            <motion.div 
              variants={readyToChangeVariants.leftCard}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
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
            </motion.div>

            {/* Join the Movement Card */}
            <motion.div 
              variants={readyToChangeVariants.middleCard}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
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
            </motion.div>

            {/* Support Our Cause Card */}
            <motion.div 
              variants={readyToChangeVariants.rightCard}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
