import React from 'react'

const PopularRecipes = ({ imgURL, name, author }) => {
  return <>
    {/* <div className="flex justify-center items-center flex-1 flex-col w-full max-sm:w-full">
      <div className=" bg-gradient-to-l from-teal-100 to-slate-300 rounded">
        <img src={imgURL} alt={name} className='w-[280px] h-[280px] object-contain' fil />
      </div>
      <div className="mt-8 flex flex-col justify-start gap-2.5">
        <h3 className="mt-1 text-2xl leading-normal font-semibold font-palanquin">{name}</h3>
        <p className="mt-1 font-semibold font-satoshi text-accent text-2xl leading-normal">{author}</p>
      </div>
    </div> */}


    <div class="relative mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
      <div>
        <img src={imgURL} alt={name} class="w-full object-cover" />
      </div>
      <div class="absolute inset-0 z-10 bg-gradient-to-t from-black"></div>
      <div class="absolute inset-x-0 bottom-0 z-20 p-4">
        <p class="mb-1 text-sm text-white text-opacity-80">{author} • <time>18 Sep 2023</time></p>
        <h3 class="text-xl font-medium text-white">{name}</h3>
      </div>
    </div>

  </>
}

export default PopularRecipes