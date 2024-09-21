import { useEffect, useState } from 'react'
import { Search, Menu, User, ChevronLeft, ChevronRight, Check, X, Filter } from 'lucide-react'
import Footer from './Footer'
import Navbar from './Navbar'

const baseURL = "http://localhost:3000";

const avatarColors = {
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
  teal: 'bg-teal-500',
}

export default function List() {
  const [students, setStudents] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingStudent, setEditingStudent] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [courseFilter, setCourseFilter] = useState('')
  const [batchFilter, setBatchFilter] = useState('')
  const [courses, setCourses] = useState([])
  const [batches, setBatches] = useState([])

  useEffect(() => {
    fetchStudents()
  }, [students])

  const fetchStudents = () => {
    fetch('http://localhost:3000/api/auth/getusers')
      .then((response) => response.json())
      .then((data) => {
        setStudents(data)
        // Extract unique courses and batches
        const uniqueCourses = [...new Set(data.map(student => student.course))]
        const uniqueBatches = [...new Set(data.map(student => student.batch))]
        setCourses(uniqueCourses)
        setBatches(uniqueBatches)
      })
      .catch((error) => {
        console.error('Error fetching students:', error)
      })
  }

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (courseFilter === '' || student.course === courseFilter) &&
    (batchFilter === '' || student.batch === batchFilter)
  )

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentStudents = filteredStudents.slice(indexOfFirstRow, indexOfLastRow)
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage)

  const nextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const prevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const toggleVerification = async (studentId, isAdminVerified) => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/verify/${studentId}`, {
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

      setStudents(prevStudents =>
        prevStudents.map(student =>
          student._id === studentId
            ? { ...student, isAdminVerified: !student.isAdminVerified }
            : student
        )
      );
    } catch (error) {
      console.error('Error updating verification:', error);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student)
    setIsEditModalOpen(true)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:3000/api/auth/student/${editingStudent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingStudent),
      })

      if (!response.ok) {
        throw new Error('Failed to update user')
      }

      const updatedStudent = await response.json()
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student._id === updatedStudent._id ? updatedStudent : student
        )
      )
      setIsEditModalOpen(false)
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const handleDelete = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/auth/student/${studentId}`, {
          method: 'POST',
        })

        if (!response.ok) {
          throw new Error('Failed to delete user')
        }

        setStudents(prevStudents => prevStudents.filter(student => student._id !== studentId))
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">Students</h1>

          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-center w-full max-w-6xl mx-auto px-4 py-4">
            {/* Search Input */}
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search by name"
                className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>

            {/* Course Filter */}
            <div className="w-full md:w-1/4">
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="">All Courses</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>

            {/* Batch Filter */}
            <div className="w-full md:w-1/4">
              <select
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="">All Batches</option>
                {batches.map(batch => (
                  <option key={batch} value={batch}>{batch}</option>
                ))}
              </select>
            </div>

            {/* Filter Button */}
            <div className="flex justify-center md:justify-end w-full md:w-auto">
              <button className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-150 ease-in-out">
                <Filter size={24} />
              </button>
            </div>
          </div>






        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Student ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Course</th>
                <th className="px-4 py-2 text-left">Batch</th>
                <th className="px-4 py-2 text-left">Verified</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.length > 0 ? (
                currentStudents.map((student, index) => (
                  <tr key={student._id} className="border-t">
                    <td className="px-4 py-2">{student._id}</td>
                    <td className="px-4 py-2 flex items-center">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full ${Object.values(avatarColors)[index % 3]} flex items-center justify-center mr-2 flex-shrink-0`}>
                          <User className="text-white" size={16} />
                        </div>
                        {student.name}
                      </div>
                    </td>
                    <td className="px-4 py-2">{student.email}</td>
                    <td className="px-4 py-2">{student.course}</td>
                    <td className="px-4 py-2">{student.batch}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => toggleVerification(student._id, student.isAdminVerified)}
                        className={`p-1 rounded-full ${student.isAdminVerified ? 'bg-green-500' : 'bg-red-500'}`}
                      >
                        {student.isAdminVerified ? <Check className="text-white" size={16} /> : <X className="text-white" size={16} />}
                      </button>
                    </td>
                    <td className="px-4 py-2 flex space-x-2">
                      <button onClick={() => handleEdit(student)} className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(student._id)} className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-2 text-center">No students found.</td>
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
                setRowsPerPage(Number(e.target.value))
                setCurrentPage(1)
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
            <h2 className="text-2xl font-bold mb-4">Edit Student</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={editingStudent.email}
                  onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Course</label>
                <input
                  type="text"
                  value={editingStudent.course}
                  onChange={(e) => setEditingStudent({ ...editingStudent, course: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Batch</label>
                <input
                  type="text"
                  value={editingStudent.batch}
                  onChange={(e) => setEditingStudent({ ...editingStudent, batch: e.target.value })}
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
  )
}
