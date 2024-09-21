import React from 'react'
import { User, Edit, Trash2 } from 'lucide-react'

export default function EventCard({
  eventName,
  username,
  eventdate,
  description,
  imageUrl,
  createdBy, // New prop for event creator ID
  userId, // New prop for current user ID
  isAdmin, // New prop for admin check
  onEdit, // Function to handle edit
  onDelete, // Function to handle delete
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-blue-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-sky-200 flex items-center justify-center">
              <User className="text-sky-500" size={20} />
            </div>
            <div className="ml-3">
              <h2 className="text-lg font-semibold text-gray-900">{eventName}</h2>
              <p className="text-sm text-gray-600">{username}</p>
              <p className="text-xs text-gray-500">{eventdate}</p>
            </div>
          </div>
          <button className="px-4 py-1 text-sm font-semibold text-white bg-orange-400 rounded-full hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75">
            Contact
          </button>
        </div>
        <p className="mt-2 text-gray-600 text-sm">{description}</p>
        <div className="mt-4 bg-sky-50 h-40 flex items-center justify-center rounded-lg overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl ? imageUrl : '/images/Transparency.png'} alt={eventName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400">Image</span>
          )}
        </div>
        {(isAdmin || userId === createdBy) && (
          <div className="mt-4 flex justify-end space-x-2">
            <button onClick={onEdit} className="p-2 text-blue-600 hover:text-blue-800">
              <Edit size={20} />
            </button>
            <button onClick={onDelete} className="p-2 text-red-600 hover:text-red-800">
              <Trash2 size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
