import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Search, Filter, MapPin, X, Trash2, ImageOff, MapPinned, User } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://andhravikasam-server.onrender.com/api';

// Update the main container
function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    pinCode: '',
    district: '',
    category: ''
  });
  const [hasSearched, setHasSearched] = useState(false);
  const [suggestions, setSuggestions] = useState({
    district: [],
    pinCode: []
  });
  const [showSuggestions, setShowSuggestions] = useState({
    district: false,
    pinCode: false
  });
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async () => {
    setHasSearched(true);
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const token = sessionStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/problems?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch reports');
      const data = await response.json();
      setReports(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'district' || name === 'pinCode') {
      fetchSuggestions(name, value);
      setShowSuggestions(prev => ({ ...prev, [name]: true }));
    }
  };

  const clearFilters = () => {
    setFilters({
      pinCode: '',
      district: '',
      category: ''
    });
    setHasSearched(false);
    setReports([]);
    setError('');
  };

  const fetchSuggestions = async (type, value) => {
    if (!value.trim()) {
      setSuggestions(prev => ({ ...prev, [type]: [] }));
      return;
    }

    try {
      const token = sessionStorage.getItem('adminToken');
      const response = await fetch(
        `${API_URL}/problems/suggestions?type=${type}&query=${value}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) throw new Error('Failed to fetch suggestions');
      const data = await response.json();
      setSuggestions(prev => ({ ...prev, [type]: data }));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
    setShowSuggestions(prev => ({ ...prev, [type]: false }));
  };

  const handleInputBlur = (type) => {
    // Delay hiding suggestions to allow clicks to register
    setTimeout(() => {
      setShowSuggestions(prev => ({ ...prev, [type]: false }));
    }, 200);
  };

  const handleDeleteReport = async (reportId) => {
    if (!window.confirm('Are you sure you want to delete this report?')) {
      return;
    }

    try {
      const token = sessionStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/problems/${reportId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete report');
      }

      // Remove the deleted report from state
      setReports(reports.filter(report => report._id !== reportId));
      toast.success('Report deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete report');
    }
  };

  const ReportModal = ({ report, onClose }) => {
    useEffect(() => {
      const handleEscape = (e) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (!report) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
           onClick={onClose}>
        <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
             onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Problem Details</h2>
            <button onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-6">
            {/* Category */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                {report.category}
              </span>
            </div>

            {/* Title and Description */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {report.details.title}
              </h3>
              <p className="text-gray-600 whitespace-pre-wrap">
                {report.details.description}
              </p>
            </div>

            {/* Location Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Location Details</h4>
                <div className="space-y-2">
                  <p className="text-sm"><span className="text-gray-500">Village:</span> {report.location.village}</p>
                  <p className="text-sm"><span className="text-gray-500">District:</span> {report.location.district}</p>
                  <p className="text-sm"><span className="text-gray-500">State:</span> {report.location.state}</p>
                  <p className="text-sm"><span className="text-gray-500">PIN Code:</span> {report.location.pinCode}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                <div className="space-y-2">
                  <p className="text-sm"><span className="text-gray-500">Name:</span> {report.contact.name}</p>
                  <p className="text-sm"><span className="text-gray-500">Phone:</span> {report.contact.phone}</p>
                  {report.contact.email && (
                    <p className="text-sm"><span className="text-gray-500">Email:</span> {report.contact.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Images */}
            {report.images && report.images.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Images</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {report.images.map((image, index) => (
                    <div key={index} className="relative aspect-video">
                      <img
                        src={image}
                        alt={`Problem ${index + 1}`}
                        className="rounded-lg object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return (
    <div className="space-y-6 pt-4">
      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px] relative">
            <input
              type="text"
              name="pinCode"
              value={filters.pinCode}
              onChange={handleFilterChange}
              onBlur={() => handleInputBlur('pinCode')}
              placeholder="Search by PIN code"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                       focus:ring-orange-500 focus:border-transparent"
            />
            {showSuggestions.pinCode && suggestions.pinCode.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 
                            rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {suggestions.pinCode.map((pin) => (
                  <button
                    key={pin}
                    onClick={() => handleSuggestionClick('pinCode', pin)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-orange-50 
                             focus:bg-orange-50 focus:outline-none"
                  >
                    {pin}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-[200px] relative">
            <input
              type="text"
              name="district"
              value={filters.district}
              onChange={handleFilterChange}
              onBlur={() => handleInputBlur('district')}
              placeholder="Search by district"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                       focus:ring-orange-500 focus:border-transparent"
            />
            {showSuggestions.district && suggestions.district.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 
                            rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {suggestions.district.map((district) => (
                  <button
                    key={district}
                    onClick={() => handleSuggestionClick('district', district)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-orange-50 
                             focus:bg-orange-50 focus:outline-none"
                  >
                    {district}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-[200px]">
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="water">Water</option>
              <option value="electricity">Electricity</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="environment">Environment</option>
              <option value="transportation">Transportation</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 
                       transition-colors flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Initial State */}
      {!hasSearched && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="h-8 w-8 text-orange-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Search for Problem Reports
          </h3>
          <p className="text-gray-500">
            Use the filters above to search for specific problem reports
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-500">Loading reports...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
          {error}
        </div>
      )}

      {/* Results */}
      {hasSearched && !loading && !error && (
        <div className="space-y-4">
          {reports.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No reports found matching your search criteria
            </div>
          ) : (
            reports.map(report => (
              <div
                key={report._id}
                onClick={() => {
                  setSelectedReport(report);
                  setIsModalOpen(true);
                }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden 
               hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image Section */}
                  <div className="sm:w-48 h-48 sm:h-full relative">
                    {report.images && report.images.length > 0 ? (
                      <>
                        <img
                          src={report.images[0]}
                          alt="Problem thumbnail"
                          className="w-full h-full object-cover"
                        />
                        {report.images.length > 1 && (
                          <div className="absolute bottom-2 right-2 bg-black/50 text-white 
                            text-xs px-2 py-1 rounded-full">
                            +{report.images.length - 1}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <ImageOff className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full 
                          text-sm font-medium capitalize">
                        {report.category}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteReport(report._id);
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 
                       rounded-full transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete report"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-1">
                      {report.details.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {report.details.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{report.location.village}, {report.location.district}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPinned className="h-4 w-4 text-gray-400" />
                        <span>{report.location.pinCode}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{report.contact.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Report Details Modal */}
      {isModalOpen && (
        <ReportModal
          report={selectedReport}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedReport(null);
          }}
        />
      )}
    </div>
  );
}

export default Reports;