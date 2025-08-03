import React from 'react';
import { Link } from "react-router-dom";
import { Button } from './ui/button';
import heroImg from "../assets/blog2.png";

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center justify-between gap-10 min-h-[80vh]">
        
        {/* Text Section */}
        <div className="max-w-2xl text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white mb-6">
            Explore the Latest <br className="hidden md:block" /> Tech & Web Trends
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl mb-8 leading-relaxed">
            Stay ahead with in-depth articles, tutorials, and insights on web development, digital marketing, and tech innovations.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <Link to="/dashboard/write-blog">
              <Button size="lg" className="text-lg px-6 py-3">Get Started</Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="text-lg px-6 py-3 border-gray-300 dark:border-gray-600">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center md:justify-end">
          <img 
            src={heroImg} 
            alt="Tech Illustration" 
            className="w-[90%] sm:w-[450px] md:w-[550px] object-contain drop-shadow-xl" 
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
