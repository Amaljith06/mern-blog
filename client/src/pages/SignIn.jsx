import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUIn() {
  const [formData, setFormData] = useState({});
  const [error, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // update on changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Submit button functionality
  const handleSubmit = async (e) => {
    setLoading(true);
    setErrorMessage(null);
    e.preventDefault();
    // Unfilled from error
    if (!formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields!");
    }
    try {
      // Sending request to server
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      // response and error handling
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      // navigate user to Home page
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
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
            Welcome to Amal's Blog! Sign in with your email and password or
            Google.
          </p>
        </div>

        {/* Right */}
        {/* Sign In Form */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="**********"
                id="password"
                onChange={handleChange}
              />
            </div>

            {/* Sign In Button */}
            <Button
              gradientDuoTone="pinkToOrange"
              type="submit"
              disabled={loading}
            >
              {/* Loading Effect */}
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Sign Up Shortcut */}
            <div className="flex gap-2 text-sm mt-5">
              <span>Don't have an account?</span>
              <Link to="/sign-up" className="text-blue-500">
                Sign Up
              </Link>
            </div>

            {/* Error Message Alert*/}
            {error && (
              <Alert className="mt-5" color="failure">
                {error}
              </Alert>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
