import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard'; // Import EventCard component
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    handleSearchAndFilter();
  }, [searchQuery, filterDate, events]);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/event/events', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data); // Initialize filtered events
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterDateChange = (e) => {
    setFilterDate(e.target.value);
  };

  const handleSearchAndFilter = () => {
    let filtered = events;
    if (searchQuery) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterDate) {
      filtered = filtered.filter((event) => event.eventdate === filterDate);
    }
    setFilteredEvents(filtered);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-sky-50 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>
        <div className="flex flex-col lg:flex-row justify-between mb-8">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search events by name"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-4 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={filterDate}
              onChange={handleFilterDateChange}
              className="w-full pl-4 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              eventName={event.title}
              eventdate={event.eventdate}
              description={event.description}
              imageUrl={event.imageUrl}
              createdBy={event.createdBy} // Pass event creator ID
            />
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
