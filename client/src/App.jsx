import React, { Children } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import BlogDetails from './pages/BlogDetails';
import CreatingBlog from './pages/CreatingBlog';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import YourBlog from './pages/YourBlog';
import Profile from './pages/Profile';
import Comments from './pages/Comments';
import SingleBlog from './pages/SingleBlog';
import Blog from './pages/Blog';
import Footer from './components/Footer';
import SearchList from './pages/SearchList';

const App = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900 bg-white text-gray-900 dark:text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<><Home /><Footer /></>} />
        <Route path="/blogs" element={<><Blog /><Footer/></>} />
        <Route path="/search" element={<><SearchList /><Footer/></>} />
        <Route path="/create" element={<CreatingBlog />} />
        <Route path="/about" element={<><About /><Footer/></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="your-blog" element={<YourBlog />} />
          <Route path="comments" element={<Comments />} />
          <Route path="write-blog" element={<CreatingBlog />} />
          <Route path="write-blog/:id" element={<BlogDetails />} />
        </Route>
      </Routes>

    </div>
  );
};

export default App;
