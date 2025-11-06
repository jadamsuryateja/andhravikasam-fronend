import { useState, useEffect } from 'react';
import { Loader2, CheckCircle, XCircle, Users } from 'lucide-react';

const API_URL = 'https://andhravikasam-server.onrender.com/api';

// Update the main container
function Members({ admin }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    fetchMembers();
  }, [filter]);

  const fetchMembers = async () => {
    try {
      const url = new URL(`${API_URL}/members`);
      url.searchParams.append('status', filter);
      if (admin.district) {
        url.searchParams.append('district', admin.district);
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
        }
      });
      
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (memberId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/members/${memberId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchMembers();
      }
    } catch (error) {
      console.error('Error updating member status:', error);
    }
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Member Management</h2>
            <p className="mt-1 text-sm text-gray-500">Manage and approve member requests</p>
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-white border border-orange-200 rounded-xl text-sm 
                     focus:ring-2 focus:ring-primary focus:border-primary
                     shadow-sm hover:border-primary transition-colors"
          >
            <option value="pending">Pending Approval</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-sm">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : members.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 lg:p-12">
          <div className="text-center max-w-sm mx-auto">
            <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center 
                          justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No members found</h3>
            <p className="text-gray-500">There are no members currently {filter}</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-orange-50">
                  <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 hidden sm:table-cell">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 hidden md:table-cell">District</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 hidden lg:table-cell">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {members.map((member) => (
                  <tr key={member._id} className="hover:bg-orange-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{member.name}</span>
                        <span className="text-sm text-gray-500 sm:hidden">{member.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell text-gray-600">{member.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell text-gray-600">{member.district}</td>
                    <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell text-gray-600">{member.contact}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                        ${member.status === 'approved' ? 'bg-green-100 text-green-800' :
                        member.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {member.status === 'pending' && (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleStatusChange(member._id, 'approved')}
                            className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 
                                     transition-colors"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(member._id, 'rejected')}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 
                                     transition-colors"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Members;