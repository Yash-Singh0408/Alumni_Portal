import React, {useState} from 'react'
import { ArrowRight, Users, Key, Search, Users2 } from 'lucide-react'
import Footer from '../components/Footer'
import {useNavigate} from 'react-router-dom'

function Home() {
const navigate =useNavigate();

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-4">
      <header className="flex justify-between items-center mb-8 px-8">
        <div className=" text-2xl font-bold">ALUMNI</div>
        <div className="flex gap-2 items-center">
          <button onClick={()=> navigate('/login')} className="text-sm font-medium text-gray-600 hover:text-gray-800">Login</button>
          <button onClick={()=> navigate('/signup')} className="text-sm font-medium bg-purple-100 text-purple-800 px-3 py-1 rounded-full hover:bg-purple-200">Sign up</button>
        </div>
      </header>

      <div className="bg-purple-100 rounded-full py-2 px-4 mb-8 flex items-center justify-center w-full max-w-lg mx-auto">
        <p className="text-purple-800 text-xs sm:text-sm font-medium">
          Reconnect, Grow, and Thrive – Join Your Alumni Network Today!
        </p>
        <ArrowRight className="w-4 h-4 ml-2 text-purple-800" />
      </div>

      <main className="text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Join the exclusive alumni network of your alma mater and stay connected with fellow graduates!
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-2xl mx-auto">
          Our portal makes it incredibly easy for new users to sign up and begin enjoying all the benefits of the
          alumni community in just a few steps.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mb-16 justify-center">
          <button
            onClick={() => navigate('/signup')}
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Sign up Now
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-gray-800 px-8 py-3 rounded-full text-lg font-semibold border border-gray-300 hover:bg-gray-100 transition duration-300"
          >
            Login
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-14  px-0 lg:px-10">
          <FeatureCard icon={<Users className="w-8 h-8 sm:w-12 sm:h-12 md:h-auto md:w-auto " />} title="Connect & Communicate" discription="Easily reach out to alumni via personalized emails. Stay in touch, share updates, and build meaningful professional connections." />
          <FeatureCard icon={<Key className="w-8 h-8 sm:w-12 sm:h-12 md:h-auto md:w-auto" />} title="Opportunities Hub" discription="Stay updated with the latest events, internships, and job opportunities. A dedicated space to explore career paths and professional growth." />
          <FeatureCard icon={<Search className="w-8 h-8 sm:w-12 sm:h-12 md:h-auto md:w-auto" />} title="Discover Alumni" discription="Quickly find and connect with alumni through an intuitive search feature. Filter by batch, department, location, and more to expand your network." />
          <FeatureCard icon={<Users2 className="w-8 h-8 sm:w-12 sm:h-12 md:h-auto md:w-auto" />} title="Strengthen the Community" discription=" Foster a vibrant community where students and alumni can share experiences, mentor each other, and collaborate on projects and events." />
        </div>
      </main>
    <Footer/>
    </div>
    </>
  )
}

function FeatureCard({ icon, title,discription }) {
  return (
    <div className="bg-white p-6 rounded-lg  flex flex-col items-center shadow-[0px_0px_25px_-1px_rgba(0,0,0,0.25)]">
      <div className="mb-2 text-blue-600">{icon}</div>
      <h3 className="text-sm sm:text-base font-semibold text-center">{title}</h3>
      <p className="text-xs sm:text-sm font-normal text-center pt-2 lg:pt-4 text-gray-700 ">{discription}</p>
    </div>
  )
}

export default Home