import { Button } from "flowbite-react";
import React from "react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Got something on your mind?</h2>
        <p className="text-gray-500 my-2">Contact us to add your blog post.</p>
        <Button
          gradientDuoTone="pinkToOrange"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSKkVXmSKnqfFNcrjwCPwwxrLXZNRHQJFgtkgZcMnzQgSdqhrGrJkTmqPBJMZvDjczplsnvb"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Us
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://edgy.app/wp-content/uploads/2020/04/personal-blog.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
