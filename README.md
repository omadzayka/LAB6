What it does
Fetches posts from https://jsonplaceholder.typicode.com/posts when the app first loads.
Shows Loading posts..., a readable error message, or No posts found. depending on the state.
Filters posts by title using a controlled input.
Project structure
src/api/postsApi.js: the fetchPosts function (data fetching only).
src/reducer/postsReducer.js: the reducer that handles FETCH_START, FETCH_SUCCESS and FETCH_ERROR.
src/App.jsx: owns the state with useReducer, fetches data in useEffect, and filters posts during render.
src/components/: Post.jsx, PostList.jsx and FilterForm.jsx.
Reflection: the hardest part

Honestly, I didn't understand most of this assignment, and that was the hardest part for me. The concepts I found most confusing were:

How useReducer works and why it is used instead of several useState calls.
How useEffect runs the fetch on mount, and why the cleanup function (AbortController) is needed.
Why filtered posts are "derived state" and are calculated during render instead of being stored.

I got the app working, but I still need to go back over these topics and practice them until I can explain them in my own words.