import React from 'react'
import user from '../images/cake.png'
import img from '../images/recipe7.jpg'
import Menu from '../components/menu'

const banner = () => {
  return <>
    <section className="single p-5 app">
      <div className="container-xl">
        <div className="lg:flex justify-around">
          <div className="content w-full lg:w-2/3 p-3">
            <img
              src={img}
              alt="post-image"
              className="h-64 md:h-96 w-full object-cover"
            />

            <div className="user-card bg-white p-4 shadow-md rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                {/* User Icon, Username, and Date Created */}
                <div className="flex items-center mb-4 md:mb-0 space-x-4">
                  <img src={user} alt="" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <span className="font-medium text-green-900">Recipe Rise</span>
                    <p className="text-text text-sm">
                      7 Days ago
                    </p>
                  </div>
                </div>
              </div>
            </div>


            <hr className='my-2' />
            <h1 className='font-bold max-w-lg my-2'>Roasted Vegetable Quinoa Salad</h1>
            <p className='leading-8 text-justify'>Content</p>

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
  </>
}

export default banner