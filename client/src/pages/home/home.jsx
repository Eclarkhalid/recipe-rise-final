import React from 'react'

import topImg from '../../images/recipe7.jpg'
import { Link } from 'react-router-dom'
import Posts from '../../pages/Posts'


const Home = () => {
  return <>
    <section className="w-full  min-h-screen container mx-auto my-20">
      <main className="px-6">
      <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Trending Recipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                alt="Top Story Image"
                className="w-full h-64 object-cover object-center rounded-lg"
                height="400"
                src={topImg}
                width="600"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-2">Roasted Vegetable Quinoa Salad</h3>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mb-4">
              Spaghetti Carbonara is a classic Italian pasta dish known for its rich, creamy sauce made with eggs, cheese, pancetta, and black pepper. It's a delicious and comforting meal that's surprisingly easy to make.
              </p>
              <div>
              <Link to={'/banner'}  class=" rounded-lg border border-green-500 bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-green-700 hover:bg-green-700 focus:ring focus:ring-green-200 disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300">Read More</Link>
              </div>
            </div>
          </div>
        </section>
        <h2 className="text-2xl font-bold my-4">All Recipes</h2>
        <hr className="my-2" />
        <Posts />
      </main>
      

    </section>
  </>
}

export default Home