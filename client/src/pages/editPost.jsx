import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:4000/post/' + id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
          setIsLoading(false);
        });
      });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }

    try {
      const response = await fetch('http://localhost:4000/post', {
        method: 'PUT',
        body: data,
        credentials: 'include',
      });

      if (response.ok) {
        setRedirect(true);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to={'/home/' + id} />
  }

  return <>
    {isLoading && (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
        <div className="text-white text-2xl">Updating post...</div>
      </div>
    )}

    <section className="write mt-6 container mx-auto min-h-screen">
      <div className="app max-sm:px-4">
        <h1 className='font-bold text-3xl my-2'><span className="text-accent font-bold">Updating</span>, Recipe!</h1>
        <p className=" text-md leading-6 text-gray-600 ">Change your information to whatever you like.</p>
        <form onSubmit={updatePost} className="lg:flex justify-around gap-28 mt-6">
          <div className="content flex flex-col basis-2/3">
            <label htmlFor="title" className='text-xl mb-3'>Title</label>
            <input type="text" className='p-2 bg-gray-200 mb-4 outline-blue-300 rounded' value={title}
              onChange={ev => setTitle(ev.target.value)}
              name="recipe-title" id="" required placeholder='Recipe Title' />
            <label htmlFor="title" className='text-xl mb-3'>Summary</label>
            <input type="text" className='p-2 bg-gray-200 mb-4 outline-blue-300 rounded'
              value={summary}
              onChange={ev => setSummary(ev.target.value)}
              name="recipe-title" id="" required placeholder='Recipe Summary' />
            <div className="editor h-[100%]">
              <label htmlFor="title" className='text-xl my-2'>Description</label>
              <ReactQuill theme="snow" value={content} onChange={newValue => setContent(newValue)} className='mb-6 h-[400px] overflow-scroll border-gray-500 ' />
            </div>
          </div>
          <div className="menu p-3 basis-1/3 bg-background">
            <div className="container-xl">
              <div className="item">
                <h1 className='text-center text-xl font-medium'>Publish</h1>
                <hr className="my-3" />
                <p>
                  <b>Status:</b> Draft
                </p> <br />
                <p>
                  <b>Visibility:</b> Public
                </p> <br />
                <div className="upload py-4">
                  <input type="file"
                    onChange={ev => setFiles(ev.target.files)} />
                </div>

                <div className="flex  my-3">
                  <button
                    type="submit"
                    className="p-2 bg-green-300 rounded hover:bg-green-500 duration-75"
                    disabled={isLoading} // Disable the button when isLoading is true
                  >
                    {isLoading ? 'Updating...' : 'Update Post'}
                  </button>
                </div>
              </div>
              <div className="item">
                <h1 className='text-center text-xl font-medium'>Category</h1>
                <hr className="my-3" />
                <div className="flex justify-between flex-col">
                  <div>
                    <input type="radio" name="cat" checked value={''} id="cooking" /> &nbsp;
                    <label htmlFor="cooking" className=' gap-6'>Cooking Tips</label>
                  </div>
                  <div>
                    <input type="radio" name="cat" value={''} id="ingredients" /> &nbsp;
                    <label htmlFor="ingredients" className=' gap-6'>Ingredients</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  </>
}
