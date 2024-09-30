"use client"

import React, { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from './ChangeTheme';

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    setNavbarOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const getUserColor = (username?: string): (string|undefined) => {
    const colors = ['bg-indigo-500', 'bg-teal-500', 'bg-pink-500', 'bg-amber-500', 'bg-cyan-500'];
    if (!username) return colors[0];
    const index = username.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const userNameInitial = session?.user?.name?.charAt(0).toUpperCase() || 'U';

  const logout = async () => {
    try {
      await signOut({ callbackUrl: '/login' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="shadow-md sticky top-0 z-50 transition-all duration-300 ease-in-out bg-background/50 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-purple-500 hover:to-indigo-600 transition-all duration-900">
              <span>F</span>
              <span>eedbacker</span>
            </Link>
          </div>

          {/* Mode Toggle for Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />

            {session?.user ? (
              <div className="ml-3 relative">
                <button
                  type="button"
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${getUserColor(session.user.name)}`}>
                    {userNameInitial}
                  </div>
                </button>
                {dropdownOpen && (
                  <div className="dark:bg-gray-600  origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-2 text-xs dark:text-white text-gray-500">{session.user.email}</div>
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Dashboard</Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Sign out</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center md:ml-6 space-x-4">
                <Link href="/login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 dark:bg-indigo-700 dark:hover:bg-indigo-800">
                  Login
                </Link>
                <Link href="/register" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                  Sign Up
                </Link>
              </div>
            )}  
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className={`${navbarOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`${navbarOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${navbarOpen ? 'block' : 'hidden'} md:hidden`}>
        
        {/* Mode Toggle for Mobile */}
        <div className="px-4 py-3 border-t border-gray-200">
          <ModeToggle />
        </div>

        <div className="pt-4 pb-3 border-t border-gray-200">
          {session?.user ? (
            <div className="flex items-center px-5">
              <div className={`flex-shrink-0 h-10 w-10 rounded-full ${getUserColor(session.user.name)} flex items-center justify-center`}>
                <span className="text-white font-medium">{userNameInitial}</span>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{session.user.name}</div>
                <div className="text-sm font-medium text-gray-500">{session.user.email}</div>
              </div>
            </div>
          ) : (
            <div className="mt-3 space-y-1 ">
              <Link href="/login" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Login</Link>
              <Link href="/register" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;