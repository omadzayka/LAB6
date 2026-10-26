import { useEffect, useReducer, useState } from "react";
import { fetchPosts } from "./api/postsApi.js";
import { postsReducer, initialState } from "./reducer/postsReducer.js";
import PostList from "./components/PostList.jsx";
import FilterForm from "./components/FilterForm.jsx";

function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const [filter, setFilter] = useState("");

  // Fetch once on mount. The effect (not the reducer) owns the async work.
  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      dispatch({ type: "FETCH_START" });
      try {
        const data = await fetchPosts(controller.signal);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        // An abort is expected on cleanup, not a real error.
        if (err.name === "AbortError") return;
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    }

    loadPosts();

    // Cleanup: cancel the in-flight request so nothing updates after unmount.
    return () => controller.abort();
  }, []);

  const { posts, loading, error } = state;

  // Derived state: computed during render, never stored.
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(filter.trim().toLowerCase())
  );

  let content;
  if (loading) {
    content = <p>Loading posts...</p>;
  } else if (error) {
    content = <p role="alert">Error: {error}</p>;
  } else if (filteredPosts.length === 0) {
    content = <p>No posts found.</p>;
  } else {
    content = <PostList posts={filteredPosts} />;
  }

  return (
    <main>
      <h1>Post Dashboard</h1>
      <FilterForm filter={filter} onFilterChange={setFilter} />
      {content}
    </main>
  );
}

export default App;
