import React from 'react'
import {Instagram, Facebook, Twitter} from 'lucide-react'
import 'remixicon/fonts/remixicon.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6 md:px-12 lg:px-20 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* brand */}
          <div>
            <Link to="/home"
            className="text-2xl font-bold mb-6 block">
              MindStream
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Our mission is to equip modern explorers with cutting-edge, functional, and stylish bags that elevate every adventure.
            </p>
          </div>
          {/* About */}
          <div>
            <h4 className="font-bold mb-6 text-lg">About</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="#" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="#" className="hover:text-white transition">Career</Link></li>
              <li><Link to="#" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>
          {/* Support */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Support</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="#" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-white transition">Return</Link></li>
              <li><Link to="#" className="hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Get Updates</h4>
            <form action="" className="flex flex-col gap-4">
              <input type="email" placeholder="Enter your email"
              className="bg-[#1c1c1c] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"/>
              <button className="bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition">Subscribe</button>
            </form>
            <div className="flex gap-4 mt-6">
              <div className="w-8 h-8 rounded-full bg-[#1c1c1c] flex items-center justify-center hover:bg-white hover:text-black transition cursor-pointer"><Instagram strokeWidth={1.5} /></div>
              <div className="w-8 h-8 rounded-full bg-[#1c1c1c] flex items-center justify-center hover:bg-white hover:text-black transition cursor-pointer"><i class="ri-twitter-x-fill"></i></div>
              <div className="w-8 h-8 rounded-full bg-[#1c1c1c] flex items-center justify-center hover:bg-white hover:text-black transition cursor-pointer"><i class="ri-facebook-circle-line text-2xl"></i></div>
              <div className="w-8 h-8 rounded-full bg-[#1c1c1c] flex items-center justify-center hover:bg-white hover:text-black transition cursor-pointer"><i class="ri-threads-line text-xl"></i></div>
              <div className="w-8 h-8 rounded-full bg-[#1c1c1c] flex items-center justify-center hover:bg-white hover:text-black transition cursor-pointer"><i class="ri-tiktok-fill"></i></div>
            </div>
          </div>
        </div>
        <div className='border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500'>
          <p><i class="ri-copyright-line"></i>2025 MindStream. All rights reserved.</p>
          <div className='flex gap-6'>
            <Link to='#' className='hover:text-white'>Privacy Policy</Link>
            <Link to='#' className='hover:text-white'>Terms of Service</Link>
          </div>
        </div>
      </footer>
  )
}

export default Footer
