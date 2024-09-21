import { useEffect, useState } from 'react';
import { Search, User, ChevronLeft, ChevronRight, Check, X, Filter } from 'lucide-react';
import Footer from './Footer';
import Navbar from './Navbar';

const avatarColors = {
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
  teal: 'bg-teal-500',
};

export default function AlumniList() {
  const [alumni, setAlumni] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAlumni, setEditingAlumni] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [courseFilter, setCourseFilter] = useState('');
  const [batchFilter, setBatchFilter] = useState('');
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    fetchAlumni();
  }, [alumni]);

  const fetchAlumni = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/getusers');
      const data = await response.json();
      
      // Filter out alumni based on the isAlumni field
      const alumniData = data.filter(alumnus => alumnus.isAlumni);
  
      setAlumni(alumniData);
  
      const uniqueCourses = [...new Set(alumniData.map(alumnus => alumnus.course))];
      const uniqueBatches = [...new Set(alumniData.map(alumnus => alumnus.batch))];
      
      setCourses(uniqueCourses);
      setBatches(uniqueBatches);
    } catch (error) {
      console.error('Error fetching alumni:', error);
    }
  };
  

  const filteredAlumni = alumni.filter(alumnus =>
    alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (courseFilter === '' || alumnus.course === courseFilter) &&
    (batchFilter === '' || alumnus.batch === batchFilter)
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentAlumni = filteredAlumni.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredAlumni.length / rowsPerPage);

  const nextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const toggleVerification = async (alumnusId, isAdminVerified) => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/verify/${alumnusId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAdminVerified }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update verification status');
      }
  
      const data = await response.json();
      console.log('Verification updated:', data);
  
      setAlumni(prevAlumni => 
        prevAlumni.map(alumnus =>
          alumnus._id === alumnusId
            ? { ...alumnus, isAdminVerified: !alumnus.isAdminVerified }
            : alumnus
        )
      );
    } catch (error) {
      console.error('Error updating verification:', error);
    }
  };

  const handleEdit = (alumnus) => {
    setEditingAlumni(alumnus);
    setIsEditModalOpen(true);
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/auth/student/${editingAlumni._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingAlumni),
      });

      if (!response.ok) {
        throw new Error('Failed to update alumni');
      }

      const updatedAlumni = await response.json();
      setAlumni(prevAlumni =>
        prevAlumni.map(alumnus =>
          alumnus._id === updatedAlumni._id ? updatedAlumni : alumnus
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating alumni:', error);
    }
  }

  const handleDelete = async (alumnusId) => {
    if (window.confirm('Are you sure you want to delete this alumni?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/auth/student/${alumnusId}`, {
          method: 'POST',
        });

        if (!response.ok) {
          throw new Error('Failed to delete alumni');
        }

        setAlumni(prevAlumni => prevAlumni.filter(alumnus => alumnus._id !== alumnusId));
      } catch (error) {
        console.error('Error deleting alumni:', error);
      }
    }
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">Alumni</h1>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name"
                className="w-full sm:w-auto pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="border rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="">All Courses</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
            <select
              value={batchFilter}
              onChange={(e) => setBatchFilter(e.target.value)}
              className="border rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="">All Batches</option>
              {batches.map(batch => (
                <option key={batch} value={batch}>{batch}</option>
              ))}
            </select>
            <button className="p-2 bg-purple-600 text-white rounded-full">
              <Filter size={24} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Alumni ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Course</th>
                <th className="px-4 py-2 text-left">Batch</th>
                <th className="px-4 py-2 text-left">Verified</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAlumni.length > 0 ? (
                currentAlumni.map((alumnus, index) => (
                  <tr key={alumnus._id} className="border-t">
                    <td className="px-4 py-2">{alumnus._id}</td>
                    <td className="px-4 py-2 flex items-center">
                      <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full ${Object.values(avatarColors)[index % 3]} flex items-center justify-center mr-2 flex-shrink-0`}>
                          <User className="text-white" size={16} />
                        </div>
                        {alumnus.name}
                      </div>
                    </td>
                    <td className="px-4 py-2">{alumnus.email}</td>
                    <td className="px-4 py-2">{alumnus.course}</td>
                    <td className="px-4 py-2">{alumnus.batch}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => toggleVerification(alumnus._id, alumnus.isAdminVerified)}
                        className={`p-1 rounded-full ${alumnus.isAdminVerified ? 'bg-green-500' : 'bg-red-500'}`}
                      >
                        {alumnus.isAdminVerified ? <Check className="text-white" size={16} /> : <X className="text-white" size={16} />}
                      </button>
                    </td>
                    <td className="px-4 py-2 flex space-x-2">
                      <button onClick={() => handleEdit(alumnus)} className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(alumnus._id)} className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-2 text-center">No alumni found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded-md px-2 py-1"
            >
              <option value={10}>10 rows</option>
              <option value={50}>50 rows</option>
            </select>
          </div>
          <div className="flex items-center">
            <button onClick={prevPage} disabled={currentPage === 1} className="mr-2 p-1 border rounded-md disabled:opacity-50">
              <ChevronLeft size={20} />
            </button>
            <span>{currentPage} of {totalPages}</span>
            <button onClick={nextPage} disabled={currentPage === totalPages} className="ml-2 p-1 border rounded-md disabled:opacity-50">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Alumni</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editingAlumni.name}
                  onChange={(e) => setEditingAlumni({ ...editingAlumni, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={editingAlumni.email}
                  onChange={(e) => setEditingAlumni({ ...editingAlumni, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Course</label>
                <input
                  type="text"
                  value={editingAlumni.course}
                  onChange={(e) => setEditingAlumni({ ...editingAlumni, course: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Batch</label>
                <input
                  type="text"
                  value={editingAlumni.batch}
                  onChange={(e) => setEditingAlumni({ ...editingAlumni, batch: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
}
