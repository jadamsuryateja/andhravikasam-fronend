import { useState } from 'react';
import { CheckCircle, UserPlus } from 'lucide-react';

const GOOGLE_SHEETS_API = "https://script.google.com/macros/s/AKfycbwsl8ePJIsBx7B_0GHzU8EC7UhK5DR2mcE5_QSHJywiFVqaWIZNYlYiGJRhekyQV4KEog/exec";

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
      <div className="max-w-[1440px] mx-auto pt-24"> {/* Added top padding */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-6rem)]"> {/* Adjusted height */}
          {/* Left Side - Form */}
          <div className="px-6 sm:px-8 lg:px-12 py-12">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6"> {/* Reduced margin */}
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Join Andhra Vikasam</h1>
                <p className="text-lg text-gray-700">
                  Be part of the movement to build a better Andhra Pradesh
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-xl p-6"> {/* Reduced padding */}
                <form onSubmit={handleSubmit} className="space-y-4"> {/* Reduced spacing */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Two columns for form fields */}
                    {/* Name and Role */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Full Name *
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
                        Role *
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
                        District *
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
                        Mandal *
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
                        Village *
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
                        College/Profession *
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

                  {/* Contact and Motivation */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Contact Number *
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
                      Why do you want to join Andhra Vikasam? *
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

                  {/* Error and Submit Button */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-primary text-white font-bold rounded-lg 
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

          {/* Right Side - Visual Content */}
          <div className="hidden lg:flex flex-col items-center justify-center 
                        bg-gradient-to-br from-primary/10 to-orange-100 p-8">
            <div className="text-center max-w-2xl w-full"> {/* Increased width */}
              <div className="relative mb-6"> {/* Reduced margin */}
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
                <UserPlus className="h-24 w-24 text-primary relative z-10 mx-auto" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Join Our Mission
              </h2>
              <div className="grid grid-cols-3 gap-4"> {/* Changed to grid layout */}
                {/* Mission Cards */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    💪 Empower
                  </h3>
                  <p className="text-sm text-gray-600">
                    Work directly with villages
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    🤝 Connect
                  </h3>
                  <p className="text-sm text-gray-600">
                    Build youth networks
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    🎯 Impact
                  </h3>
                  <p className="text-sm text-gray-600">
                    Create real solutions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinUs;
