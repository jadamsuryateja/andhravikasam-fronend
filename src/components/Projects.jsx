import { useState, useEffect } from 'react';
import { MapPin, User, Shield, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const API_URL = 'https://andhravikasam-server.onrender.com/api';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  
  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  useEffect(() => {
    fetchProjects();
  }, [filter]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/projects${filter !== 'all' ? `?status=${filter}` : ''}`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Solved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'In Progress': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Pending': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Solved': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Pending': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="pt-24 pb-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="text-center mb-12 space-y-4">
            <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse mx-auto"></div>
            <div className="h-4 w-96 bg-gray-200 rounded-lg animate-pulse mx-auto"></div>
          </div>

          {/* Filter Skeleton */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-24 h-10 bg-gray-200 rounded-md animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Projects Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <div className="relative w-full h-0 pb-[75%] sm:pb-[66.67%] bg-gray-200 animate-pulse">
                  {/* Status badge skeleton */}
                  <div className="absolute top-2 right-2 w-24 h-6 bg-gray-300 rounded-full"></div>
                  {/* Date badge skeleton */}
                  <div className="absolute top-2 left-2 w-20 h-6 bg-gray-300 rounded-md"></div>
                  
                  {/* Content skeleton */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 bg-gradient-to-t from-gray-100 to-transparent">
                    {/* Title skeleton */}
                    <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
                    {/* Description skeleton */}
                    <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 w-2/3 bg-gray-300 rounded mb-4"></div>
                    
                    {/* Location and sponsor skeleton */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                        <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                        <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="mt-8 flex flex-col items-center justify-center space-y-4 pb-8">
            <div className="w-48 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="flex gap-4">
              <div className="w-24 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-24 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 bg-gray-50 min-h-screen"> {/* Increased top padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Community Projects
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Track the progress of various development initiatives
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-center mb-8 overflow-x-auto py-2"> {/* Added overflow handling */}
          <div className="inline-flex rounded-md shadow-sm">
            {['all', 'Pending', 'In Progress', 'Solved'].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setFilter(status);
                  setCurrentPage(1);
                }}
                className={`whitespace-nowrap px-3 sm:px-4 py-2 text-sm font-medium ${
                  filter === status
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border ${
                  status === 'all' ? 'rounded-l-md' : ''
                } ${
                  status === 'Solved' ? 'rounded-r-md' : ''
                } border-gray-300`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {currentProjects.map((project) => (
            <div key={project._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200 flex flex-col">
              <div className="relative w-full h-0 pb-[75%] sm:pb-[66.67%]"> {/* Adjusted aspect ratio */}
                <img
                  src={project.images?.[0] || 'default-project-image.jpg'}
                  alt={project.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'default-project-image.jpg';
                    e.target.onerror = null;
                  }}
                />
                {/* Status badge */}
                <div className={`absolute top-2 sm:top-3 right-2 sm:right-3 z-10 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${getStatusColor(project.status)}`}>
                  <div className="flex items-center gap-1.5">
                    {getStatusIcon(project.status)}
                    {project.status}
                  </div>
                </div>
                
                {/* Date badge */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 bg-black/50 text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm">
                  {new Date(project.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
                
                {/* Content overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent 
                  opacity-70 transition-opacity duration-300 group-hover:opacity-90"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                  <h3 className="text-white font-semibold text-lg sm:text-xl leading-tight mb-2 sm:mb-3 
                    drop-shadow-lg line-clamp-2"
                  >
                    {project.title}
                  </h3>
                  <p className="text-gray-200 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex items-center text-gray-100 text-xs sm:text-sm">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                      <span className="line-clamp-1">{project.village}, {project.mandal}</span>
                    </div>

                    {project.sponsor && (
                      <div className="flex items-center text-gray-100 text-xs sm:text-sm">
                        <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                        <span className="line-clamp-1">Sponsored by {project.sponsor}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-8 flex flex-col items-center justify-center space-y-4 pb-8">
          {/* Projects count */}
          <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-700">
              Showing projects{' '}
              <span className="font-medium">{indexOfFirstProject + 1}</span>
              {' - '}
              <span className="font-medium">
                {Math.min(indexOfLastProject, projects.length)}
              </span>
              {' of '}
              <span className="font-medium">{projects.length}</span>
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 w-full max-w-md">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-white text-gray-800 font-semibold border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span>←</span> Previous
            </button>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-6 py-3 bg-white text-gray-800 font-semibold border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Next <span>→</span>
            </button>
          </div>

          {/* Page indicator */}
          <div className="text-sm font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
