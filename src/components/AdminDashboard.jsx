import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { LogOut, Users, FolderOpen, MapPin, Clock, CheckCircle, AlertCircle, Loader2, Menu } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import AddProject from './AddProject';
import Members from './Members';

const API_URL = 'https://andhravikasam-server.onrender.com/api';

function AdminDashboard({ admin, onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem('adminActiveTab') || 'projects'
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

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
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <Toaster />
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 lg:w-72 bg-white shadow-xl 
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Brand Header */}
          <div className="p-6 lg:p-8 bg-gradient-to-r from-orange-500 to-orange-600">
            <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">{admin.username}</p>
                <p className="text-sm text-orange-100">{admin.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 lg:p-6 space-y-3">
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium 
                       transition-all ${activeTab === 'projects' 
                         ? 'bg-orange-100 text-orange-600 shadow-sm' 
                         : 'text-gray-600 hover:bg-orange-50'}`}
            >
              <FolderOpen className="h-5 w-5" />
              Projects
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium 
                       transition-all ${activeTab === 'members' 
                         ? 'bg-orange-100 text-orange-600 shadow-sm' 
                         : 'text-gray-600 hover:bg-orange-50'}`}
            >
              <Users className="h-5 w-5" />
              Members
            </button>
          </nav>

          {/* Footer */}
          <div className="p-4 lg:p-6 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 
                       bg-red-50 text-red-600 rounded-xl hover:bg-red-100 
                       transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64 lg:ml-72' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-sm sticky top-0 z-20">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4 lg:py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-xl hover:bg-white/20 text-black 
                         transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="text-lg lg:text-xl font-semibold text-white">
                {activeTab === 'projects' ? 'Project Management' : 'Member Management'}
              </h2>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'projects' ? (
              <div className="space-y-6 lg:space-y-8">
                <AddProject 
                  admin={admin} 
                  onProjectAdded={fetchProjects} 
                />

                {activeTab === 'projects' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    {/* All Projects Card */}
                    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">All Projects</p>
                          <h3 className="text-2xl font-bold text-gray-900">
                            {projects.length}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Showing {indexOfFirstProject + 1}-{Math.min(indexOfLastProject, projects.length)} of {projects.length}
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
                            {projects.filter(p => p.status === 'Pending').length}
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
                            {projects.filter(p => p.status === 'In Progress').length}
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
                            {projects.filter(p => p.status === 'Solved').length}
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {currentProjects.map((project) => (
                        <div key={project._id} 
                             className="bg-white hover:bg-orange-50/50 transition-duration-300 rounded-lg shadow-sm border border-gray-200 overflow-hidden
                                      hover:shadow-md transition-all duration-300 flex flex-col h-full">
                          {/* Image Section */}
                          <div className="relative w-full aspect-[16/9]">
                            <img
                              src={project.images?.[0] || '/default-project.jpg'}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                            <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium 
                              ${project.status === 'Solved' 
                                ? 'bg-gradient-to-r from-orange-500 to-orange-600' 
                                : project.status === 'In Progress' 
                                ? 'bg-gradient-to-r from-orange-400 to-orange-500' 
                                : 'bg-gradient-to-r from-orange-300 to-orange-400'} 
                              text-white flex items-center gap-1.5 shadow-sm`}
                            >
                              {getStatusIcon(project.status)}
                              <span>{project.status}</span>
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="flex flex-col flex-grow p-3">
                            {/* Project Details */}
                            <div className="flex-grow space-y-3">
                              {/* Title & Description */}
                              <div className="space-y-2">
                                <div className="flex flex-col">
                                  <span className="text-xs font-medium text-gray-500">Title</span>
                                  <h3 className="text-sm font-medium text-gray-900 break-words">
                                    {project.title}
                                  </h3>
                                </div>
                                
                                <div className="flex flex-col">
                                  <span className="text-xs font-medium text-gray-500">Description</span>
                                  <p className="text-xs text-gray-600 break-words">
                                    {project.description}
                                  </p>
                                </div>
                              </div>

                              {/* Location Details */}
                              <div className="grid grid-cols-2 gap-2">
                                {/* Village */}
                                <div className="flex flex-col">
                                  <span className="text-xs font-medium text-gray-500">Village</span>
                                  <span className="text-xs text-gray-600 break-words">
                                    {project.village}
                                  </span>
                                </div>
                                
                                {/* Mandal */}
                                <div className="flex flex-col">
                                  <span className="text-xs font-medium text-gray-500">Mandal</span>
                                  <span className="text-xs text-gray-600 break-words">
                                    {project.mandal}
                                  </span>
                                </div>
                                
                                {/* Constituency */}
                                <div className="flex flex-col">
                                  <span className="text-xs font-medium text-gray-500">Constituency</span>
                                  <span className="text-xs text-gray-600 break-words">
                                    {project.constituency}
                                  </span>
                                </div>
                                
                                {/* Sponsor */}
                                {project.sponsor && (
                                  <div className="flex flex-col">
                                    <span className="text-xs font-medium text-gray-500">Sponsor</span>
                                    <span className="text-xs text-gray-600 break-words">
                                      {project.sponsor}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Status Selector */}
                            <div className="pt-3 mt-3 border-t border-gray-100">
                              <div className="relative group">
                                <select
                                  value={project.status}
                                  onChange={(e) => handleStatusChange(project._id, e.target.value)}
                                  disabled={updateLoading}
                                  className={`w-full text-sm font-medium rounded-lg px-3 py-2
                                            appearance-none cursor-pointer transition-all duration-200
                                            bg-white border-2 text-gray-700
                                            ${updateLoading ? 'opacity-50 cursor-not-allowed' : ''}
                                            ${project.status === 'Solved' 
                                              ? 'border-primary hover:bg-orange-50' 
                                              : project.status === 'In Progress'
                                              ? 'border-yellow-400 hover:bg-yellow-50'
                                              : 'border-red-400 hover:bg-red-50'}
                                            focus:ring-2 focus:ring-offset-2 focus:outline-none
                                            ${project.status === 'Solved' 
                                              ? 'focus:ring-orange-500' 
                                              : project.status === 'In Progress'
                                              ? 'focus:ring-yellow-500'
                                              : 'focus:ring-red-500'}`}
                                  style={{
                                    backgroundImage: 'none' // Remove default arrow
                                  }}
                                >
                                  <option 
                                    value="Pending" 
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-red-50"
                                  >
                                    ⭕ Pending
                                  </option>
                                  <option 
                                    value="In Progress" 
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-yellow-50"
                                  >
                                    ⏳ In Progress
                                  </option>
                                  <option 
                                    value="Solved" 
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-orange-50"
                                  >
                                    ✅ Solved
                                  </option>
                                </select>
                                
                                {/* Custom dropdown arrow with animation */}
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                  <svg 
                                    className={`h-5 w-5 transition-transform duration-200 group-hover:rotate-180
                                               ${project.status === 'Solved' 
                                                 ? 'text-primary' 
                                                 : project.status === 'In Progress'
                                                 ? 'text-yellow-500'
                                                 : 'text-red-500'}`}
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                  >
                                    <path 
                                      fillRule="evenodd" 
                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                                      clipRule="evenodd" 
                                    />
                                  </svg>
                                </div>
                                
                                {/* Loading indicator */}
                                {updateLoading && (
                                  <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center">
                                    <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                    </div>

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
            ) : (
              <Members admin={admin} />
            )}
          </div>
        </main>
      </div>
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
    background: linear-gradient(to right, #FF9933, #FFA500);
    color: white;
  }

  select:disabled {
    opacity: 0.7;
    cursor: not-allowed;
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
