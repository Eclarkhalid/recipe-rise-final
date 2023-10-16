import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, Navigate, useLocation } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../userContext";
import user from '../images/user.jpg';
import Menu from '../components/menu';

export default function PostPage({ updatedAt }) {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const updatedName = searchParams.get("updatedName");

  useEffect(() => {
    const fetchPostInfo = async () => {
      try {
        const response = await fetch(`https://recipe-rise-final-api-full.onrender.com/post/${id}`);
        if (response.ok) {
          const postInfo = await response.json();
          setPostInfo(postInfo);

          // Determine if the post has been edited
          const createdAt = new Date(postInfo.createdAt);
          const updatedAt = new Date(updatedAt);
          setIsEdited(updatedAt > createdAt);
        } else if (response.status === 404) {
          // Handle case when post doesn't exist
          setRedirect(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostInfo();
  }, [id, updatedAt]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://recipe-rise-final-api-full.onrender.com/post/${postInfo._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        alert("Post deleted successfully!");
        setPostInfo(null);
        setRedirect(true);
      } else {
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      console.error(error);
    }

    closeModal();
  };

  if (redirect) {
    return <Navigate to="/home" />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!postInfo) return null;

  const createdAt = new Date(postInfo.createdAt);
  const updatedTimestamp = new Date(updatedAt);

  const formattedCreatedAt = createdAt.toLocaleString();
  const formattedUpdatedAt = updatedTimestamp.toLocaleString();

  // Determine which time to display based on isEdited state
  const timeToDisplay = isEdited ? formattedUpdatedAt : formattedCreatedAt;

  return (
    <div>
      <section className="single p-5 container min-h-screen mx-auto">
        <div className="app">
          <h1 className='font-bold max-sm:max-w-lg my-4 text-text text-3xl max-sm:text-4xl'>{postInfo.title}</h1>
          <div className="lg:flex justify-around">
            <div className="content w-full lg:w-2/3">
              <img
                src={postInfo.cover}
                alt="post-image"
                className="h-64 md:h-96 w-full object-cover object-center"
              />

              <div className="user-card bg-white p-4 shadow-md rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  {/* User Icon, Username, and Date Created */}
                  <div className="flex items-center mb-4 md:mb-0 space-x-4">
                    <img src={user} alt="" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <span className="font-medium text-green-900">{postInfo.author.username}</span>
                      <p className="text-text text-sm">
                        {isEdited ? "Last edited" : "Created"}: {timeToDisplay}
                      </p>
                    </div>
                  </div>

                  {/* Edit and Delete Buttons */}
                  {userInfo.id === postInfo.author._id && (
                    <div className="flex justify-around gap-6 flex-wrap md:flex-nowrap">
                      <Link to={`/edit/${postInfo._id}`}>
                        <button className="bg-slate-200 px-4 py-2 rounded-lg hover:bg-slate-400 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                          </svg>
                          Edit
                        </button>
                      </Link>
                      <button onClick={openModal} className="bg-red-200 px-4 py-2 rounded-lg hover:bg-red-400 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </svg>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <hr className='my-2' />

              <p className=" font-semibold my-4 max-sm:text-3xl">
                {postInfo.summary}
              </p>
              <p className='leading-8 text-justify font-medium max-sm:text-2xl' dangerouslySetInnerHTML={{ __html: postInfo.content }} />

              <hr className="my-2" />
              <div className="bg-slate-200 py-6 px-2">
                <h1 className="text-red-600 text-xl font-bold py-3">Comments</h1>
                <p className="text-slate-400">No comments available...</p>
              </div>
            </div>

            <div className="flex">
              <Menu />
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <h1 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this post?
              <p className="text-slate-400 text-lg my-2">This action is irreversible</p>
            </h1>
            <div className="flex justify-between">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Yes, delete post
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                No, go back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
