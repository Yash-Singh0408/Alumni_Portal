import { useEffect, useState } from 'react'
import { Search, Menu, User, ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const avatarColors = {
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
  teal: 'bg-teal-500',
}

export default function Students() {
  const [students, setStudents] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [courseFilter, setCourseFilter] = useState('')
  const [batchFilter, setBatchFilter] = useState('')
  const [courses, setCourses] = useState([])
  const [batches, setBatches] = useState([])

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:10000/api/auth/getusers');
      const data = await response.json();
  
      const studentData = data.filter(user => !user.isAlumni);
  
      setStudents(studentData);
  
      const uniqueCourses = [...new Set(studentData.map(student => student.course))];
      const uniqueBatches = [...new Set(studentData.map(student => student.batch))];
  
      setCourses(uniqueCourses);
      setBatches(uniqueBatches);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

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

  const handleContact = (email) => {
    window.location.href = `mailto:${email}`;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">Students</h1>
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
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Course</th>
                <th className="px-4 py-2 text-left">Batch</th>
                <th className="px-4 py-2 text-left">Skills</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.length > 0 ? (
                currentStudents.map((student, index) => (
                  <tr key={student._id} className="border-t">
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
                    <td className="px-4 py-2">{student.skills || 'Html, Css'}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleContact(student.email)}
                        className="px-4 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                      >
                        Contact
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-2 text-center">No students found.</td>
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
      <Footer />
    </>
  )
}