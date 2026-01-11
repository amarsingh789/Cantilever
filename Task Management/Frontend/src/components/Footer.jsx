import React, { useState } from 'react';
import { Rocket, Send, Mail, MapPin } from 'lucide-react';
import 'remixicon/fonts/remixicon.css';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault(); // Page reload hone se rokta hai
    
    // Agar email khali hai to error dikhaye
    if (!email.trim()) {
      return toast.error("Please enter a valid email!");
    }

    // Success Notification
    toast.success("Subscribed successfully! 🚀");
    
    // Email field ko clear karein
    setEmail("");
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 px-6 md:px-12 lg:px-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* 1. Brand Section */}
          <div>
            <Link to="/home" className="flex items-center gap-2 text-2xl font-bold text-white mb-6">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              TaskPilot
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Streamline your workflow, track progress, and achieve your goals. 
              TaskPilot is the ultimate tool for modern teams and individuals.
            </p>
            <div className="space-y-3 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                    <Mail size={16} className="text-indigo-500" />
                    <span>support@taskpilot.com</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-indigo-500" />
                    <span>New Delhi, India</span>
                </div>
            </div>
          </div>

          {/* 2. Product Links */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Product</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="#" className="hover:text-indigo-400 transition-colors">Features</Link></li>
              <li><Link to="#" className="hover:text-indigo-400 transition-colors">Pricing</Link></li>
              <li><Link to="#" className="hover:text-indigo-400 transition-colors">Integrations</Link></li>
              <li><Link to="#" className="hover:text-indigo-400 transition-colors">Roadmap</Link></li>
            </ul>
          </div>

          {/* 3. Company Links */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="#" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-indigo-400 transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-indigo-400 transition-colors">Blog</Link></li>
              <li><Link to="#" className="hover:text-indigo-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* 4. Newsletter & Socials */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Stay Updated</h4>
            <p className="text-slate-400 text-sm mb-4">
              Subscribe to our newsletter for the latest features and updates.
            </p>
            
            {/* Newsletter Input - Form banaya taaki Enter press karne par submit ho */}
            <form 
              onSubmit={handleSubscribe} 
              className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-1 mb-8 focus-within:border-indigo-500 transition"
            >
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent w-full px-3 py-2 text-sm text-white focus:outline-none placeholder:text-slate-600"
                />
                <button 
                  type="submit" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md transition"
                >
                    <Send size={18} />
                </button>
            </form>

            {/* Social Icons */}
            <div className="flex gap-3">
              <SocialIcon icon={<i className="ri-instagram-line"></i>} />
              <SocialIcon icon={<i className="ri-twitter-x-line"></i>} />
              <SocialIcon icon={<i className="ri-linkedin-fill"></i>} />
              <SocialIcon icon={<i className="ri-github-fill"></i>} />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p className="flex items-center gap-1">
            <i className="ri-copyright-line"></i> 2026 TaskPilot. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-indigo-400 transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-indigo-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Component for Social Icons
const SocialIcon = ({ icon }) => (
    <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all cursor-pointer text-lg">
        {icon}
    </div>
);

export default Footer;