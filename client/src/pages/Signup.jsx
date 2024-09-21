import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const baseURL = "http://localhost:3000";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    skills: '',
    isAlumni: false, // new field
    working: false,
    workingAt: '',
    experience: '',
    description: '',
    yearOfPassing: '',
    course: '',
    batch: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
        skills: formData.skills.split(',').map((skill) => skill.trim()),
        yearOfPassing: parseInt(formData.yearOfPassing, 10),
      };

      const response = await axios.post(`${baseURL}/api/auth/signup`, updatedFormData);
      console.log(response.data);
      setSuccess(true);
      setError(null);

      navigate(`/login?email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}`);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'An error occurred');
      setSuccess(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900 drop-shadow-md">Sign Up</h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          Create your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 transition-all duration-300 ease-in-out hover:shadow-xl">
          {error && (
            <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded" role="alert">
              <p className="font-bold">Success</p>
              <p>Signup successful!</p>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-blue-800 border-2 rounded-md h-8"
                  />
                </div>
              </div>
              <div className="w-1/2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-8"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-8"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-8"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="skills"
                    name="skills"
                    type="text"
                    value={formData.skills}
                    onChange={handleChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-8"
                  />
                </div>
              </div>
              <div className="w-1/2">
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience (in years)</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="experience"
                    name="experience"
                    type="number"
                    value={formData.experience}
                    onChange={handleChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-8"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="isAlumni"
                name="isAlumni"
                type="checkbox"
                checked={formData.isAlumni}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isAlumni" className="ml-2 block text-sm text-gray-900">Are you an alumni?</label>
            </div>

            {formData.isAlumni && (
              <div className="flex items-center mt-4">
                <input
                  id="working"
                  name="working"
                  type="checkbox"
                  checked={formData.working}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="working" className="ml-2 block text-sm text-gray-900">Currently working?</label>
              </div>
            )}

            {formData.isAlumni && formData.working && (
              <div className="mt-4">
                <label htmlFor="workingAt" className="block text-sm font-medium text-gray-700">Working at / Company name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="workingAt"
                    name="workingAt"
                    type="text"
                    required={formData.working} // Only required if working is true
                    value={formData.workingAt}
                    onChange={handleChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-8"
                  />
                </div>
              </div>
            )}


            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="yearOfPassing" className="block text-sm font-medium text-gray-700">Year of Passing</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="yearOfPassing"
                    name="yearOfPassing"
                    type="text"
                    value={formData.yearOfPassing}
                    onChange={handleChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-8"
                  />
                </div>
              </div>
              <div className="w-1/2">
                <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="course"
                    name="course"
                    type="text"
                    value={formData.course}
                    onChange={handleChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-8"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-8"
                ></textarea>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>

            <div className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
