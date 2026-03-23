import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, UserCircle, LogOut, Mail, Phone, Bot, Languages, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();
  const displayName = user?.name || 'User';
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const languageButtonLabel = language === 'en' ? 'हिंदी' : 'English';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileToggle = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const handleLogoutClick = () => {
    setIsProfileOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          <div 
            className="flex-shrink-0 -ml-20 flex items-center gap-3 cursor-pointer group" 
            onClick={() => navigate('/welcome')}
          >
            <div className="bg-blue-50 p-2 rounded-lg transition-colors group-hover:bg-blue-100">
              <Bot className="w-6 h-6 text-blue-600" />
            </div>

            <h1 className="text-2xl font-bold text-blue-600 tracking-tight">
              Sarthi AI
            </h1>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4" />
              <span>{languageButtonLabel}</span>
            </button>
            
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
              <span>{t('upgradePro')}</span>
            </button>

            {/* User Profile Section */}
            <div ref={profileRef} className="relative flex items-center gap-2 pl-2 md:pl-4 md:border-l border-gray-200">
              <span className="text-sm font-medium text-gray-700 hidden md:block">
                {displayName}
              </span>
              <button
                type="button"
                onClick={handleProfileToggle}
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Open profile menu"
              >
                <UserCircle className="w-8 h-8 text-gray-400 hover:text-gray-600 transition-colors" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-12 w-72 rounded-xl border border-gray-200 bg-white shadow-xl p-4 z-50">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">{t('profile')}</h3>

                  <div className="space-y-2 text-sm text-gray-700">
                    <div>
                      <span className="font-medium text-gray-900">{t('nameLabel')}: </span>
                      <span>{user?.name || t('notAvailable')}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="truncate">{user?.email || t('notAvailable')}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{user?.phone || t('notAvailable')}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                      <Gift className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium text-gray-900">{user?.referralPoints || 0} {t('points') || 'Points'}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      navigate('/referral');
                      setIsProfileOpen(false);
                    }}
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    <Gift className="w-4 h-4" />
                    {t('viewReferrals')}
                  </button>

                  <button
                    type="button"
                    onClick={handleLogoutClick}
                    className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    {t('logout')}
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;