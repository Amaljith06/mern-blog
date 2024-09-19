import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  Navbar,
  TextInput,
} from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice.js";

//Title, Logo, SearchBar, DarkMode
export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  return (
    <Navbar className="border-b-2">
      {/* Logo */}
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-pink-600 via-orange-500 to-yellow-400 rounded-lg text-white">
          Amal's
        </span>
        Blog
      </Link>

      {/* Search Bar */}
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>

      {/* Search Icon */}
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-2 md:order-2">
        {/* Dark Mode */}
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          { theme === 'light' ? <FaSun/> : <FaMoon/>}
        </Button>
        {currentUser ? (
          // if user is logged in
          <Dropdown
            arrowIcon={false}
            inline
            label={
              // Avatar
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            {/* Display username and email */}
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            {/* Profile Button */}
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            {/* Sign out Button */}
            <Dropdown.Divider />
            <DropdownItem>Sign out</DropdownItem>
          </Dropdown>
        ) : (
          // if user not logged in
          // Sign In
          <Link to="/sign-in">
            <Button gradientDuoTone="pinkToOrange" outline>
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>

      {/* Menu */}
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
