import React, { useContext, useEffect, useState } from 'react'
import Tabs from '../components/Tabs'
import { UserContext } from "../userContext";
import { Link, Navigate, useNavigate } from 'react-router-dom';

import axios from 'axios';
import ProfileCard from '../components/profile-card';


function truncateSummary(summary) {
  const words = summary.split(' ');
  if (words.length > 2) {
    return words.slice(0, 2).join(' ') + '.....';
  }
  return summary;
}

const profile = () => {

  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    axios.get('http://localhost:4000/profile', { withCredentials: true })
      .then(response => {
        setUserInfo(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);


  const handleNameChange = () => {
    fetch('http://localhost:4000/user/profile', {
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
        navigate('/', { state: { updatedName: updatedUser.actualName } });
      })
      .catch((error) => {
        console.error(error);
      });
  };


  useEffect(() => {
    fetch('http://localhost:4000/user/profile', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
        setUserPosts(data.userPosts);
      })
      .catch((error) => {
        console.error(error);
        // Handle error and navigate if needed
        Navigate('/login');
      });
  }, [navigate]);

  return <>
    <div className="min-h-screen lg:px-6 px-4  app max-container flex flex-col">
      <div className="lg:flex md:flex justify-between mb-4 items-center">
        <h1 className='font-bold text-3xl my-6'>Hello, Welcome to your profile!</h1>
        <Tabs />
      </div>
      <div className="lg:flex ">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 my-4">
          <ProfileCard />
        </div>

      </div>





      <h1 className='flex gap-1 items-center py-3 text-xl lg:text-2xl font-semibold'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
        </svg>

        Your Posts
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white text-left text-sm text-text">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-2 font-medium text-gray-900">
                No:
              </th>
              <th scope="col" className="px-3 py-2 font-medium text-gray-900">
                Title
              </th>
              <th scope="col" className="px-3 py-2 font-medium text-gray-900">
                Description
              </th>
              <th scope="col" className="px-3 py-2 font-medium text-gray-900">
                Status
              </th>
              <th scope="col" className="px-3 py-2 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {userPosts.map((post, index) => (
              <tr key={post._id}>
                <td className="px-3 py-2">{index + 1}:</td>
                <td className="px-3 py-2 font-medium text-gray-900">{post.title}</td>
                <td className="px-3 py-2">{truncateSummary(post.summary)}</td>
                <td className="px-3 py-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    ok
                  </span>
                </td>
                <td className="px-3 py-2 text-center">
                  <Link to={`/home/${post._id}`} className="text-green-700">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
}

export default profile