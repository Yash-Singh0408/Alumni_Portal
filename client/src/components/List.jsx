import { useEffect, useState } from 'react'
import { Search, Menu, User } from 'lucide-react'
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

  // Fetch students data from the API
  useEffect(() => {
    fetch(`${baseURL}/api/auth/getusers`)
      .then((response) => response.json())
      .then((data) => {
        setStudents(data) // Assuming the API response is an array of students
      })
      .catch((error) => {
        console.error('Error fetching students:', error)
      })
  }, [])

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Students</h1>
        <div className="flex items-center">
          <div className="relative mr-2">
            <input
              type="text"
              placeholder="Search"
              className="w-full sm:w-auto pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <button className="p-2 bg-purple-600 text-white rounded-full">
            <Menu size={24} />
          </button>
        </div>
      </div>
      {/* Make table horizontally scrollable */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100 hidden sm:table-header-group">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Course</th>
              <th className="px-4 py-2 text-left">Batch</th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr
                  key={student._id}
                  className="border-t flex flex-col sm:table-row mb-4 sm:mb-0 bg-white rounded-lg sm:bg-transparent"
                >
                  <td className="px-4 py-2 flex items-center sm:table-cell">
                    <div className="flex items-center mb-2 sm:mb-0">
                      {/* Use dynamic colors for avatar */}
                      <div
                        className={`w-8 h-8 rounded-full ${
                          Object.values(avatarColors)[index % 3]
                        } flex items-center justify-center mr-2`}
                      >
                        <User className="text-white" size={16} />
                      </div>
                      {student.name}
                    </div>
                  </td>
                  <td className="px-4 py-2 sm:table-cell">{student.email}</td>
                  <td className="px-4 py-2 sm:table-cell">{student.course}</td>
                  <td className="px-4 py-2 sm:table-cell">{student.batch}</td>
                  <td className="px-4 py-2 sm:table-cell">
                    <button className="px-4 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                      Contact
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer/>
    </div>
    </>
  )
}
