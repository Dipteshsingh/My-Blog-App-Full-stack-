import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "@/components/Hero";
import RecentBlogs from "@/components/RecentBlogs";
import PopularAuthor from "@/components/PopularAuthor";
import Footer from "@/components/Footer";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs/get-published-blogs",{withCredentials:true});
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="pt-20">
      <Hero />
      <RecentBlogs />
      <PopularAuthor />
    </div>
  );
};

export default Home;
