import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left */}
        {/* Logo and Description */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-pink-600 via-orange-500 to-yellow-400 rounded-lg text-white">
              Amal's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Welcome to Amal's Blog! Sign up with your email and password or
            Google.
          </p>
        </div>
        
        {/* Right */}
        {/* Sign Up Form */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your username"/>
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your email"/>
              <TextInput type="text" placeholder="name@company.com" id="email" />
            </div>
            <div>
              <Label value="Your password"/>
              <TextInput type="text" placeholder="Password" id="password" />
            </div>
            {/* Sign Up Button */}
            <Button gradientDuoTone='pinkToOrange' type='submit'>
              Sign Up
            </Button>
            <div className="flex gap-2 text-sm mt-5">
              <span>Have an account?</span>
              <Link to='/sign-in' className="text-blue-500">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
