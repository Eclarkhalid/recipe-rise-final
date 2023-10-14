import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

const Write = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [category, setCategory] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function createNewPost(ev) {
    setIsLoading(true);
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    data.set('categories', category);
    ev.preventDefault();
    const response = await fetch('https://recipe-rise-final-api-full.onrender.com/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setIsLoading(false);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/home'} />;
  }

  return <>
    {isLoading && (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
        <div className="text-white text-2xl">Creating post...</div>
      </div>
    )}


    <section className="write lg:px-5 min-h-screen container mx-auto">
      <div className="app max-sm:px-4">
        <h1 className='font-bold text-3xl my-2'><span className="text-accent font-bold">Create</span>, a Recipe!</h1>
        <p className=" text-md leading-6 text-gray-600 ">Fill all the required fields to post your recipe.</p>
        <form onSubmit={createNewPost} className="lg:flex justify-around gap-4">
          <div className="w-full lg:w-2/3 mt-6 bg-white rounded-lg shadow-lg">
            <label htmlFor="title" className="block text-xl mb-3 text-text font-semibold">Title</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-200 mb-4 outline-blue-300 rounded"
              value={title}
              onChange={ev => setTitle(ev.target.value)}
              name="recipe-title"
              required
              placeholder="Recipe Title"
            />

            <label htmlFor="summary" className="block text-xl mb-3 text-text font-semibold">Summary</label>
            <textarea
              type="text"
              className="w-full p-2 bg-gray-200 mb-4 outline-blue-300 rounded"
              value={summary}
              onChange={ev => setSummary(ev.target.value)}
              name="recipe-summary"
              required
              placeholder="Recipe Summary"
              rows={4}
            />

            <label htmlFor="content" className="block text-xl my-2 text-text font-semibold">Procedure</label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={newValue => setContent(newValue)}
              className="mb-6 h-[400px] overflow-scroll border-gray-500"
            />
          </div>

          <div className="w-full lg:w-1/3 p-6 bg-background rounded-lg shadow-lg">

            <div className="mb-6">
              <h1 className="text-center text-2xl font-semibold mb-2">Publish</h1>
              <hr className="border-t-2 my-3" />
              <p className="text-gray-700"><b>Status:</b> Draft</p>
              <p className="text-gray-700"><b>Visibility:</b> Public</p>
            </div>

            <div className="mb-6">
              <label className="block text-xl mb-2">Upload</label>
              <input
                type="file"
                onChange={ev => setFiles(ev.target.files)}
                required
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <h1 className="text-center text-2xl font-semibold mb-2">Category</h1>
              <hr className="border-t-2 my-3" />
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="cat"
                    value="Cooking Tips"
                    id="cooking"
                    checked={category === 'Cooking Tips'}
                    onChange={() => setCategory('Cooking Tips')}
                    className="mr-2"
                  />
                  <label htmlFor="cooking" className="text-gray-700">Cooking Tips</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="cat"
                    value="Ingredients"
                    id="ingredients"
                    checked={category === 'Ingredients'}
                    onChange={() => setCategory('Ingredients')}
                    className="mr-2"
                  />
                  <label htmlFor="ingredients" className="text-gray-700">Ingredients</label>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300">
                Create And Post
              </button>
            </div>

          </div>

        </form>
      </div>
    </section>
  </>
};

export default Write;
