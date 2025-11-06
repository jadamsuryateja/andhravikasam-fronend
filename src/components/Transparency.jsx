import { useState, useEffect } from 'react';
import { 
  Users, TrendingUp, CheckCircle, DollarSign, Download, Play,
  BarChart4, ArrowUpRight, FileText, Shield, Award
} from 'lucide-react';
import { Line } from 'react-chartjs-2';

const API_URL = 'https://andhravikasam-server.onrender.com/api';

function Transparency({ isPreview = false }) {
  // Initialize all stats with zero values
  const [stats, setStats] = useState({
    totalMembers: 0,
    fundsCollected: 0,
    fundsUsed: 0,
    balance: 0,
    transparencyScore: 0,
    utilizationRate: 0,
    trackingRate: 0,
    auditFrequency: 'Not Available'
  });

  // Format the metrics to show appropriate zero states
  const metrics = [
    {
      title: 'Financial Transparency Score',
      value: '0%',
      description: 'Based on independent audit ratings',
      icon: Shield,
    },
    {
      title: 'Fund Utilization Efficiency',
      value: '0%',
      description: 'Direct project impact vs operational costs',
      icon: BarChart4,
    },
    {
      title: 'Real-time Tracking',
      value: '0%',
      description: 'All transactions logged and verified',
      icon: TrendingUp,
    },
    {
      title: 'Third-party Audits',
      value: 'Not Available',
      description: 'Independent financial verification',
      icon: FileText,
    }
  ];

  // Add loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  // Update fetchStats to handle loading state
  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/stats`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update the metrics rendering to handle zero values
  const renderMetricValue = (value) => {
    if (isLoading) {
      return (
        <div className="h-8 bg-gray-200 animate-pulse rounded-md"></div>
      );
    }
    // Show zero values in a consistent format
    if (value === '0%' || value === 'Not Available') {
      return <span className="text-gray-400">{value}</span>;
    }
    return value;
  };

  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('monthly');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50/50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Transparency Engine
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            "Transparency isn't just policy, it's our promise." Every rupee tracked, 
            every project documented, every impact measured in real-time.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="bg-orange-50 p-3 rounded-lg w-fit mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear Accountability</h3>
              <p className="text-gray-600">
                Every donation and expense is meticulously tracked and publicly available. 
                We believe in complete financial transparency.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="bg-orange-50 p-3 rounded-lg w-fit mb-4">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fund Utilization</h3>
              <p className="text-gray-600">
                90% of funds go directly to community projects. Only 10% is used for 
                operational costs and sustainability.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="bg-orange-50 p-3 rounded-lg w-fit mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Trust</h3>
              <p className="text-gray-600">
                Built on trust and maintained through regular updates, audits, and 
                community involvement in decision-making.
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <div key={index} 
                 className="bg-white rounded-xl shadow-lg p-6 
                          hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="bg-orange-100 p-2 sm:p-3 rounded-lg">
                  <metric.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <h3 className="text-gray-600 text-sm font-semibold mb-1">
                {metric.title}
              </h3>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                {renderMetricValue(metric.value)}
              </div>
              <p className="text-xs sm:text-sm text-gray-500">{metric.description}</p>
            </div>
          ))}
        </div>

        {/* Financial Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Financial Overview
            </h2>
            <div className="flex flex-wrap gap-2">
              {['monthly', 'quarterly', 'yearly'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base 
                            transition-all ${
                    activeTab === tab
                      ? 'bg-primary text-white'
                      : 'bg-orange-50 text-gray-600 hover:bg-orange-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          {/* Add financial charts and tables here */}
        </div>

        {/* Commitment to Transparency */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Commitment to Transparency</h2>
            <div className="space-y-6">
              <p className="text-gray-600">
                We maintain the highest standards of financial transparency and accountability. 
                Our books are open for public scrutiny, and we welcome questions about our 
                operations and fund utilization.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Regular Updates</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Monthly financial reports</li>
                    <li>• Quarterly progress updates</li>
                    <li>• Annual audit statements</li>
                    <li>• Project-wise expenditure details</li>
                  </ul>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Documentation Access</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Downloadable financial reports</li>
                    <li>• Audit certificates</li>
                    <li>• Legal compliance documents</li>
                    <li>• Project completion reports</li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-8">
                <button className="flex items-center gap-2 px-4 py-2 bg-orange-50 
                                 text-primary rounded-lg hover:bg-orange-100 transition-colors">
                  <Download className="h-5 w-5" />
                  Download Reports
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-orange-50 
                                 text-primary rounded-lg hover:bg-orange-100 transition-colors">
                  <Play className="h-5 w-5" />
                  Watch Our Journey
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['ISO 9001:2015 Certified', 'GuideStar Transparency Seal', 
              '12A & 80G Registered', 'FCRA Compliant'].map((badge) => (
              <div key={badge} 
                   className="flex flex-col items-center p-3 sm:p-4 
                            hover:bg-orange-50 rounded-xl transition-colors">
                <Award className="h-8 w-8 sm:h-12 sm:w-12 text-primary mb-2 sm:mb-3" />
                <span className="text-xs sm:text-sm font-medium text-gray-600 text-center">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight Note */}
        <div className="bg-gradient-to-r from-primary to-orange-600 rounded-2xl 
                      shadow-2xl p-8 text-center text-white mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            100% Transparent Operations
          </h2>
          <p className="text-base sm:text-xl">
            We maintain 100% transparency. Every rupee you contribute helps rebuild our Andhra.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Transparency;
