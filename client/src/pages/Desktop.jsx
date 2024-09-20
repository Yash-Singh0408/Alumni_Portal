import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FaGraduationCap, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Desktop = () => {
  const [alumni, setAlumni] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch users data from API
    axios.get('http://localhost:3000/api/auth/getusers')
      .then((response) => {
        console.log("users", response.data)
        // Filter only alumni
        const alumniList = response.data.filter(user => user.isAlumni);
        // Set the top 6 alumni
        setAlumni(alumniList.slice(0, 6));
      })
      .catch((error) => {
        console.error("Error fetching alumni data:", error);
      });

    // Fetch top 4 events
    axios.get('http://localhost:3000/api/event/events')
      .then(response => {
        console.log("events", response.data)
        const eventData = response.data.slice(0, 4);
        setEvents(eventData);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-blue-50 min-h-screen p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Good Morning, Username!</h1>
              <p className="text-gray-600">Welcome back to the Alumni Network! Here&apos;s what&apos;s happening today.</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center">
              <img
                src="/placeholder.svg"
                alt="User Avatar"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="ml-3">
                <p className="font-semibold">Welcome back</p>
                <p className="text-lg font-bold">User Name here</p>
                <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm">View Profile</button>
              </div>
            </div>
          </header>

          {/* Quick Access Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <QuickAccessButton
              icon={<FaGraduationCap />}
              title="Connect with Alumni"
              description="Search the directory to reconnect with old friends and make new connections."
            />
            <QuickAccessButton
              icon={<FaBriefcase />}
              title="Career Opportunities"
              description="Access a job board with exclusive listings from top companies for alumni."
            />
            <QuickAccessButton
              icon={<FaCalendarAlt />}
              title="Attend Events"
              description="Stay updated on upcoming events, webinars, and networking opportunities."
            />
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Upcoming Events */}
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {events.length > 0 ? (
                  events.map((event, index) => (
                    <EventCard
                      key={index}
                      image={event.eventImg ? event.eventImg : "/images/Transparency.png"}
                      title={event.title}
                      description={event.description}
                      date={event.date}
                      location={event.location}
                    />
                  ))
                ) : (
                  <p>No events yet</p>
                )}
              </div>
            </div>

            {/* Alumni Connections */}
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-bold mb-4">Alumni Connections</h2>
              <div className="bg-white rounded-lg shadow-sm p-4">
                {alumni.length > 0 ? (
                  alumni.map((alumnus, index) => (
                    <AlumniConnectionItem
                      key={index}
                      name={alumnus.name}
                      batch={alumnus.batch}
                    />
                  ))
                ) : (
                  <p>No alumni found</p>
                )}
                <button className="w-full mt-4 bg-teal-500 text-white px-4 py-2 rounded-full text-sm">View More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Prop types for QuickAccessButton
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
  // Fallback image
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

// Prop types for AlumniConnectionItem
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
