
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';

import axios from 'axios';

const ProfileCard = () => {

  const [user, setUser] = useState(null);

  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    axios.get('https://recipe-rise-final-api-full.onrender.com/profile', { withCredentials: true })
      .then(response => {
        setUserInfo(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);


  const handleNameChange = () => {
    fetch('https://recipe-rise-final-api-full.onrender.com/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ actualName: newName }),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        setUser(updatedUser);

        // Pass the updated name as a query parameter
        navigate('/post', { state: { updatedName: updatedUser.actualName } });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetch('https://recipe-rise-final-api-full.onrender.com/user/profile', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => {
        console.error(error);
        // Handle error and navigate if needed
        navigate('/login');
      });
  }, [navigate]);

  return <>
    {user && (
      <div>
        <div className="space-y-12">
          <div className="">
            <p className="mt-1 text-sm leading-6 text-gray-600 ">This information will be displayed publicly, so be careful what you share.</p>

            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="lg:flex md:flex items-center gap-2">
                <div class="col-span-full">
                  {/* <label for="photo" class="block text-sm font-medium leading-6 text-gray-900">Photo</label> */}
                  <div class="mt-2 flex items-center gap-x-3">
                    <svg class="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                    </svg>
                    {/* <button type="button" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button> */}
                  </div>
                </div>
                <form onSubmit={handleNameChange} className="sm:col-span-4">
                  {/* <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label> */}
                  <div className="mt-2 lg:flex md:flex gap-4 hidden">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-text sm:text-sm">RecipeRise.com/ </span>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-blue-400 placeholder:font-medium focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder={user.actualName || user.username}
                        onChange={(e) => setNewName(e.target.value)}
                        value={newName}
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Update
                    </button>
                  </div>

                  <div className="group mt-2 relative md:hidden lg:hidden flex items-center gap-6">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-text sm:text-sm">RecipeRise.com/ </span>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-accent placeholder:font-medium focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder={user.actualName || user.username}
                        onChange={(e) => setNewName(e.target.value)}
                        value={newName}
                      />
                    </div>
                    <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center px-2.5">
                      <button
                        type="submit"
                        className="rounded-md bg-white px-2.5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </form>

                {/* <div class="col-span-full">
              <label for="about" class="block text-sm font-medium leading-6 text-gray-900">About</label>
              <div class="mt-2">
                <textarea id="about" name="about" rows="3" class="b rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
              </div>
              <p class="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div> */}



              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </>;
}

export default ProfileCard
