import React from "react";

export default function About() {
  return (
    <div>
      <div className="min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto p-3 text-center">
          <h1 className="text-3xl text-gray-500 font-semibold text-center my-7">About Amal's Blog</h1>
          <div className="text-md text-gray-500 flex flex-col gap-6 ">
            <p>
              Welcome to Amal's Blog! This blog was developed by Amaljith Kumar as a part of learning web development.Through out this project, he has gained valuable insights into various aspects and best practices that every developer should be aware of. 
            </p>
            <p>
              On this blog, you'll find articles and tutorials on a variety of topics. So be sure to check back often for new content!
            </p>
            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well.Hope you enjoyed this project!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
