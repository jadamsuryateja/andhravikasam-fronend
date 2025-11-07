import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import '../styles/ValueUpdater.css';

const API_URL = import.meta.env.VITE_API_URL;

function ValueUpdater({ admin }) {
  const [heroStats, setHeroStats] = useState({
    villages: 0,
    problems: 0,
    funds: 0,
    volunteers: 0
  });

  const [aboutStats, setAboutStats] = useState({
    constituencies: 0,
    activeVolunteers: 0,
    impactGenerated: 0,
    problemsSolved: 0
  });

  const [joinStats, setJoinStats] = useState({
    activeVolunteers: 0,
    constituenciesCovered: 0,
    problemsSolved: 0,
    fundsUtilized: 0
  });

  const [transparencyStats, setTransparencyStats] = useState({
    transparencyScore: '0%',
    utilizationRate: '0%',
    trackingRate: '0%',
    financialStats: {
      totalIncome: '₹0 Cr',
      totalExpenses: '₹0 Cr',
      reserves: '₹0 Cr',
      efficiencyRatio: '0%'
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState(() => {
    // Try to get the saved section from session storage, default to 'hero' if not found
    return sessionStorage.getItem('activeStatsSection') || 'hero';
  });

  // Separate fetch functions for hero, about, and join stats
  const fetchHeroStats = async () => {
    try {
      const response = await fetch(`${API_URL}/stats`);
      if (!response.ok) throw new Error('Failed to fetch hero stats');
      const data = await response.json();
      
      setHeroStats({
        villages: Number(data.villages) || 0,
        problems: Number(data.problems) || 0,
        funds: Number(data.funds) || 0,
        volunteers: Number(data.volunteers) || 0
      });
    } catch (error) {
      console.error('Hero stats fetch error:', error);
      toast.error('Failed to load hero statistics');
    }
  };

  const fetchAboutStats = async () => {
    try {
      const response = await fetch(`${API_URL}/stats-about`);
      if (!response.ok) throw new Error('Failed to fetch about stats');
      const data = await response.json();
      
      setAboutStats({
        constituencies: Number(data.constituencies) || 0,
        activeVolunteers: Number(data.activeVolunteers) || 0,
        impactGenerated: Number(data.impactGenerated) || 0,
        problemsSolved: Number(data.problemsSolved) || 0
      });
    } catch (error) {
      console.error('About stats fetch error:', error);
      toast.error('Failed to load about statistics');
    }
  };

  const fetchJoinStats = async () => {
    try {
      const response = await fetch(`${API_URL}/stats-join`);
      if (!response.ok) throw new Error('Failed to fetch join stats');
      const data = await response.json();
      
      setJoinStats({
        activeVolunteers: Number(data.activeVolunteers) || 0,
        constituenciesCovered: Number(data.constituenciesCovered) || 0,
        problemsSolved: Number(data.problemsSolved) || 0,
        fundsUtilized: Number(data.fundsUtilized) || 0
      });
    } catch (error) {
      console.error('Join stats fetch error:', error);
      toast.error('Failed to load join statistics');
    }
  };

  const fetchTransparencyStats = async () => {
    try {
      const response = await fetch(`${API_URL}/stats-transparency`);
      if (!response.ok) throw new Error('Failed to fetch transparency stats');
      const data = await response.json();
      
      setTransparencyStats({
        transparencyScore: data.transparencyScore || '0%',
        utilizationRate: data.utilizationRate || '0%',
        trackingRate: data.trackingRate || '0%',
        financialStats: {
          totalIncome: data.financialStats?.totalIncome || '₹0 Cr',
          totalExpenses: data.financialStats?.totalExpenses || '₹0 Cr',
          reserves: data.financialStats?.reserves || '₹0 Cr',
          efficiencyRatio: data.financialStats?.efficiencyRatio || '0%'
        }
      });
    } catch (error) {
      console.error('Transparency stats fetch error:', error);
      toast.error('Failed to load transparency statistics');
    }
  };

  // Fetch stats on component mount
  useEffect(() => {
    fetchHeroStats();
    fetchAboutStats();
    fetchJoinStats();
    fetchTransparencyStats();
  }, []);

  const handleUpdate = async (section) => {
    setLoading(true);
    setError('');

    try {
      const token = sessionStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const statsToUpdate = section === 'hero' ? heroStats : 
                           section === 'about' ? aboutStats : 
                           section === 'join' ? joinStats :
                           transparencyStats;
      const endpoint = section === 'hero' ? 'stats' : 
                      section === 'about' ? 'stats-about' : 
                      section === 'join' ? 'stats-join' :
                      'stats-transparency';

      const response = await fetch(`${API_URL}/${endpoint}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(statsToUpdate)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `HTTP error! status: ${response.status}`
        }));
        throw new Error(errorData.message || 'Failed to update statistics');
      }

      const data = await response.json();
      
      if (section === 'hero') {
        if (data.success) {
          setHeroStats({
            villages: Number(data.stats.villages) || 0,
            problems: Number(data.stats.problems) || 0,
            funds: Number(data.stats.funds) || 0,
            volunteers: Number(data.stats.volunteers) || 0
          });
          toast.success('Hero statistics updated successfully');
        }
      } else if (section === 'about') {
        // About section update
        setAboutStats({
          constituencies: Number(data.constituencies) || 0,
          activeVolunteers: Number(data.activeVolunteers) || 0,
          impactGenerated: Number(data.impactGenerated) || 0,
          problemsSolved: Number(data.problemsSolved) || 0
        });
        toast.success('About statistics updated successfully');
      } else if (section === 'join') {
        // Join Us section update
        setJoinStats({
          activeVolunteers: Number(data.activeVolunteers) || 0,
          constituenciesCovered: Number(data.constituenciesCovered) || 0,
          problemsSolved: Number(data.problemsSolved) || 0,
          fundsUtilized: Number(data.fundsUtilized) || 0
        });
        toast.success('Join Us statistics updated successfully');
      } else {
        // Transparency section update
        setTransparencyStats({
          transparencyScore: data.transparencyScore || '0%',
          utilizationRate: data.utilizationRate || '0%',
          trackingRate: data.trackingRate || '0%',
          financialStats: {
            totalIncome: data.financialStats?.totalIncome || '₹0 Cr',
            totalExpenses: data.financialStats?.totalExpenses || '₹0 Cr',
            reserves: data.financialStats?.reserves || '₹0 Cr',
            efficiencyRatio: data.financialStats?.efficiencyRatio || '0%'
          }
        });
        toast.success('Transparency statistics updated successfully');
      }
    } catch (error) {
      console.error('Update error:', error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleHeroStatsChange = (key, value) => {
    // Ensure value is a number and not negative
    const numValue = Number(value);
    const validValue = !isNaN(numValue) ? Math.max(0, numValue) : 0;

    setHeroStats(prev => ({
      ...prev,
      [key]: validValue
    }));
  };

  const handleAboutStatsChange = (key, value) => {
    // Ensure value is a number and not negative
    const numValue = Number(value);
    const validValue = !isNaN(numValue) ? Math.max(0, numValue) : 0;

    setAboutStats(prev => ({
      ...prev,
      [key]: validValue
    }));
  };

  const handleJoinStatsChange = (key, value) => {
    // Ensure value is a number and not negative
    const numValue = Number(value);
    const validValue = !isNaN(numValue) ? Math.max(0, numValue) : 0;

    setJoinStats(prev => ({
      ...prev,
      [key]: validValue
    }));
  };

  // Update the formatCurrencyValue function to prevent double ₹
  const formatCurrencyValue = (value) => {
    // Remove all existing ₹, Cr, and spaces first
    const cleanValue = value.replace(/[₹Cr\s]/g, '');
    // Return formatted value with single ₹
    return `₹${cleanValue} Cr`;
  };

  const handleTransparencyStatsChange = (key, value, isFinancial = false) => {
    setTransparencyStats(prev => {
      if (isFinancial) {
        let formattedValue = value;
        
        if (['totalIncome', 'totalExpenses', 'reserves'].includes(key)) {
          // For currency inputs, strip symbols and format
          formattedValue = formatCurrencyValue(value);
        } else if (key === 'efficiencyRatio') {
          // For efficiency ratio, strip non-numeric and add %
          const numericValue = value.replace(/[^0-9.]/g, '');
          formattedValue = `${numericValue}%`;
        }

        return {
          ...prev,
          financialStats: {
            ...prev.financialStats,
            [key]: formattedValue
          }
        };
      }
      return {
        ...prev,
        [key]: value
      };
    });
  };

  // Update the return statement with more responsive classes
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Section Toggle - Make more responsive for mobile */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
        <button
          onClick={() => setActiveSection('hero')}
          className={`px-3 sm:px-6 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors
            ${activeSection === 'hero' 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Hero Section
        </button>
        <button
          onClick={() => setActiveSection('about')}
          className={`px-3 sm:px-6 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors
            ${activeSection === 'about' 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          About Section
        </button>
        <button
          onClick={() => setActiveSection('join')}
          className={`px-3 sm:px-6 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors
            ${activeSection === 'join' 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Join Us Section
        </button>
        <button
          onClick={() => setActiveSection('transparency')}
          className={`px-3 sm:px-6 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors
            ${activeSection === 'transparency' 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Transparency
        </button>
      </div>

      {/* Content Sections - Update container classes */}
      {activeSection === 'hero' && (
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-2">
            HOME (HERO SECTION)
          </h2>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8 border-b pb-4">
            Update impact statistics shown on the home page
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {Object.entries(heroStats).map(([key, value]) => (
              <div key={key} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 capitalize">
                  {key === 'funds' ? 'Funds (₹ Cr)' : key}
                </label>
                <input
                  type="number"
                  min="0"
                  step={key === 'funds' ? "0.01" : "1"}
                  value={value}
                  onChange={(e) => handleHeroStatsChange(key, e.target.value)}
                  className="stats-input text-sm sm:text-base"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => handleUpdate('hero')}
            disabled={loading}
            className="update-button mt-6 sm:mt-8"
          >
            {loading ? 'Updating...' : 'Update Hero Statistics'}
          </button>
        </div>
      )}

      {/* About Section Stats */}
      {activeSection === 'about' && (
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-2">
            ABOUT SECTION
          </h2>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8 border-b pb-4">
            Update impact statistics shown on the about page
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {Object.entries(aboutStats).map(([key, value]) => (
              <div key={key} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 capitalize">
                  {key === 'impactGenerated' ? 'Impact Generated (₹ Cr)' : 
                    key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type="number"
                  min="0"
                  step={key === 'impactGenerated' ? "0.01" : "1"}
                  value={value}
                  onChange={(e) => handleAboutStatsChange(key, e.target.value)}
                  className="stats-input"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => handleUpdate('about')}
            disabled={loading}
            className="update-button mt-6 sm:mt-8"
          >
            {loading ? 'Updating...' : 'Update About Statistics'}
          </button>
        </div>
      )}

      {/* Join Us Section Stats */}
      {activeSection === 'join' && (
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-2">
            JOIN US SECTION
          </h2>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8 border-b pb-4">
            Update impact statistics shown on the join us page
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {Object.entries(joinStats).map(([key, value]) => (
              <div key={key} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 capitalize">
                  {key === 'fundsUtilized' ? 'Funds Utilized (₹L)' : 
                    key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type="number"
                  min="0"
                  step={key === 'fundsUtilized' ? "0.01" : "1"}
                  value={value}
                  onChange={(e) => handleJoinStatsChange(key, e.target.value)}
                  className="stats-input"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => handleUpdate('join')}
            disabled={loading}
            className="update-button mt-6 sm:mt-8"
          >
            {loading ? 'Updating...' : 'Update Join Us Statistics'}
          </button>
        </div>
      )}

      {/* Transparency Section Stats */}
      {activeSection === 'transparency' && (
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-2">
            TRANSPARENCY SECTION
          </h2>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8 border-b pb-4">
            Update transparency metrics and financial statistics
          </p>

          <div className="space-y-6 sm:space-y-8">
            {/* Main Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {Object.entries(transparencyStats)
                .filter(([key]) => key !== 'financialStats')
                .map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleTransparencyStatsChange(key, e.target.value)}
                      className="stats-input text-sm sm:text-base"
                    />
                  </div>
                ))}
            </div>

            {/* Financial Stats */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-4">
              Financial Statistics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {Object.entries(transparencyStats.financialStats).map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    type="text"
                    value={value.replace('₹₹', '₹')}
                    onChange={(e) => handleTransparencyStatsChange(key, e.target.value, true)}
                    className="stats-input text-sm sm:text-base"
                    placeholder={key === 'efficiencyRatio' ? '0%' : '₹0 Cr'}
                  />
                  <small className="text-xs sm:text-sm text-gray-500 mt-1 block">
                    {key === 'efficiencyRatio' ? 
                      'Enter just the number (e.g., 75)' : 
                      'Enter just the number without symbols (e.g., 100)'}
                  </small>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleUpdate('transparency')}
            disabled={loading}
            className="update-button mt-6 sm:mt-8"
          >
            {loading ? 'Updating...' : 'Update Transparency Statistics'}
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  );
} 
export default ValueUpdater;