import { useState, useRef } from 'react';
import { 
  Building2, Droplets, Power, Heart, GraduationCap, 
  TreePine, Bus, AlertCircle, MapPin, Camera, FileText, 
  ArrowRight, Check 
} from 'lucide-react';

const API_URL = 'https://andhravikasam-server.onrender.com/api';

function ReportProblem() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    // Location Details
    location: {
      gpsLocation: '',
      village: '',
      district: '',
      state: '',
      pinCode: '',
      landmark: ''
    },
    // Problem Details
    details: {
      title: '',
      description: '',
      peopleAffected: '',
      urgencyLevel: 'Medium',
      name: '',
      contact: '',
      email: ''
    }
  });

  const [gpsError, setGpsError] = useState('');

  const problemCategories = [
    {
      id: 'infrastructure',
      title: 'Infrastructure',
      description: 'Roads, bridges, buildings, public facilities',
      timeline: 'Est. Timeline: 2-4 weeks',
      icon: Building2
    },
    {
      id: 'water',
      title: 'Water & Sanitation',
      description: 'Water supply, drainage, sewage, toilets',
      timeline: 'Est. Timeline: 1-3 weeks',
      icon: Droplets
    },
    {
      id: 'electricity',
      title: 'Electricity',
      description: 'Power supply, street lights, electrical issues',
      timeline: 'Est. Timeline: 1-2 weeks',
      icon: Power
    },
    {
      id: 'healthcare',
      title: 'Healthcare',
      description: 'Medical facilities, equipment, staff shortage',
      timeline: 'Est. Timeline: 2-6 weeks',
      icon: Heart
    },
    {
      id: 'education',
      title: 'Education',
      description: 'Schools, teachers, educational resources',
      timeline: 'Est. Timeline: 3-8 weeks',
      icon: GraduationCap
    },
    {
      id: 'environment',
      title: 'Environment',
      description: 'Pollution, waste management, cleanliness',
      timeline: 'Est. Timeline: 1-4 weeks',
      icon: TreePine
    },
    {
      id: 'transportation',
      title: 'Transportation',
      description: 'Public transport, connectivity issues',
      timeline: 'Est. Timeline: 2-6 weeks',
      icon: Bus
    },
    {
      id: 'other',
      title: 'Other Issues',
      description: 'Any other community problem',
      timeline: 'Est. Timeline: 1-4 weeks',
      icon: AlertCircle
    }
  ];

  const handleLocationChange = (e) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [e.target.name]: e.target.value
      }
    }));
  };

  const handleDetailsChange = (e) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [e.target.name]: e.target.value
      }
    }));
  };

  const getGPSLocation = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser');
      return;
    }

    const successHandler = (position) => {
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          gpsLocation: `${position.coords.latitude},${position.coords.longitude}`
        }
      }));
      setGpsError('');
    };

    const errorHandler = (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setGpsError('Please allow location access to use this feature');
          break;
        case error.POSITION_UNAVAILABLE:
          setGpsError('Location information is unavailable');
          break;
        case error.TIMEOUT:
          setGpsError('Location request timed out');
          break;
        default:
          setGpsError('An unknown error occurred');
          break;
      }
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      alert('Maximum 5 photos allowed');
      return;
    }
    setImages(prev => [...prev, ...files]);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Upload images to Cloudinary first
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const formData = new FormData();
          formData.append('file', image);
          formData.append('upload_preset', 'your_upload_preset');
          
          const response = await fetch('your_cloudinary_url', {
            method: 'POST',
            body: formData
          });
          
          const data = await response.json();
          return data.secure_url;
        })
      );

      // Submit problem report with image URLs
      const response = await fetch(`${API_URL}/problems`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          problemType: selectedProblem,
          images: imageUrls
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Failed to submit problem');
      }
    } catch (error) {
      console.error('Error submitting problem:', error);
      alert('Failed to submit problem. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Select Problem Category</h2>
            {/* Update grid to show 4 cards per row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {problemCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedProblem(category.id)}
                  className={`p-4 rounded-xl text-center transition-all hover:shadow-lg w-full
                           ${selectedProblem === category.id
                             ? 'bg-primary text-white ring-2 ring-primary ring-offset-2'
                             : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
                           }`}
                >
                  <div className="flex flex-col items-center">
                    {/* Reduce icon container size */}
                    <div className={`p-3 rounded-lg mb-3 ${
                      selectedProblem === category.id
                        ? 'bg-white/20'
                        : 'bg-orange-100'
                    }`}>
                      <category.icon className={`h-8 w-8 ${
                        selectedProblem === category.id
                          ? 'text-white'
                          : 'text-primary'
                      }`} />
                    </div>
                    {/* Reduce text sizes */}
                    <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                    <p className={`text-sm mb-2 ${
                        selectedProblem === category.id
                          ? 'text-white/90'
                          : 'text-gray-600'
                      }`}>
                        {category.description}
                      </p>
                      <div className={`text-xs font-medium ${
                        selectedProblem === category.id
                          ? 'text-white/80'
                          : 'text-primary'
                      }`}>
                        {category.timeline}
                      </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Problem Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <button
                  onClick={getGPSLocation}
                  className="w-full py-3 bg-orange-50 text-primary font-semibold rounded-lg 
                           hover:bg-orange-100 transition-all flex items-center justify-center gap-2"
                >
                  <MapPin className="h-5 w-5" />
                  {formData.location.gpsLocation ? 'Update Location' : 'Get GPS Location'}
                </button>
                {formData.location.gpsLocation && (
                  <p className="mt-2 text-sm text-green-600 text-center">
                    Location obtained: {formData.location.gpsLocation}
                  </p>
                )}
                {gpsError && (
                  <p className="mt-2 text-sm text-red-600 text-center">
                    {gpsError}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Village/Area Name*
                </label>
                <input
                  type="text"
                  name="village"
                  value={formData.location.village}
                  onChange={handleLocationChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter village or area name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  District*
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.location.district}
                  onChange={handleLocationChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter district"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State*
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.location.state}
                  onChange={handleLocationChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter state"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  PIN Code
                </label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.location.pinCode}
                  onChange={handleLocationChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter PIN code"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Detailed Address/Landmark
                </label>
                <textarea
                  name="landmark"
                  value={formData.location.landmark}
                  onChange={handleLocationChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Provide specific location details or nearby landmarks"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Upload Photos</h2>
            <div className="bg-orange-50 rounded-lg p-6">
              <div className="text-center mb-6">
                <Camera className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Problem Documentation
                </h3>
                <p className="text-gray-600 mb-8">{images.length}/5 photos</p>
              </div>

              <div className="bg-white rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Photo Guidelines</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Take clear, well-lit photos showing the problem</li>
                  <li>• Include wide shots and close-up details</li>
                  <li>• Maximum 5 photos, each up to 5MB</li>
                  <li>• Supported formats: JPG, PNG, WEBP</li>
                </ul>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                multiple
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 border-2 border-dashed border-primary bg-white 
                         text-primary font-semibold rounded-lg hover:bg-orange-50 
                         transition-all flex items-center justify-center gap-2"
              >
                <Camera className="h-5 w-5" />
                Select Photos
              </button>

              {images.length > 0 && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Problem photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full 
                                 hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Problem Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Problem Title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.details.title}
                  onChange={handleDetailsChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Brief, clear title describing the problem"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Detailed Description*
                </label>
                <textarea
                  name="description"
                  value={formData.details.description}
                  onChange={handleDetailsChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Provide a detailed description of the problem..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    People Affected
                  </label>
                  <input
                    type="number"
                    name="peopleAffected"
                    value={formData.details.peopleAffected}
                    onChange={handleDetailsChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Approximate number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <select
                    name="urgencyLevel"
                    value={formData.details.urgencyLevel}
                    onChange={handleDetailsChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.details.name}
                    onChange={handleDetailsChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Number*
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.details.contact}
                    onChange={handleDetailsChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.details.email}
                    onChange={handleDetailsChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-orange-50/50 pt-24 pb-16">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Problem Reported Successfully!
            </h2>
            <p className="text-gray-600 mb-8">
              Thank you for reporting this issue. Our team will review and take necessary action.
              You'll receive updates on your registered contact number.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setCurrentStep(1);
                setSelectedProblem(null);
                setImages([]);
                setFormData({
                  location: {
                    gpsLocation: '',
                    village: '',
                    district: '',
                    state: '',
                    pinCode: '',
                    landmark: ''
                  },
                  details: {
                    title: '',
                    description: '',
                    peopleAffected: '',
                    urgencyLevel: 'Medium',
                    name: '',
                    contact: '',
                    email: ''
                  }
                });
              }}
              className="px-8 py-3 bg-primary text-white font-semibold rounded-lg 
                       hover:bg-orange-600 transition-all"
            >
              Report Another Problem
            </button>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    { number: 1, title: 'Category', subtitle: 'Problem Type' },
    { number: 2, title: 'Location', subtitle: 'Where' },
    { number: 3, title: 'Photos', subtitle: 'Evidence' },
    { number: 4, title: 'Details', subtitle: 'Information' },
    { number: 5, title: 'Confirm', subtitle: 'Submit' }
  ];

  // Update the main container and card backgrounds
  return (
    <div className="min-h-screen bg-orange-50/50 py-16 px-4 sm:py-24">
      <div className="max-w-3xl mx-auto">
        {/* Card with softer background */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
          {/* Progress Steps */}
          <div className="p-6 sm:p-8 border-b border-orange-100">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between relative px-4 sm:px-8">
                {/* Background Line */}
                <div className="absolute left-0 right-0 top-[22px] h-[2px] bg-orange-100" />
                
                {/* Progress Line */}
                <div 
                  className="absolute left-0 top-[22px] h-[2px] bg-primary transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />
                
                {/* Steps */}
                {steps.map((step, index) => (
                  <div
                    key={step.number}
                    className="relative flex flex-col items-center"
                  >
                    {/* Circle with orange tint for inactive state */}
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center 
                               text-base font-bold mb-3 transition-all duration-300
                               ${currentStep >= step.number
                                 ? 'bg-primary text-white shadow-md'
                                 : 'bg-orange-50 text-gray-400 border-2 border-orange-200'
                               }`}
                    >
                      {step.number}
                    </div>

                    {/* Labels with orange accent */}
                    <div className="absolute top-16 text-center w-20 sm:w-28">
                      <div 
                        className={`text-sm sm:text-base font-medium mb-0.5 transition-colors duration-300
                                 ${currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'}`}
                      >
                        {step.title}
                      </div>
                      <div 
                        className={`text-[10px] sm:text-xs transition-colors duration-300
                                 ${currentStep >= step.number ? 'text-primary' : 'text-orange-300'}`}
                      >
                        {step.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step Content with softer borders */}
          <div className="p-6 sm:p-8 bg-white/70">
            {renderStep()
            }
          </div>

          {/* Navigation with orange accents */}
          <div className="px-6 sm:px-8 py-4 sm:py-6 border-t border-orange-100 bg-orange-50/30">
            <div className="flex justify-between items-center">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-4 sm:px-6 py-2 text-gray-600 font-semibold hover:text-primary 
                           transition-colors"
                >
                  Back
                </button>
              )}
              <div className="ml-auto">
                {currentStep < 4 ? (
                  <button
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    disabled={currentStep === 1 && !selectedProblem}
                    className={`px-6 sm:px-8 py-2.5 sm:py-3 bg-primary text-white font-semibold 
                             rounded-lg transition-all flex items-center gap-2
                             ${currentStep === 1 && !selectedProblem
                               ? 'opacity-50 cursor-not-allowed'
                               : 'hover:bg-orange-600'
                             }`}
                  >
                    Next
                    <ArrowRight className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-6 sm:px-8 py-2.5 sm:py-3 bg-primary text-white font-semibold 
                             rounded-lg hover:bg-orange-600 transition-all flex items-center 
                             gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
                    {!isSubmitting && <Check className="h-5 w-5" />}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Reporting Guidelines */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Need Help?
            </h3>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Reporting Guidelines</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Be specific and accurate in your description
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Include clear photos showing the problem
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Provide exact location details
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Mention how many people are affected
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Contact Support
            </h3>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-center gap-3">
                <span className="text-primary">📞</span>
                <div>
                  <span className="font-medium">Helpline:</span>
                  <a href="tel:+919876543210" className="ml-1 hover:text-primary transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary">📧</span>
                <div>
                  <span className="font-medium">Email:</span>
                  <a href="mailto:support@y4g.org" className="ml-1 hover:text-primary transition-colors">
                    support@y4g.org
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary">⏰</span>
                <div>
                  <span className="font-medium">Available:</span>
                  <span className="ml-1">9 AM - 6 PM (Mon-Sat)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportProblem;