import { Users, ArrowRight, Building2, MapPin, Home, UserCheck } from 'lucide-react';
import { useState, useEffect } from 'react';

function About() {
  // State for dynamic values with default values
  const [stats, setStats] = useState({
    districts: 0,
    constituencies: 0,
    mandals: 0,
    villages: 0,
    volunteers: 0,
    yearlyFund: 0,
    villagesCovered: 0,
    problemsSolved: 0,
    transparencyScore: 0,
    isLoading: true // Add loading state
  });

  // Helper function to safely format numbers
  const formatNumber = (value, type = 'number') => {
    if (typeof value !== 'number') return '0';
    
    if (type === 'currency') {
      return `₹${(value / 10000000).toFixed(2)} Cr+`;
    }
    
    return value.toLocaleString();
  };

  const structure = [
    {
      level: 'District Incharge',
      icon: Building2,
      count: `${formatNumber(stats.districts)} Districts`,
      responsibility: 'Leads all constituency incharges within the district'
    },
    {
      level: 'Constituency Incharge',
      icon: MapPin,
      count: `${formatNumber(stats.constituencies)} Constituencies`,
      responsibility: 'Manages all mandal and village incharges, uploads verified problems'
    },
    {
      level: 'Mandal Incharge',
      icon: Users,
      count: `${formatNumber(stats.mandals)} Mandals`,
      responsibility: 'Supervises all village-level incharges and ensures weekly reports'
    },
    {
      level: 'Village Incharge',
      icon: Home,
      count: `${formatNumber(stats.villages)} Villages`,
      responsibility: 'Collects all problems from volunteers and sends weekly updates'
    },
    {
      level: 'Volunteers',
      icon: UserCheck,
      count: `${formatNumber(stats.volunteers)} Active Volunteers`,
      responsibility: 'Identify local problems, assist in projects, collect reports'
    }
  ];

  // Effect to fetch stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        setStats({
          ...data,
          isLoading: false
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setStats(prevStats => ({
          ...prevStats,
          isLoading: false
        }));
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-50">
      {/* Hero Section - Glassmorphism effect */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/30 to-primary/10 backdrop-blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-600">
                About Andhra Vikasam
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed backdrop-blur-sm bg-white/30 p-6 rounded-2xl">
                To unite youth under one transparent system where every problem, from every village,
                reaches the top — and every rupee, every solution, is visible to the people.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-orange-300/20 rounded-3xl transform rotate-3 backdrop-blur-xl"></div>
              <img 
                src="https://img.freepik.com/free-photo/close-up-adult-working-his-laptop-office_23-2148377751.jpg"
                alt="Andhra Vikasam Community"
                className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Cards - Glassmorphism cards */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/80 to-white/50 backdrop-blur-lg"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Youth-Led Movement",
                description: "Empowering the youth of Andhra Pradesh through active participation"
              },
              {
                icon: Building2,
                title: "Structured Approach",
                description: "Five-tier organization system ensuring complete representation"
              },
              {
                icon: ArrowRight,
                title: "Clear Goals",
                description: "Focused on solving grassroots problems through transparency"
              }
            ].map((item, index) => (
              <div key={index} 
                   className="backdrop-blur-md bg-white/40 rounded-2xl p-8 
                            shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                            hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] 
                            border border-white/20 
                            transition-all duration-300 
                            hover:translate-y--2">
                <div className="bg-gradient-to-br from-primary to-orange-400 p-4 rounded-xl w-fit mb-6">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structure Section - Modern grid layout */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/50 to-primary/10 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-600">
              Organizational Structure
            </span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Structure Image */}
            <div className="relative">
              <div className="sticky top-24">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-orange-300/20 rounded-3xl transform -rotate-2"></div>
                <img 
                  src="https://cdn.pixabay.com/photo/2019/04/26/07/12/notes-4156924_1280.png"
                  alt="Our Structure"
                  className="relative rounded-2xl shadow-2xl w-full h-[600px] object-cover"
                />
              </div>
            </div>

            {/* Structure Cards */}
            <div className="space-y-6">
              {structure.map((item, index) => (
                <div key={index} 
                     className="backdrop-blur-md bg-white/60 rounded-xl 
                              shadow-lg hover:shadow-2xl 
                              transition-all duration-300 
                              border border-white/20 
                              hover:bg-white/80">
                  <div className="p-6 flex items-start gap-6">
                    <div className="bg-gradient-to-br from-primary to-orange-400 p-4 rounded-xl">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.level}</h3>
                      <p className="text-primary font-medium mb-2">{item.count}</p>
                      <p className="text-gray-600">{item.responsibility}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Modern gradient */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-orange-500 to-orange-600 opacity-90"></div>
        <div className="absolute inset-0 backdrop-blur-lg"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: "Active Members", value: formatNumber(stats.volunteers) + "+" },
              { label: "Districts Covered", value: formatNumber(stats.districts) },
              { label: "Problems Solved", value: formatNumber(stats.problemsSolved || 0) + "+" },
              { label: "Transparency Score", value: (stats.transparencyScore || 0) + "%" }
            ].map((stat, index) => (
              <div key={index} 
                   className="backdrop-blur-md bg-white/10 rounded-2xl p-8 
                            border border-white/20 text-center
                            hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-white mb-3">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Glass effect */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/50 to-primary/10 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center backdrop-blur-md bg-white/40 rounded-2xl p-12 border border-white/20">
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-600">
              Join Our Movement
            </h2>
            <p className="text-xl text-gray-600">
              Be part of the change you want to see in Andhra Pradesh
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
