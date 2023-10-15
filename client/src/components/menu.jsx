import Post from "../components/post";
import RelatedPost from "./another"; // Import the RelatedPost component
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom

const Menu = () => {
  const [posts, setPosts] = useState([]);
  const { _id } = useParams(); // Get the _id from URL parameters

  useEffect(() => {
    // Fetch posts from the server
    fetch('https://recipe-rise-final-api-full.onrender.com/post')
      .then(response => response.json())
      .then(posts => {
        setPosts(posts);
      });
  }, []);

  // Filter out the currently selected post from the list of posts
  const relatedPosts = posts.filter(post => post._id !== _id);

  return (
    <section className="menu p-5">
      <div className="container-xl">
        <h1 className='text-2xl font-medium uppercase mb-3'>Other Recipes You may like</h1>
        <hr className='my-3' />
        {relatedPosts.length > 0 &&
          relatedPosts.slice(1, 6).map((post) => (
            <RelatedPost key={post._id} {...post} />
          ))}

      </div>
    </section>
  );
}

export default Menu;
