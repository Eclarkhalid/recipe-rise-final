import React, { useEffect, useState, useRef } from "react";
import Post from "../components/post";

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const uniquePostIds = useRef(new Set());

  const observer = useRef();

  const lastPostRef = (node) => {
    if (loading) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  };

  useEffect(() => {
    setLoading(true);

    fetch(`https://recipe-rise-final-api-full.onrender.com/post?page=${pageNumber}&limit=8`)
      .then((response) => response.json())
      .then((data) => {
        // Filter out duplicate posts based on ID
        const newPosts = data.filter((post) => !uniquePostIds.current.has(post.id));

        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setLoading(false);
        setHasMore(newPosts.length > 0);

        // Add new post IDs to the set
        newPosts.forEach((post) => uniquePostIds.current.add(post.id));
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [pageNumber]);

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

      {loading && !filteredPosts.length ? (
        <p className="text-center">Loading posts &#x1F604; ...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error fetching posts. Please try again later.</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-center">No matching posts available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mx-auto">
          {filteredPosts.map((post, index) => (
            <div key={post.id} ref={index === filteredPosts.length - 1 ? lastPostRef : null}>
              <Post {...post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
