// RecipeList.js
import React from 'react';

const RecipeList = ({ recipes }) => {
  return <>
    {recipes.map((recipe) => (
      <div key={recipe.id} className="flex justify-center items-center flex-1 flex-col w-full max-sm:w-full">
        <div className="shadow-md rounded">
          <img src={recipe.image} alt={recipe.title} className='w-[280px] h-[280px] object-contain' fill />

          <div className=" flex-col justify-start gap-2.5">
            <h3 className=" text-sm  leading-normal font-semibold font-palanquin" >
              {recipe.title}
            </h3>

          </div>
        </div>


      </div>
    ))}


  </>
};

export default RecipeList;