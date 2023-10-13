import React, { useEffect, useState } from 'react'
import RecipeList from '../components/RecipeList'

const GlobalApi = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    searchRecipes(query); // Call searchRecipes with the current query
  };

  const searchRecipes = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=de71274385354176a7f96c7a86e5f807&query=${query}`
      );

      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    searchRecipes(''); // Initialize with an empty query
  }, []);

  return (
    <div className=" min-h-screen my-20 max-container px-3">
      <header className="w-full flex justify-center items-center flex-col">
        <h1 className="head_text">
          Search For Global&nbsp;
          <br className='max-md:hidden' /><span className='orange_gradient'>Recipes</span>
        </h1>
        <h2 className='desc'>
          Explore a world of global flavors with our API-powered recipe search. From Italian pasta to Indian curry, discover diverse culinary delights.
        </h2>
      </header>
      <div className="mt-16 w-full">
        <div className="mx-auto max-w-xl">
          <form onSubmit={handleSearch}>
            <div className="group relative flex items-center gap-6">
              <input
                type="text"
                id="example9"
                className="block w-full rounded-md p-4 px-10  shadow-sm shadow-teal-300 transition-all hover:bg-gray-50 focus:border-green-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-text"
                placeholder="Search Here..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2.5 text-text">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center px-2.5">
                <button
                  type="submit"
                  className="rounded-lg border border-green-500 bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-green-700 hover:bg-green-700 focus:ring focus:ring-green-200 disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 sm:gap-4 gap-4 max-sm:bg-background">
          <RecipeList recipes={recipes} />
        </div>
      </div>
    </div>
  );
}

export default GlobalApi