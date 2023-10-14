import React, { useEffect, useState } from "react";
import Post from "../components/post";

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  useEffect(() => {
    fetch("https://recipe-rise-final-api-full.onrender.com/post")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Apply search and author filter here
    const filtered = posts
      .filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((post) => selectedAuthor === "" || post.author.username === selectedAuthor);

    setFilteredPosts(filtered);
  }, [searchQuery, selectedAuthor, posts]);

  // Categorize authors as "popular" or "new"
  const categorizedAuthors = posts.reduce((acc, post) => {
    if (post.author.username in acc) {
      acc[post.author.username].count++;
    } else {
      acc[post.author.username] = {
        count: 1,
        category: post.author.postCount > 1 ? "popular" : "new",
      };
    }
    return acc;
  }, {});




  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-accent text-text rounded-md p-2 w-full md:w-[400px] outline-blue-600 mb-2 md:mb-0"
        />
        <select
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
          className="border border-accent text-text rounded-md p-2 cursor-pointer outline-blue-400 w-full md:w-auto"
        >
          <option value="">All Authors</option>
          {Object.keys(categorizedAuthors).map((author) => (
            <option key={author} value={author} className="p-2 text-md">
              {author} ({categorizedAuthors[author].category})
            </option>
          ))}
        </select>
      </div>
      <hr className="my-2" />

      {loading ? (
        <p className="text-center">Loading posts &#x1F604; ...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error fetching posts. Please try again later.</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-center">No matching posts available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mx-auto">
          {filteredPosts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      )}
    </div>
  );
}
