import React from 'react'
import { Link } from 'react-router-dom'
import banner from './images/banner3.png'
import banner2 from './images/banner4.png'
import banner3 from './images/recipe19.jpg'
import PopularRecipes from './components/PopularRecipes'

import { recipes, reviews, services } from './constants'
import ServiceCard from './components/ServiceCard'
import ReviewCard from './components/ReviewCard'
import offer from "./images/offer.jpg";

const App = () => {
  return <>
    <main className="relative">
      <section className='xl:padding-l wide-padding-r padding-b my-14'>
        <div className=" w-full flex xl:flex-row md:flex-row flex-col justify-center min-h-screen gap-10 md:gap-2 max-container">
          <div className="relative xl:w-2/5 md:w-3/5 flex flex-col justify-center items-start w-full max-xl:padding-x">
            <p className='text-xl font-satoshi text-accent my-4'>All Meal Recipes</p>
            <h1 className='mt-4 font-palanquin  text-4xl xl:text-7xl 2xl:text-8xl  max-sm:text-[64px] max-sm:leading-[82px] font-bold text-text z-20 '>
              <span className=' xl:bg-white xl:whitespace-nowrap relative   pr-10'>The Most Recent</span>

              <br />
              <span className='text-accent inline-block mt-3'>Meal </span> Recipes
            </h1>
            <p className=' font-satoshi  text-lg leading-8 mt-6 mb-14 max-w-lg text-text'>Explore a world of global flavors with our API-powered recipe search. From Italian pasta to Indian curry, discover diverse culinary delights.
            </p>
            <div className='flex gap-4 items-center'>
              <Link to={'/globalApi'}>
                <button type="button" class="inline-flex items-center gap-1.5 rounded-lg border border-secondary bg-secondary px-5 py-2.5 text-center text-sm font-medium text-text shadow-sm transition-all hover:border-secondary hover:bg-secondary focus:ring focus:ring-secondary disabled:cursor-not-allowed disabled:border-secondary disabled:bg-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hidden lg:flex">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  Global Recipes
                </button>
              </Link>
              <Link to={'/home'}>
                <button type="button" class="inline-flex items-center gap-1.5 rounded-lg border border-primary bg-primary px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary hover:bg-primary focus:ring focus:ring-primary disabled:cursor-not-allowed disabled:border-primary disabled:bg-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hidden lg:flex">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
                  </svg>

                  Explore Our Recipes
                </button>
              </Link>
            </div>

            <div className="flex justify-start items-start flex-wrap w-full mt-20 gap-16">
              <p className='text-lg font-bold font-palanquin text-accent'>An account will be needed to be able to upload recipes </p>
            </div>
          </div>

          <div className='relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-gradient-to-b from-green-300 to-orange-50 bg-cover bg-center'>
            <img src={banner} alt="shoe collection" width={610} height={500} className='object-contain relative z-10' />
          </div>
        </div >
      </section>

      <section className="padding-x  max-container flex justify-center flex-wrap gap-9 bg-background p-6">
        {services.map((service) => (
          <ServiceCard key={service.label} {...service} />
        ))}
      </section>

      <section
        className='padding '
      >

        <div className="max-container max-sm:mt-12" id="products">
          <div className="flex flex-col justify-start gap-5">
            <h2 className='text-4xl font-palanquin font-bold'>Our Popular <span className="text-accent">Recipes</span></h2>
            <p className=' lg:max-w-lg text-text mt-2 font-satoshi'>
              Explore a world of global flavors with our API-powered recipe search. From Italian pasta to Indian curry, discover diverse culinary delights.
            </p>
          </div>

          <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-4">
            {recipes.map((recipes) => (
              <PopularRecipes key={recipes.name} {...recipes} />
            ))}
          </div>
        </div>
      </section>

      <section className="padding flex justify-between items-center max-lg:flex-col gap-10 w-full max-container">
        <div className="flex flex-1 flex-col">
          <h2 className='mt-5 font-satoshi text-4xl capitalize lg:max-w-lg font-bold'>
            <span className=' xl:bg-white xl:whitespace-nowrap relative z-10 pr-10'>Prepare <span className='text-accent inline-block mt-3'>The Best </span>
              <br />
              <span className='text-accent inline-block mt-3'>Meals</span>
            </span>
          </h2>
          <p className='mt-4 lg:max-w-lg info-text'>Explore a world of top-tier cuisine and delicious dishes. Uncover high-quality recipes meticulously crafted to elevate both your culinary skills and taste buds. Discover the latest culinary trends and indulge in unbeatable flavor and presentation. Join the culinary community today.</p>
          <p className='mt-6 lg:max-w-lg info-text'>
            Immerse yourself in our newest collections, delivering unparalleled flavor and unrivaled presentation. Become a part of the culinary community today and experience the pinnacle of culinary excellence.
          </p>
        </div>

        <div className="flex-1 flex justify-center items-center  rounded-md">
          <img src={banner3} alt="shoe8" width={570} height={522} className='object-contain' fill />
        </div>
      </section>

      

      <section className='flex justify-between items-center max-xl:flex-col-reverse mb-10 gap-10 max-container p-6'>
        <div className='flex-1'>
          <img
            src={offer}
            alt='Recipe Inspiration'
            width={773}
            height={687}
            className='object-contain w-full'
          />
        </div>
        <div className='flex flex-1 flex-col'>
          <h2 className='text-4xl font-palanquin font-bold'>
            <span className='text-primary'>Search API </span> for
            Recipes
          </h2>
          <p className='mt-4 info-text'>
            Find the perfect recipe for any occasion with our powerful recipes API search. With over 2 million recipes to choose from, you're sure to find something to satisfy your taste buds.
          </p>
          <p className='mt-6 info-text'>
            Our search is easy to use and provides a variety of filtering options, so you can find the perfect recipe quickly and easily. Whether you're looking for a specific dish, cuisine, or dietary restriction, we have you covered.
          </p>

          <Link to={'/register'} className='mt-11 flex flex-wrap gap-4'>
            <button type="button" className="rounded-md bg-primary px-4 py-2 text-white font-bold">Search Recipes</button>
          </Link>
        </div>
      </section>


      <section className="bg-secondary padding max-container">
        <h3 className='font-inter text-center text-4xl font-bold'>
          What Our
          <span className='text-accent'> Users </span>
          Say?
        </h3>
        <p className='m-auto mt-4 max-w-lg  text-center info-text'>
          Hear genuine stories from our satisfied users about their
          exceptional experiences with us.
        </p>


        <div className='mt-24 flex flex-1 justify-evenly items-center max-lg:flex-col gap-14'>
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              imgURL={review.imgURL}
              customerName={review.customerName}
              feedback={review.feedback}
            />
          ))}
        </div>
      </section >

      <section className="padding-x sm:py-32 py-16 w-full max-container flex justify-between items-center max-lg:flex-col gap-10">
        <h3 className='text-4xl leading-[68px] lg:max-w-md font-palanquin font-bold'>
          Sign Up for
          <span className='text-primary'> Updates </span>& Newsletter
        </h3>
        <div className='lg:max-w-[40%] w-full flex items-center max-sm:flex-col gap-5 p-2.5 sm:border sm:border-text rounded-full'>
          <input type='text' placeholder='subscribe@Recipe-rise.com' className='input' />
          <div className='flex max-sm:justify-center  items-center max-sm:w-full'>
            <button type="button" class="inline-flex items-center gap-1.5 rounded-lg border border-primary bg-primary px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary hover:bg-primary focus:ring focus:ring-primary disabled:cursor-not-allowed disabled:border-primary disabled:bg-primary">

              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>

  </>
}

export default App