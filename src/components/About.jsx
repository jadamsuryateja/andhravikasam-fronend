import { Users, ArrowRight, Building2, MapPin, Home, UserCheck, Search, Lightbulb, Users2, Settings, BarChart, Eye, Zap, Target, Flame, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'https://andhravikasam-server.onrender.com/api';

function About() {
  // State for dynamic values with default values
  const [stats, setStats] = useState({
    districts: 0,
    constituencies: 0,    // Was 175
    mandals: 0,
    villages: 0,
    volunteers: 0,       // Was 2,500
    yearlyFund: 0,      // Was 50L
    villagesCovered: 0,
    problemsSolved: 0,   // Was 1,200
    transparencyScore: 0,
    isLoading: true // Add loading state
  });

  const [activeStep, setActiveStep] = useState(1);

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

  const processSteps = [
    {
      number: 1,
      icon: Search,
      title: "Problem Identification",
      description: "Community members and volunteers identify local issues through our geo-tagged reporting system",
      image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80",
      progress: 20,
      activities: [
        'Geo-tagged problem submissions with photo evidence',
        'Community validation and priority scoring',
        'Impact assessment and feasibility analysis',
        'Stakeholder mapping and resource identification'
      ]
    },
    {
      number: 2,
      icon: Lightbulb,
      title: "Solution Design",
      description: "Our network of experts and local leaders collaborate to design sustainable, community-driven solutions",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
      progress: 40,
      activities: [
        'Expert consultation and technical feasibility',
        'Community input and cultural sensitivity review',
        'Resource planning and budget estimation',
        'Timeline development and milestone setting'
      ]
    },
    {
      number: 3,
      icon: Users2,
      title: "Resource Mobilization",
      description: "Transparent fundraising and resource allocation through our verified network of donors and partners",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80",
      progress: 60,
      activities: [
        'Transparent budget breakdown and fund allocation',
        'Verified donor network and corporate partnerships',
        'Government scheme integration and co-funding',
        'Community contribution and volunteer coordination'
      ]
    },
    {
      number: 4,
      icon: Settings,
      title: "Implementation",
      description: "Coordinated execution with real-time progress tracking and community involvement at every stage",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80",
      progress: 80,
      activities: [
        'Project management with milestone tracking',
        'Quality assurance and compliance monitoring',
        'Community engagement and feedback loops',
        'Real-time progress updates and transparency'
      ]
    },
    {
      number: 5,
      icon: BarChart,
      title: "Impact Measurement",
      description: "Comprehensive evaluation of outcomes with community feedback and long-term sustainability assessment",
      image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80",
      progress: 100,
      activities: [
        'Quantitative impact metrics and KPI tracking',
        'Community satisfaction surveys and feedback',
        'Long-term sustainability assessment',
        'Success story documentation and sharing'
      ]
    }
  ];

  
  // Effect to fetch stats from API
  const API_URL = import.meta.env.VITE_API_URL || 'https://andhravikasam-server.onrender.com/api';

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/stats-about`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
        console.log('Fetched stats:', data); // Debug log
        setStats(prevStats => ({
          ...prevStats,
          constituencies: data.constituencies || 0,
          volunteers: data.activeVolunteers || 0,
          yearlyFund: data.impactGenerated || 0,
          problemsSolved: data.problemsSolved || 0,
          isLoading: false
        }));
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setStats(prevStats => ({
          ...prevStats,
          isLoading: false
        }));
      }
    };

    fetchStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-50 pt-16">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content - Improved text alignment */}
            <div className="flex flex-col items-start space-y-6 sm:space-y-8">
              <p className="text-orange-500 flex items-center gap-2 text-sm sm:text-base">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5" /> Empowering Youth Since 2023
              </p>
              
              <h1 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-bold leading-tight">
                <span className="text-[#1e2f4d] block">Where Technology</span>
                <span className="text-[#ff6b2b] block">Meets</span>
                <span className="text-[#ff6b2b] block">Grassroots Change</span>
              </h1>

              <p className="text-gray-600 text-base sm:text-lg max-w-2xl">
                To unite youth under one transparent system where every problem, from every village,
                reaches the top — and every rupee, every solution, is visible to the people.
              </p>

              {/* Stats Grid - Improved responsive layout */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-8 border-t pt-8">
                <div className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#ff6b2b]">
                    {formatNumber(stats.constituencies)}+
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">Constituencies</p>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2f855a]">
                    {formatNumber(stats.volunteers)}+
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">Active Volunteers</p>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#eab308]">
                    ₹{formatNumber(stats.yearlyFund)}+
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">Impact Generated</p>
                </div>
              </div>
            </div>

            {/* Right Image - Improved responsive sizing */}
            <div className="relative mt-8 lg:mt-0">
              <img
                className="rounded-2xl shadow-2xl w-full h-[250px] sm:h-[350px] lg:h-[480px] object-cover object-center"
                src="https://images.unsplash.com/photo-1719978184147-c5bf6b82c6e1"
                alt="Youth volunteers collaborating"
                loading="lazy"
              />
              {/* Problems Solved Card - Improved responsive positioning */}
              <div className="absolute -bottom-6 right-0 bg-white rounded-lg p-3 sm:p-4 shadow-lg flex items-center gap-2 sm:gap-3 max-w-[200px] sm:max-w-[280px]">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff6b2b]" />
                <div>
                  <h4 className="font-bold text-base sm:text-lg">{formatNumber(stats.problemsSolved)}+ Problems Solved</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Across Rural India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-[#2f855a] flex items-center justify-center gap-2 mb-4">
              <span>⚡</span> Our Methodology
            </p>
            <h2 className="text-4xl font-bold text-[#1e2f4d] mb-4">
              How Problems Become Solutions
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our proven 5-step methodology transforms village challenges into sustainable solutions 
              through technology, transparency, and community collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-emerald-500 mb-6">
                <Eye className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-xl font-bold text-[#1e2f4d] mb-4">
                Radical Transparency
              </h3>
              <p className="text-gray-600">
                Every rupee tracked, every decision documented, every outcome measured and 
                shared publicly.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-[#ff6b2b] mb-6">
                <Users2 className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-xl font-bold text-[#1e2f4d] mb-4">
                Community-Centric
              </h3>
              <p className="text-gray-600">
                Solutions designed with and for communities, ensuring local ownership and 
                maintaining connection and trust.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-blue-500 mb-6">
                <Zap className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-xl font-bold text-[#1e2f4d] mb-4">
                Technology-Enabled
              </h3>
              <p className="text-gray-600">
                Leveraging digital tools to scale impact while maintaining human connection and trust.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-emerald-500 mb-6">
                <Target className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-xl font-bold text-[#1e2f4d] mb-4">
                Results-Oriented
              </h3>
              <p className="text-gray-600">
                Focus on measurable outcomes that create lasting positive change in people's lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Process Flow Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-8">
            Interactive Process Flow
          </h2>

          {/* Steps Navigation - Improved responsive design */}
          <div className="flex flex-wrap sm:flex-nowrap justify-start sm:justify-center gap-2 sm:gap-3 mb-8 px-4 sm:px-0">
            {processSteps.map((step) => (
              <button
                key={step.number}
                onClick={() => setActiveStep(step.number)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full border text-sm whitespace-nowrap flex-shrink-0 min-w-[100px] justify-center transition-all duration-300 ${
                  activeStep === step.number
                    ? 'bg-[#ff6b2b] text-white border-transparent'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#ff6b2b] hover:text-[#ff6b2b]'
                }`}
              >
                <step.icon className="w-3.5 h-3.5" />
                <span className="font-medium">Step {step.number}</span>
              </button>
            ))}
          </div>

          {/* Process Content */}
          {processSteps.map((step) => (
            activeStep === step.number && (
              <div key={step.number} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
                {/* Left Content */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#ff6b2b]/10 rounded-lg">
                      <step.icon className="w-5 h-5 text-[#ff6b2b]" />
                    </div>
                    <div>
                      <span className="text-[#ff6b2b] text-xs font-medium">Step {step.number}</span>
                      <h3 className="text-xl font-bold text-[#1e2f4d]">{step.title}</h3>
                    </div>
                  </div>

                  <p className="text-gray-600 text-base">{step.description}</p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-[#1e2f4d] text-sm">Key Activities:</h4>
                    {step.activities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="text-[#2f855a]">✓</div>
                        <p className="text-gray-600 text-sm">{activity}</p>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="pt-4">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-gray-500">Process Progress</span>
                      <span className="text-[#ff6b2b]">{step.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#ff6b2b] rounded-full transition-all duration-500" 
                        style={{ width: `${step.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Right Image */}
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={step.image}
                    alt={`Step ${step.number} - ${step.title}`}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-[#ff6b2b] text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {step.number}/5
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* Structure Section with converging cards - enhanced */}
      <section className="py-12 sm:py-16 relative overflow-hidden bg-[#1e2f4d]">
        {/* Background Image - Modified */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&q=80"
            alt="Organization background"
            className="w-full h-full object-cover opacity-80"
            loading="lazy"
            sizes="(max-width: 640px) 100vw,
                   (max-width: 1024px) 100vw,
                   100vw"
            srcSet="
              https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=640 640w,
              https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1024 1024w,
              https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2070 2070w
            "
          />
          {/* Overlay modified for better visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e2f4d]/95 via-[#1e2f4d]/85 to-[#1e2f4d]/95"></div>
        </div>
        
        {/* Content wrapper - Modified for better contrast */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
            <span className="text-white">
              Organizational Structure
            </span>
          </h2>

          {/* Update the card styles to match background */}
          <div className="space-y-4 sm:space-y-6 relative">
            {structure.map((item, index) => (
              <div 
                key={index}
                className={`flex ${
                  index % 2 === 0 
                    ? 'justify-end lg:pr-[45%] pr-0' 
                    : 'justify-start lg:pl-[45%] pl-0'
                } relative z-10`}
              >
                <div className="w-full sm:w-[90%] lg:w-full">
                  <div 
                    className="backdrop-blur-md bg-white/10 rounded-xl 
                             shadow-xl hover:shadow-2xl transition-all duration-300 
                             border border-white/20 hover:bg-white/15 group"
                  >
                    <div className="p-6 flex items-start gap-4">
                      <div className="bg-white/10 p-3 rounded-xl shrink-0 group-hover:bg-white/20 transition-colors">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-white">
                            {item.level}
                          </h3>
                          <span className="text-white/80 font-medium text-sm px-3 py-1 bg-white/10 rounded-full">
                            {item.count}
                          </span>
                        </div>
                        <p className="text-white/70 text-sm mb-3">
                          {item.responsibility}
                        </p>
                        {/* Additional Content Based on Role */}
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <h4 className="text-sm font-semibold text-white/90 mb-2">Key Responsibilities:</h4>
                          <ul className="grid grid-cols-2 gap-2">
                            {index === 0 && [
                              'District coordination',
                              'Resource allocation',
                              'Strategy planning',
                              'Performance monitoring'
                            ].map((duty, i) => (
                              <li key={i} className="flex items-center gap-2 text-xs text-white/70">
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40"></span>
                                {duty}
                              </li>
                            ))}
                            {index === 1 && [
                              'Problem verification',
                              'Solution tracking',
                              'Team management',
                              'Resource planning'
                            ].map((duty, i) => (
                              <li key={i} className="flex items-center gap-2 text-xs text-white/70">
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40"></span>
                                {duty}
                              </li>
                            ))}
                            {index === 2 && [
                              'Weekly reporting',
                              'Team coordination',
                              'Issue resolution',
                              'Progress tracking'
                            ].map((duty, i) => (
                              <li key={i} className="flex items-center gap-2 text-xs text-white/70">
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40"></span>
                                {duty}
                              </li>
                            ))}
                            {index === 3 && [
                              'Data collection',
                              'Problem reporting',
                              'Community liaison',
                              'Solution feedback'
                            ].map((duty, i) => (
                              <li key={i} className="flex items-center gap-2 text-xs text-white/70">
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40"></span>
                                {duty}
                              </li>
                            ))}
                            {index === 4 && [
                              'Field work',
                              'Data gathering',
                              'Community support',
                              'Project assistance'
                            ].map((duty, i) => (
                              <li key={i} className="flex items-center gap-2 text-xs text-white/70">
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40"></span>
                                {duty}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Central Line - Updated style */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2 hidden lg:block"></div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/50 to-primary/10 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center backdrop-blur-md bg-white/40 rounded-2xl p-6 sm:p-12 border border-white/20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-600 px-4">
              Ready to Lead Change in Your Community?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Join our leadership network and become a catalyst for positive change in your constituency or village. 
              We provide training, resources, and ongoing support.
            </p>
            <button 
              onClick={() => window.location.href = '/join'} 
              className="inline-flex items-center px-6 py-3 text-base sm:text-lg font-medium text-white bg-[#ff6b2b] rounded-full hover:bg-[#e85a1f] transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Join Movement
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;

