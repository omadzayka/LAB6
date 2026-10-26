// Data-fetching only: no JSX, no React imports.
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

// `signal` is optional; it lets the caller cancel the request (cleanup).
export async function fetchPosts(signal) {
  const response = await fetch(POSTS_URL, { signal });

  if (!response.ok) {
    throw new Error(`Failed to fetch posts (status ${response.status})`);
  }

  return response.json();
}
