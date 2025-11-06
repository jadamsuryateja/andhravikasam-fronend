import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { LogOut, Users, FolderOpen, MapPin, Clock, CheckCircle, AlertCircle, Loader2, Menu, FileText } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import AddProject from './AddProject';
import Members from './Members';
import Reports from './Reports';

const API_URL = 'https://andhravikasam-server.onrender.com/api';

function AdminDashboard({ admin, onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem('adminActiveTab') || 'projects'
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;
  const [showAddProject, setShowAddProject] = useState(false);

  // Add these state variables after other state declarations
  const [filters, setFilters] = useState({
    mandal: '',
    constituency: ''
  });

  const [uniqueMandals, setUniqueMandals] = useState([]);
  const [uniqueConstituencies, setUniqueConstituencies] = useState([]);

  // Save active tab to session storage when it changes
  useEffect(() => {
    sessionStorage.setItem('adminActiveTab', activeTab);
  }, [activeTab]);

  // Check auth on mount
  useEffect(() => {
    const token = sessionStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin/login';
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'projects') {
      fetchProjects();
    }
  }, [activeTab]);

  const fetchProjects = async () => {
    try {
      const token = sessionStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/projects`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      setUpdateLoading(true);
      const token = sessionStorage.getItem('adminToken'); // Changed from localStorage
      const response = await fetch(`${API_URL}/projects/${projectId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update the local state immediately
      setProjects(projects.map(project => 
        project._id === projectId 
          ? { ...project, status: newStatus }
          : project
      ));

      // Show success toast
      toast.success(`Project status updated to ${newStatus}`, {
        duration: 3000,
        position: 'bottom-right',
        style: {
          background: '#10B981',
          color: '#fff',
          borderRadius: '8px',
          padding: '16px',
        },
        icon: '✅',
      });

      setError('');
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Failed to update status');
      // Show error toast
      toast.error('Failed to update status', {
        duration: 3000,
        position: 'bottom-right',
        style: {
          background: '#EF4444',
          color: '#fff',
          borderRadius: '8px',
          padding: '16px',
        },
        icon: '❌',
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const token = sessionStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      // Remove project from state
      setProjects(projects.filter(project => project._id !== projectId));
      toast.success('Project deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete project');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Solved':
        return <CheckCircle className="h-4 w-4 text-white" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-white" />;
      default:
        return <AlertCircle className="h-4 w-4 text-white" />;
    }
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  // Pagination logic
  const getFilteredProjects = () => {
    return projects.filter(project => {
      const mandalMatch = !filters.mandal || project.mandal === filters.mandal;
      const constituencyMatch = !filters.constituency || project.constituency === filters.constituency;
      return mandalMatch && constituencyMatch;
    });
  };

  const filteredProjects = getFilteredProjects();
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add this function after other useEffect hooks
  useEffect(() => {
    if (projects.length > 0) {
      // Get unique mandals
      const mandals = [...new Set(projects.map(project => project.mandal))];
      setUniqueMandals(mandals);

      // Get unique constituencies
      const constituencies = [...new Set(projects.map(project => project.constituency))];
      setUniqueConstituencies(constituencies);
    }
  }, [projects]);

  // Add this effect to handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Add this effect to handle body scroll
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <Toaster position="top-right" />
      
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
        <div className="px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">Admin Portal</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{admin.username}</span>
              <button
                onClick={handleLogout}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/20" onClick={() => setSidebarOpen(false)}>
          <div 
            className="absolute left-0 top-0 bottom-0 w-64 lg:w-72 bg-white shadow-xl p-4
                       transition-transform duration-300 ease-out"
            onClick={e => e.stopPropagation()}
          >
            {/* Admin Info */}
            <div className="mb-6 p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{admin.username}</p>
                  <p className="text-sm text-orange-100">{admin.role}</p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-2">
              {[
                { id: 'projects', icon: FolderOpen, label: 'Projects' },
                { id: 'members', icon: Users, label: 'Members' },
                { id: 'reports', icon: FileText, label: 'Reports' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium 
                           transition-all ${activeTab === item.id 
                             ? 'bg-orange-100 text-orange-600' 
                             : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-20 px-4 lg:px-6 py-6 sm:pt-24">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'projects' ? (
            <div className="space-y-6 lg:space-y-8 pt-4">
              {/* Add this after the header section and before the grid stats */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Projects Overview</h2>
                <button
                  onClick={() => setShowAddProject(true)}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg 
                            shadow-sm transition-colors flex items-center gap-2"
                >
                  <FolderOpen className="h-4 w-4" />
                  New Project
                </button>
              </div>

              {showAddProject && (
                <AddProject 
                  admin={admin} 
                  onProjectAdded={() => {
                    fetchProjects();
                    setShowAddProject(false);
                  }}
                  onClose={() => setShowAddProject(false)}
                />
              )}

              {activeTab === 'projects' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {/* All Projects Card */}
                  <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Filtered Projects</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {filteredProjects.length}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          of {projects.length} total
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <FolderOpen className="h-5 w-5 text-orange-600" />
                      </div>
                    </div>
                  </div>

                  {/* Pending Card */}
                  <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Pending</p>
                        <h3 className="text-2xl font-bold text-red-600">
                          {filteredProjects.filter(p => p.status === 'Pending').length}
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      </div>
                    </div>
                  </div>

                  {/* In Progress Card */}
                  <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">In Progress</p>
                        <h3 className="text-2xl font-bold text-yellow-600">
                          {filteredProjects.filter(p => p.status === 'In Progress').length}
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-yellow-600" />
                      </div>
                    </div>
                  </div>

                  {/* Solved Card */}
                  <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Solved</p>
                        <h3 className="text-2xl font-bold text-green-600">
                          {filteredProjects.filter(p => p.status === 'Solved').length}
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Add this code after the stats cards and before the project cards grid */}
                  <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Mandal Filter */}
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Filter by Mandal
                        </label>
                        <select
                          value={filters.mandal}
                          onChange={(e) => setFilters(prev => ({ ...prev, mandal: e.target.value }))}
                          className="w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 
                                    text-sm focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="">All Mandals</option>
                          {uniqueMandals.map(mandal => (
                            <option key={mandal} value={mandal}>{mandal}</option>
                          ))}
                        </select>
                      </div>

                      {/* Constituency Filter */}
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Filter by Constituency
                        </label>
                        <select
                          value={filters.constituency}
                          onChange={(e) => setFilters(prev => ({ ...prev, constituency: e.target.value }))}
                          className="w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 
                                    text-sm focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="">All Constituencies</option>
                          {uniqueConstituencies.map(constituency => (
                            <option key={constituency} value={constituency}>{constituency}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Clear Filters Button */}
                    {(filters.mandal || filters.constituency) && (
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => {
                            setFilters({ mandal: '', constituency: '' });
                            setCurrentPage(1);
                          }}
                          className="px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 
                                    rounded-lg transition-colors"
                        >
                          Clear Filters
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Show "No projects found" message if filtered results are empty */}
                  {filteredProjects.length === 0 ? (
                    <div className="text-center py-12">
                      <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                      <p className="text-gray-500">
                        Try adjusting your filters or create a new project
                      </p>
                    </div>
                  ) : (
                    // Your existing project cards grid
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                      {currentProjects.map((project) => (
                        <div key={project._id} 
                          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden
                                    hover:shadow-md transition-all duration-200 flex flex-col h-full">
                          {/* Image Section */}
                          <div className="relative w-full aspect-video sm:h-48">
                            {project.images && project.images.length > 0 ? (
                              <img
                                src={project.images[0]}
                                alt={project.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <FolderOpen className="h-8 w-8 sm:h-12 sm:w-12 text-gray-300" />
                              </div>
                            )}
                            {project.images?.length > 1 && (
                              <div className="absolute bottom-2 right-2 bg-black/50 text-white 
                                              text-xs px-2 py-1 rounded-full">
                                +{project.images.length - 1}
                              </div>
                            )}
                          </div>

                          {/* Content Section */}
                          <div className="p-3 sm:p-4 flex flex-col gap-2 sm:gap-3 flex-grow">
                            <div className="flex flex-col gap-2 flex-grow">
                              <h3 className="font-semibold text-base sm:text-lg text-gray-900 line-clamp-2">
                                {project.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-3">
                                {project.description}
                              </p>
                            </div>

                            {/* Status and Actions */}
                            <div className="flex flex-col sm:flex-row gap-2 mt-2">
                              <select
                                value={project.status}
                                onChange={(e) => handleStatusChange(project._id, e.target.value)}
                                className="text-xs sm:text-sm border rounded-md px-2 py-1.5 
                                          bg-white shadow-sm focus:ring-2 focus:ring-orange-500
                                          flex-grow sm:max-w-[140px]"
                              >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Solved">Solved</option>
                              </select>
                              
                              <button
                                onClick={() => handleDeleteProject(project._id)}
                                className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-md 
                                          transition-colors flex-shrink-0 ml-auto"
                                title="Delete Project"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                  width="16" height="16" 
                                  viewBox="0 0 24 24" 
                                  className="sm:w-5 sm:h-5"
                                  fill="none" 
                                  stroke="currentColor" 
                                  strokeWidth="2"
                                >
                                  <path d="M3 6h18" />
                                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                </svg>
                              </button>
                            </div>

                            {/* Location Info */}
                            <div className="grid grid-cols-3 gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-500 mt-2">
                              <div className="flex items-center gap-1 truncate">
                                <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                                <span className="truncate">{project.village}</span>
                              </div>
                              <div className="flex items-center gap-1 truncate">
                                <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                                <span className="truncate">{project.mandal}</span>
                              </div>
                              <div className="flex items-center gap-1 truncate">
                                <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                                <span className="truncate">{project.constituency}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                    </div>
                  )}

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 pt-6">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg border border-orange-200 text-orange-600
                                 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50
                                 transition-colors"
                      >
                        Previous
                      </button>
                      
                      <div className="flex items-center gap-1">
                        {[...Array(totalPages)].map((_, index) => (
                          <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center
                                      transition-colors ${currentPage === index + 1
                                        ? 'bg-orange-500 text-white'
                                        : 'text-gray-600 hover:bg-orange-50'}`}
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg border border-orange-200 text-orange-600
                                 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50
                                 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Pagination Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between mt-6">
                {/* Page Info */}
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstProject + 1} - {Math.min(indexOfLastProject, projects.length)} of {projects.length} projects
                </div>

                {/* Pagination Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-white border border-gray-300 
                               shadow-sm hover:bg-orange-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-white border border-gray-300 
                               shadow-sm hover:bg-orange-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          ) : activeTab === 'reports' ? (
            <div className="pt-4">
              <Reports />
            </div>
          ) : (
            <div className="pt-4">
              <Members admin={admin} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;

/* Add this CSS to your global styles or Tailwind config */
<style jsx global>{`
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  select option {
    padding: 10px;
    margin: 4px;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s;
  }

  select option:hover {
    cursor: pointer;
  }

  select option:checked {
    /* Use the lighter primary orange for consistency */
    background: linear-gradient(to right, #FFB366, #FFC785);
    color: white;
  }

  select:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  /* Add these styles to hide scrollbar */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;     /* Firefox */
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }

  @media (max-width: 640px) {
    select {
      font-size: 0.875rem;
      padding: 0.5rem;
    }
    
    select option {
      padding: 8px;
    }
  }
`}</style>
