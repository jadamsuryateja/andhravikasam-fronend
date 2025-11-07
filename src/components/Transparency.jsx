import { useState, useEffect } from 'react';
import { 
  Users, TrendingUp, CheckCircle, DollarSign, Download, Play,
  BarChart3, ArrowUpRight, FileText, Shield, Award
} from 'lucide-react';
import { Line } from 'react-chartjs-2';

const API_URL = 'https://andhravikasam-server.onrender.com/api';

function Transparency({ isPreview = false }) {
  // Initialize all stats with zero values
  const [stats, setStats] = useState({
    transparencyScore: '0%',
    utilizationRate: '0%',
    trackingRate: '0%',
    totalMembers: 0,
    fundsCollected: 0,
    fundsUsed: 0,
    balance: 0,
  });

  // Update the metrics array
  const metrics = [
    {
      title: 'Financial Transparency Score',
      value: stats.transparencyScore || '0%',
      description: 'Based on independent audit ratings',
      icon: Award,
      color: '#22C55E',
    },
    {
      title: 'Fund Utilization Efficiency',
      value: stats.utilizationRate || '0%',
      description: 'Direct project impact vs operational costs',
      icon: TrendingUp,
      color: '#FF6B3D',
    },
    {
      title: 'Real-time Tracking',
      value: stats.trackingRate || '0%',
      description: 'All transactions logged and verified',
      icon: Shield,
      color: '#3B82F6',
    }
  ];

  // Add loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  // Update the fetchStats function
  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/stats-transparency`);
      const data = await response.json();
      
      // Set the stats with validation
      setStats({
        transparencyScore: data.transparencyScore || '0%',
        utilizationRate: data.utilizationRate || '0%',
        trackingRate: data.trackingRate || '0%'
      });

      setFinancialStats({
        totalIncome: data.financialStats?.totalIncome || '₹0 Cr',
        totalExpenses: data.financialStats?.totalExpenses || '₹0 Cr',
        reserves: data.financialStats?.reserves || '₹0 Cr',
        efficiencyRatio: data.financialStats?.efficiencyRatio || '0%'
      });

      setHighlightNote({
        title: data.highlightNote?.title || '100% Transparent Operations',
        description: data.highlightNote?.description || 'We maintain 100% transparency. Every rupee you contribute helps rebuild our Andhra.'
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set default values in case of error
      setStats({
        transparencyScore: '0%',
        utilizationRate: '0%',
        trackingRate: '0%',
        totalMembers: 0,
        fundsCollected: 0,
        fundsUsed: 0,
        balance: 0,
      });
      setFinancialStats({
        totalIncome: '₹0 Cr',
        totalExpenses: '₹0 Cr',
        reserves: '₹0 Cr',
        efficiencyRatio: '0%'
      });
      setHighlightNote({
        title: '100% Transparent Operations',
        description: 'We maintain 100% transparency. Every rupee you contribute helps rebuild our Andhra.'
      });
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

  // New state variables for financial stats and timeframe
  const [financialStats, setFinancialStats] = useState({
    totalIncome: '₹0 Cr',
    totalExpenses: '₹0 Cr',
    reserves: '₹0 Cr',
    efficiencyRatio: '0%'
  });
  // const [timeframe, setTimeframe] = useState('monthly');

  // Update the highlight note content to be configurable
  const [highlightNote, setHighlightNote] = useState({
    title: '100% Transparent Operations',
    description: 'We maintain 100% transparency. Every rupee you contribute helps rebuild our Andhra.'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section - Made more compact */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-3">
            <Shield className="h-5 w-5 text-[#FF6B3D]" />
            <span className="text-[#FF6B3D] font-medium text-sm sm:text-base">100% Transparent Operations</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D4356] mb-4">
            Transparency Engine
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            "Transparency isn't just policy, it's our promise." Every rupee tracked, 
            every project documented, every impact measured in real-time.
          </p>
        </div>

        {/* Financial Stats - Moved up and made responsive */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Financial Overview</h2>
            <p className="text-sm text-gray-500">Comprehensive financial performance</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Total Income',
                value: financialStats.totalIncome,
                icon: BarChart3,
                color: 'text-green-500'
              },
              {
                title: 'Total Expenses',
                value: financialStats.totalExpenses,
                icon: BarChart3,
                color: 'text-orange-500'
              },
              {
                title: 'Reserves',
                value: financialStats.reserves,
                icon: ArrowUpRight,
                color: 'text-blue-500'
              },
              {
                title: 'Efficiency Ratio',
                value: financialStats.efficiencyRatio,
                icon: ArrowUpRight,
                color: 'text-green-500'
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-gray-600 text-xs sm:text-sm">{item.title}</span>
                  <item.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${item.color}`} />
                </div>
                <div className="flex items-baseline">
                  <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Grid - Adjusted layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} 
                 className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-gray-50 p-2 sm:p-3 rounded-lg border border-gray-100">
                  <metric.icon 
                    className="h-5 w-5 sm:h-6 sm:w-6" 
                    style={{ color: metric.color }} 
                  />
                </div>
              </div>
              <div>
                <h3 className="text-gray-600 text-sm font-medium mb-2">
                  {metric.title}
                </h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl sm:text-3xl font-bold" 
                        style={{ color: metric.color }}>
                    {renderMetricValue(metric.value)}
                  </span>
                </div>
                <p className="text-gray-500 text-xs sm:text-sm">
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement Cards - Made more compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all">
            <div className="bg-orange-50 p-3 rounded-lg w-fit mb-4">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear Accountability</h3>
            <p className="text-gray-600">
              Every donation and expense is meticulously tracked and publicly available. 
              We believe in complete financial transparency.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all">
            <div className="bg-orange-50 p-3 rounded-lg w-fit mb-4">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Fund Utilization</h3>
            <p className="text-gray-600">
              90% of funds go directly to community projects. Only 10% is used for 
              operational costs and sustainability.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all">
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

        {/* Commitment Section - Made more responsive */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Our Commitment to Transparency
            </h2>
            <div className="space-y-6">
              <p className="text-gray-600 text-center">
                We maintain the highest standards of financial transparency and accountability. 
                Our books are open for public scrutiny, and we welcome questions about our 
                operations and fund utilization.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 text-lg">Regular Updates</h3>
                  <ul className="text-gray-600 space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      Monthly financial reports
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      Quarterly progress updates
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      Annual audit statements
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      Project-wise expenditure details
                    </li>
                  </ul>
                </div>
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 text-lg">Documentation Access</h3>
                  <ul className="text-gray-600 space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      Downloadable financial reports
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      Audit certificates
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      Legal compliance documents
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      Project completion reports
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Note - Adjusted padding and text size */}
        <div className="bg-gradient-to-r from-primary to-orange-600 rounded-2xl 
                      shadow-2xl p-6 sm:p-8 text-center text-white">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3">
            {highlightNote.title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg">
            {highlightNote.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Transparency;
