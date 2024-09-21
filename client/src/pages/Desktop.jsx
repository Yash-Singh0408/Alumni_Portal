import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FaGraduationCap, FaBriefcase, FaCalendarAlt, FaUsers, FaUserGraduate, FaSchool, FaBars } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventList from '../components/EventList';
import StudentList from '../components/StudentList';
import AluminiList from '../components/AluminiList';
import List from '../components/List';


const Desktop = () => {
  const [activeComponent, setActiveComponent] = useState('events');
  const [alumni, setAlumni] = useState([]);
  const [events, setEvents] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchAlumni();
    fetchEvents();
  }, []);

  const fetchAlumni = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/getusers');
      const alumniList = response.data.filter(user => user.isAlumni).slice(0, 6);
      setAlumni(alumniList);
    } catch (error) {
      console.error("Error fetching alumni data:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/event/events');
      setEvents(response.data.slice(0, 4));
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'events':
        return <EventList events={events} />;
      case 'students':
        return <List />;
      case 'alumni':
        return <AluminiList />;
      case 'collegeStudents':
        return <StudentList collegeOnly={true} />;
      default:
        return <EventList events={events} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <Navbar />
      <div className="flex-grow">
        {/* Horizontal Sidebar */}
        <div className="bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <h2 className="text-2xl font-bold">Admin Dashboard</h2>
              <button 
                className="md:hidden text-gray-600 hover:text-gray-900"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <FaBars size={24} />
              </button>
            </div>
            <ul className={`flex flex-col md:flex-row md:space-x-4 ${isSidebarOpen ? 'block' : 'hidden md:flex'}`}>
              <SidebarItem icon={<FaCalendarAlt />} text="Events" onClick={() => setActiveComponent('events')} active={activeComponent === 'events'} />
              <SidebarItem icon={<FaUsers />} text="Students" onClick={() => setActiveComponent('students')} active={activeComponent === 'students'} />
              <SidebarItem icon={<FaUserGraduate />} text="Alumni" onClick={() => setActiveComponent('alumni')} active={activeComponent === 'alumni'} />
              <SidebarItem icon={<FaSchool />} text="College Students" onClick={() => setActiveComponent('collegeStudents')} active={activeComponent === 'collegeStudents'} />
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, Username!</h1>
            <p className="text-gray-600">Here&apos;s what&apos;s happening in your Alumni Network.</p>
          </div>
          {renderComponent()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const SidebarItem = ({ icon, text, onClick, active }) => (
  <li 
    className={`flex items-center p-2 rounded-lg cursor-pointer ${active ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
    onClick={onClick}
  >
    <span className="mr-2">{icon}</span>
    <span>{text}</span>
  </li>
);

SidebarItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

const QuickAccessButton = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 flex items-start">
    <div className="text-blue-500 text-3xl mr-4">{icon}</div>
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

QuickAccessButton.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

// Prop types for EventCard
const EventCard = ({ image, title, description, date, location }) => {
  const fallbackImage = '/Transparency.png';

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <img
        src={image || fallbackImage}
        alt={title}
        width={300}
        height={200}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-sm text-gray-500">{new Date(date).toLocaleDateString()} - {location}</p>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

const AlumniConnectionItem = ({ name, batch }) => (
  <div className="flex items-center justify-between py-2 border-b last:border-b-0">
    <div className="flex items-center">
      <div className="w-10 h-10 bg-teal-500 rounded-full mr-3"></div>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-600">{batch}</p>
      </div>
    </div>
    <button className="text-gray-400 hover:text-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
);

AlumniConnectionItem.propTypes = {
  name: PropTypes.string.isRequired,
  batch: PropTypes.string.isRequired,
};

export default Desktop;
