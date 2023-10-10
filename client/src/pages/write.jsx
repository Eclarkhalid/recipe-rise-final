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
    const response = await fetch('http://localhost:4000/post', {
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


    <section className="write lg:px-5 min-h-screen">
      <div className="container-xl app">
        <form onSubmit={createNewPost} className="lg:flex justify-around gap-4">
          <div className="w-full lg:w-2/3 p-4 bg-white rounded-lg shadow-lg">
            <label htmlFor="title" className="block text-xl mb-3">Title</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-200 mb-4 outline-blue-300 rounded"
              value={title}
              onChange={ev => setTitle(ev.target.value)}
              name="recipe-title"
              required
              placeholder="Recipe Title"
            />

            <label htmlFor="summary" className="block text-xl mb-3">Summary</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-200 mb-4 outline-blue-300 rounded"
              value={summary}
              onChange={ev => setSummary(ev.target.value)}
              name="recipe-summary"
              required
              placeholder="Recipe Summary"
            />

            <label htmlFor="content" className="block text-xl my-2">Description</label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={newValue => setContent(newValue)}
              className="mb-6 h-[300px] overflow-scroll border-gray-500"
            />
          </div>

          <div className="w-full lg:w-1/3 p-4 bg-white rounded-lg shadow-lg">
            <div className="mb-4">
              <h1 className="text-center text-xl font-medium">Publish</h1>
              <hr className="my-3" />
              <p><b>Status:</b> Draft</p>
              <p><b>Visibility:</b> Public</p>
            </div>

            <div className="mb-4">
              <label className="block text-xl">Upload</label>
              <input
                type="file"
                onChange={ev => setFiles(ev.target.files)}
                required
              />
            </div>

            <div className="mb-4">
              <h1 className="text-center text-xl font-medium">Category</h1>
              <hr className="my-3" />
              <div className="flex justify-between flex-col">
                <div>
                  <input
                    type="radio"
                    name="cat"
                    value="Cooking Tips"
                    id="cooking"
                    checked={category === 'Cooking Tips'}
                    onChange={() => setCategory('Cooking Tips')}
                  />
                  <label htmlFor="cooking" className="ml-2">Cooking Tips</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="cat"
                    value="Ingredients"
                    id="ingredients"
                    checked={category === 'Ingredients'}
                    onChange={() => setCategory('Ingredients')}
                  />
                  <label htmlFor="ingredients" className="ml-2">Ingredients</label>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button className="p-2 bg-green-300 rounded hover:bg-green-500 duration-75">
                Create Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </>
};

export default Write;
