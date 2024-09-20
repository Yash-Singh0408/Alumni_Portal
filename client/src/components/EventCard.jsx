import React from 'react'
import { Search, ArrowRight } from 'lucide-react'

const EventCards = ({ eventName, username, timeAgo, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-sky-200"></div>
            <div className="ml-3">
              <h2 className="text-lg font-semibold text-gray-900">{eventName}</h2>
              <p className="text-sm text-gray-600">{username}</p>
              <p className="text-xs text-gray-500">{timeAgo}</p>
            </div>
          </div>
          <button className="px-4 py-1 text-sm font-semibold text-white bg-orange-400 rounded-full hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75">
            Contact
          </button>
        </div>
        <p className="mt-2 text-gray-600 text-sm">{description}</p>
        <div className="mt-4 bg-sky-50 h-40 flex items-center justify-center rounded-lg">
          <span className="text-gray-400">Image</span>
        </div>
      </div>
    </div>
  )
}

export default function EventCard() {
  const events = [
    {
      eventName: "Event Name",
      username: "Username",
      timeAgo: "20 hours ago",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
    },
    {
      eventName: "Event Name",
      username: "Username",
      timeAgo: "20 hours ago",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
    },
    {
      eventName: "Event Name",
      username: "Username",
      timeAgo: "20 hours ago",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
    },
    {
      eventName: "Event Name",
      username: "Username",
      timeAgo: "20 hours ago",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
    },
    {
      eventName: "Event Name",
      username: "Username",
      timeAgo: "20 hours ago",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
    },
    {
      eventName: "Event Name",
      username: "Username",
      timeAgo: "20 hours ago",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
    }
  ]

  return (
    <div className="min-h-screen bg-sky-50 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 lg:mb-0">Upcoming Events</h1>
          <div className="relative w-full lg:w-64">
            <input
              type="text"
              placeholder="Want to post an event?"
              className="w-full pl-10 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <button className="absolute right-2 top-2 bg-indigo-600 text-white p-1 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCards key={index} {...event} />
          ))}
        </div>
      </div>
    </div>
  )
}