import { useState, useEffect } from 'react';  // Add useEffect import
import { 
  CheckCircle, UserPlus, Rocket, Heart, Target, Users2, Network,
  User, UserCog, MapPin, Building, Briefcase, Phone, MessageSquare, 
  FileSpreadsheet, MapPinned, Home
} from 'lucide-react';

const GOOGLE_SHEETS_API = "https://script.google.com/macros/s/AKfycbwsl8ePJIsBx7B_0GHzU8EC7UhK5DR2mcE5_QSHJywiFVqaWIZNYlYiGJRhekyQV4KEog/exec";
const API_URL = import.meta.env.VITE_API_URL || 'https://andhravikasam-server.onrender.com/api';

function JoinUs() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    district: '',
    mandal: '',
    village: '',
    collegeProfession: '',
    contact: '',
    motivation: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [stats, setStats] = useState({
    activeVolunteers: 0,
    constituenciesCovered: 0,
    problemsSolved: 0,
    fundsUtilized: 0
  });

  const roles = [
    'Volunteer',
    'Village Incharge',
    'Mandal Incharge',
    'Constituency Incharge',
    'District Incharge'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(GOOGLE_SHEETS_API, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Scripts
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      // Since no-cors doesn't return response status, we'll assume success
      setSubmitted(true);
      setFormData({
        name: '',
        role: '',
        district: '',
        mandal: '',
        village: '',
        collegeProfession: '',
        contact: '',
        motivation: ''
      });

    } catch (err) {
      setError('Failed to submit. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add useEffect to fetch stats when component mounts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/stats-join`);
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        
        setStats({
          activeVolunteers: Number(data.activeVolunteers) || 0,
          constituenciesCovered: Number(data.constituenciesCovered) || 0,
          problemsSolved: Number(data.problemsSolved) || 0,
          fundsUtilized: Number(data.fundsUtilized) || 0
        });
      } catch (error) {
        console.error('Error fetching join stats:', error);
        // Optionally set an error state here
      }
    };

    fetchStats();
  }, []);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 py-16 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-12">
            <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Andhra Vikasam!
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              You've successfully joined Andhra Vikasam. Your application is under review.
              Together, let's build our Andhra.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-8 py-3 bg-primary text-white font-semibold rounded-lg 
                       hover:bg-orange-600 transition-all duration-300 
                       shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50/50">
      <div className="max-w-[1440px] mx-auto pt-8">
        {/* Hero Section with Stats */}
        <div className="text-center max-w-4xl mx-auto px-4 mb-8">
          {/* Pre-heading text */}
          <div className="inline-flex items-center justify-center gap-2 text-orange-500 font-medium mt-16 mb-6 bg-orange-50 px-4 py-2 rounded-full">
            <Rocket className="w-4 h-4" />
            <span>Join the Movement</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-[#1e2f4d] block">Transform Your</span>
            <span className="text-[#ff6b2b] block">Passion into Impact</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
             Join our growing community of young changemakers across India who are solving real village 
              problems through technology, transparency, and collective action. Your 
              skills can create lasting change.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Heart className="w-8 h-8 text-rose-500 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">{stats.activeVolunteers}</h3>
              <p className="text-gray-600 text-sm">Active Volunteers</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Target className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">{stats.constituenciesCovered}</h3>
              <p className="text-gray-600 text-sm">Constituencies Covered</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <UserPlus className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">{stats.problemsSolved}</h3>
              <p className="text-gray-600 text-sm">Problems Solved</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Rocket className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">₹{stats.fundsUtilized}L</h3>
              <p className="text-gray-600 text-sm">Funds Utilized</p>
            </div>
          </div>
        </div>

        {/* Two Column Layout for Instructions and Form */}
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Instructions Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Fill the Form</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 mt-1">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-primary font-semibold">1</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Personal Details</h4>
                    <p className="text-gray-600">Enter your full name and select the role you're interested in.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 mt-1">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-primary font-semibold">2</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Location Information</h4>
                    <p className="text-gray-600">Provide your district, mandal, and village details accurately.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 mt-1">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-primary font-semibold">3</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Professional Background</h4>
                    <p className="text-gray-600">Tell us about your college or current profession.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 mt-1">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-primary font-semibold">4</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Contact Details</h4>
                    <p className="text-gray-600">Share your contact number for communication.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 mt-1">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-primary font-semibold">5</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Motivation</h4>
                    <p className="text-gray-600">Explain why you want to join Andhra Vikasam and your vision for change.</p>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="mt-8 p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Important Notes:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>All fields marked with * are mandatory</li>
                  <li>Ensure your contact number is active</li>
                  <li>Be honest and clear in your motivation</li>
                </ul>
              </div>
            </div>

            {/* Form Card - Existing Form */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 sm:px-8 py-8">
                {/* Form Header */}
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Join Andhra Vikasam</h2>
                  <p className="text-lg text-gray-700">
                    Be part of the movement to build a better Andhra Pradesh
                  </p>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name and Role */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" />
                          Full Name *
                        </div>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                                 focus:ring-2 focus:ring-primary focus:border-transparent 
                                 transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <UserCog className="w-4 h-4 text-primary" />
                          Role *
                        </div>
                      </label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                                 focus:ring-2 focus:ring-primary focus:border-transparent 
                                 transition-all"
                      >
                        <option value="">Select your role</option>
                        {roles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>

                    {/* District and Mandal */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-primary" />
                          District *
                        </div>
                      </label>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                                 focus:ring-2 focus:ring-primary focus:border-transparent 
                                 transition-all"
                        placeholder="Enter district"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <MapPinned className="w-4 h-4 text-primary" />
                          Mandal *
                        </div>
                      </label>
                      <input
                        type="text"
                        name="mandal"
                        value={formData.mandal}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                                 focus:ring-2 focus:ring-primary focus:border-transparent 
                                 transition-all"
                        placeholder="Enter mandal"
                      />
                    </div>

                    {/* Village and College/Profession */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-primary" />
                          Village *
                        </div>
                      </label>
                      <input
                        type="text"
                        name="village"
                        value={formData.village}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                                 focus:ring-2 focus:ring-primary focus:border-transparent 
                                 transition-all"
                        placeholder="Enter village"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-primary" />
                          College/Profession *
                        </div>
                      </label>
                      <input
                        type="text"
                        name="collegeProfession"
                        value={formData.collegeProfession}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                                 focus:ring-2 focus:ring-primary focus:border-transparent 
                                 transition-all"
                        placeholder="Enter your college or profession"
                      />
                    </div>
                  </div>

                  {/* Contact and Motivation fields */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-primary" />
                          Contact Number *
                        </div>
                      </label>
                      <input
                        type="tel"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                                 focus:ring-2 focus:ring-primary focus:border-transparent 
                                 transition-all"
                        placeholder="Enter your contact number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-primary" />
                          Why do you want to join Andhra Vikasam? *
                        </div>
                      </label>
                      <textarea
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleChange}
                        required
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                                 focus:ring-2 focus:ring-primary focus:border-transparent 
                                 transition-all"
                        placeholder="Share your motivation..."
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-primary text-white font-bold rounded-lg 
                             hover:bg-orange-600 transition-all duration-300 
                             disabled:bg-gray-400 disabled:cursor-not-allowed 
                             shadow-lg hover:shadow-xl"
                  >
                    {loading ? 'Submitting...' : 'Join Andhra Vikasam'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinUs;
