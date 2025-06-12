import React from 'react';

const Logo = ({ className = "w-8 h-8", textClassName = "text-2xl" }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className={`${className} bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300`}>
        <div className="relative">
          {/* Flow Icon */}
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            <path d="M8 12l2 2 6-6" stroke="currentColor" strokeWidth="1" fill="none"/>
          </svg>
          {/* Flow Sparkle */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
        </div>
      </div>
      <span className={`${textClassName} font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
        TranscriptFlow
      </span>
    </div>
  );
};

export default Logo;