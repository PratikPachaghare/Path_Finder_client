import React from 'react';
import { Sparkles, UserCircle, Compass } from 'lucide-react'; // Added Compass for the logo
import { useNavigate } from 'react-router-dom';

const Header = ({ user }) => {
  const navigate = useNavigate();
  const displayName = user?.name || 'User';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* --- LOGO SECTION START --- */}
          <div 
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            {/* Logo Icon Container */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-lg shadow-md group-hover:shadow-indigo-500/30 transition-all duration-300">
              <Compass className="w-6 h-6 text-white" />
            </div>
            
            {/* Logo Text */}
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight group-hover:text-indigo-700 transition-colors">
              Career Guidance
            </h1>
          </div>
          {/* --- LOGO SECTION END --- */}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Upgrade Button */}
            <button 
              onClick={() => navigate('/pricing')}
              className="
                group
                hidden sm:flex items-center gap-2 
                bg-gradient-to-r from-violet-600 to-indigo-600 
                hover:from-violet-500 hover:to-indigo-500 
                text-white 
                px-5 py-2.5 
                rounded-full 
                font-semibold 
                text-sm 
                shadow-lg shadow-indigo-500/20 
                transition-all duration-200 
                hover:scale-105 
                active:scale-95
              "
            >
              <Sparkles className="w-4 h-4 text-yellow-300 group-hover:rotate-12 transition-transform" />
              <span>Upgrade Pro</span>
            </button>

            {/* User Profile Section */}
            <div className="flex items-center gap-2 pl-2 md:pl-4 md:border-l border-gray-200">
              <span className="text-sm font-medium text-gray-700 hidden md:block">
                {displayName}
              </span>
              <UserCircle className="w-8 h-8 text-gray-400" />
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;