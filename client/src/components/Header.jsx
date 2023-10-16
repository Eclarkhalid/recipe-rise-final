import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserContext } from '../userContext';
import { VscAccount } from 'react-icons/vsc'

const Header = () => {
  const handleLinkClick = () => {
    alert('Authentication is still in progress. When You register, an account will be created but you wont be able to login. Please try again Later');
  };

  const { setUserInfo, userInfo } = useContext(UserContext);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }, []);

  useEffect(() => {
    fetch('https://recipe-rise-final-api-full.onrender.com/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const username = userInfo?.username;
  const location = useLocation();
  const active = 'text-blue-600 font-bold bg-green-200 p-2 rounded';
  const inactive = ' font-bold bg-gray-200 p-2 rounded'
  const profileActive = 'bg-green-200 p-1 rounded-full';
  const profileInactive = 'bg-slate-100 p-2 rounded-md';
  const navActive = 'font-bold text-green-600 underline'
  const navInactive = ' font-normal'

  return <>
    <header className={`bg-white text-text px-4 py-4 border-b fixed z-50 w-full top-0 ${isScrolled ? 'bg-green-100' : ''}`}>
      <div className="container mx-auto lg:px-4 md:px-6">
        <nav className="lg:flex md:flex  items-center justify-between hidden">

          {username && (
            <>
              <Link to={'/home'} className="text-2xl font-bold">
                <h1 className='text-xl md:text-xl lg:text-xl gap-1 flex items-center font-medium'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-primary">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
                  </svg>
                  <span className="text-text md:flex lg:flex">Recipe Rise</span>
                </h1>
              </Link>
              <div className="uppercase space-x-4">
                <Link className={`"text-slate-900 hover:text-slate-700 ${location.pathname === '/home' ? navActive : navInactive
                  }`} to={'/home'}>
                  Home
                </Link>
                <Link className={`"text-slate-900 hover:text-slate-700 ${location.pathname === '/globalApi' ? navActive : navInactive
                  }`} to={'globalApi'} >
                  Global Recipes
                </Link>
              </div>
              <div className="uppercase space-x-4">
                {location.pathname !== '/profile' && (
                  <Link className={`text-slate-900 hover:text-slate-700 ${location.pathname === '/write' ? active : inactive} `} to={'write'} >
                    Create
                  </Link>
                )}
                <Link className={`"text-slate-900 hover:text-slate-700  ${location.pathname === '/profile' ? navActive : navInactive
                  }`} to={'profile'} >
                  Profile
                </Link>
              </div>
            </>
          )}

          {!username && (
            <>
              <Link to={'/'} className="text-2xl font-bold">
                <h1 className='text-xl md:text-xl lg:text-xl gap-1 flex items-center font-medium'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-primary">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
                  </svg>
                  <span className="text-text  md:flex lg:flex">Recipe Rise</span>
                </h1>
              </Link>
              <div className="uppercase space-x-4">
                <Link className={`"text-slate-900 hover:text-slate-700 ${location.pathname === '/' ? navActive : navInactive
                  }`} to={'/'}>
                  Home
                </Link>
              </div>
              <div className=" space-x-4 ">
                <Link className={`"text-slate-900 hover:text-slate-700 font-bold text-md ${location.pathname === '' ? navActive : navInactive
                  }`} to={'login'}>
                  Sign In
                </Link>
                <Link className={`"text-primary hover:text-slate-700 font-bold text-md ${location.pathname === '' ? navActive : navInactive
                  }`} to={'register'} >
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </nav>
        <nav className="flex items-center justify-between w-full md:hidden lg:hidden mx-auto">
          <Link to={'/'} className="text-2xl font-bold">
            <h1 className='text-xl md:text-xl lg:text-xl gap-1 flex items-center font-medium'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-primary">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
              </svg>
              <span className="text-text  md:flex lg:flex">Recipe Rise</span>
            </h1>
          </Link>
          {username && (
            <>
              <div className="uppercase space-x-4">
                <Link className={`"text-slate-900 hover:text-slate-700 ${location.pathname === '/home' ? navActive : navInactive
                  }`} to={'/home'}>
                  Home
                </Link>
                <Link className={`"text-slate-900 hover:text-slate-700 ${location.pathname === '/globalApi' ? navActive : navInactive
                  }`} to={'globalApi'} >
                  Global
                </Link>
              </div>
              <div className="uppercase space-x-4  flex items-center">
                {location.pathname !== '/profile' && (
                  <Link className={`text-slate-900 hover:text-slate-700 rounded-full ${location.pathname === '/write' ? active : inactive} `} to={'write'} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </Link>
                )}
                <Link className={`text-slate-900 hover:text-slate-700 text-3xl rounded-full bg-blue-50  ${location.pathname === '/profile' ? profileActive : navInactive
                  }`} to={'profile'} >
                  <VscAccount />
                </Link>
              </div>
            </>
          )}

          {!username && (
            <>

              <div className="uppercase space-x-4 right-0">
                <Link
                  className={`text-slate-900 hover:text-slate-700`}
                  to={'register'}
                  onClick={handleLinkClick}
                >
                  Sign In/ Sign Up
                </Link>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  </>
}

export default Header