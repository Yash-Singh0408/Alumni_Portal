import { useEffect, useState } from 'react'
import { Search, Menu, User, ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const avatarColors = {
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
  teal: 'bg-teal-500',
}

export default function Alumini() {
  const [alumni, setAlumni] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [courseFilter, setCourseFilter] = useState('')
  const [batchFilter, setBatchFilter] = useState('')
  const [courses, setCourses] = useState([])
  const [batches, setBatches] = useState([])

  useEffect(() => {
    fetchAlumni()
  }, [])

  const fetchAlumni = async () => {
    try {
      const response = await fetch('http://localhost:10000/api/auth/getusers');
      const data = await response.json();
  
      // Filter only alumni data
      const alumniData = data.filter(user => user.isAlumni);
  
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
  )

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentAlumni = filteredAlumni.slice(indexOfFirstRow, indexOfLastRow)
  const totalPages = Math.ceil(filteredAlumni.length / rowsPerPage)

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
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Course</th>
                <th className="px-4 py-2 text-left">Batch</th>
                <th className="px-4 py-2 text-left">Skills</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAlumni.length > 0 ? (
                currentAlumni.map((alumnus, index) => (
                  <tr key={alumnus._id} className="border-t">
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
                    <td className="px-4 py-2">{alumnus.skills || 'N/A'}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleContact(alumnus.email)}
                        className="px-4 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                      >
                        Contact
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-2 text-center">No alumni found.</td>
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
