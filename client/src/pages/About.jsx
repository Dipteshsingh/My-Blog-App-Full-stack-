import React from 'react';
import aboutImg from "../assets/About-blog.avif";

const About = () => {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-6 lg:px-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            About <span className="text-red-500">Our Blog</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            A space for thinkers, storytellers, and creators to connect, learn, and inspire.
          </p>
        </div>

        {/* Image + Text Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src={aboutImg}
            alt="Blog Illustration"
            className="w-full h-80 object-cover rounded-xl shadow-xl border border-gray-200 dark:border-gray-700"
          />
          <div className="space-y-5 text-gray-700 dark:text-gray-300">
            <p className="text-base md:text-lg leading-relaxed">
              Welcome to our Blog App – a modern publishing platform for writers and readers alike.
              Whether you're here to share your experiences or explore others' perspectives,
              this community is designed to help you grow and connect.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Our mission is to empower every individual to express themselves freely, 
              creatively, and fearlessly. We offer a clutter-free space with simple, 
              intuitive tools to write, publish, and engage.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Thank you for being a part of this growing community. 
              Let’s write the future together.
            </p>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="mt-16 text-center">
          <blockquote className="text-2xl italic text-gray-500 dark:text-gray-400">
            "Words are powerful. Use them to inspire."
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default About;
