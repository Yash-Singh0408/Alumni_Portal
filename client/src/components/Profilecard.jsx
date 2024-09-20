export default function Profilecard() {
    return (
      <div className="max-w-xs mx-auto bg-white rounded-2xl shadow-md p-6">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
            <img
              src="/placeholder.svg?height=96&width=96"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-gray-600 text-sm mb-1">Welcome back</p>
          <h2 className="text-xl font-bold mb-4">User Name here</h2>
          <button className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700 transition duration-300">
            View Profile
          </button>
        </div>
      </div>
    )
  }