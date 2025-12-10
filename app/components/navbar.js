'use client';
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex w-full justify-between items-center z-50 rounded-lg bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="w-full">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-32 h-24 max-w-full px-4">
            <a href="/#" className="block w-full py-5">
              <img src="1.png" alt="logo" className="w-full h-auto" />
            </a>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={`${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary-500 focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-primary-500"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-primary-500"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-primary-500"></span>
              </button>
              <nav
                id="navbarCollapse"
                className={`absolute right-4 z-50 top-full w-full max-w-[450px] rounded-lg bg-gray-900 text-white px-6 py-5 shadow-lg dark:bg-gray-800 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:bg-transparent lg:dark:bg-transparent lg:text-gray-900 lg:dark:text-white ${
                  !open && "hidden"
                } `}
              >
                <ul className="block lg:flex lg:items-center">
                  <ListItem NavLink="/#">Home</ListItem>
                  <ListItem NavLink="/playground">Work</ListItem>
                  <ListItem NavLink="/About">About</ListItem>
                  <ListItem NavLink="/Services ">What I do</ListItem>
                  <ListItem NavLink="/Blog">Blog</ListItem>
                </ul>
              </nav>
            </div>
            <div className="hidden justify-end items-center gap-4 pr-16 sm:flex lg:pr-0">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="relative inline-flex items-center h-6 w-11 rounded-full bg-gray-300 dark:bg-primary-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Toggle dark mode"
              >
                <span
                  className={`${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300`}
                />
                <span className="sr-only">Toggle dark mode</span>
              </button>

              <a
                href="/#"
                className="px-4 py-2 text-base font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Free Stuff
              </a>

              <a
                href="https://wa.me/254703666366"
                className="rounded-lg bg-primary-500 dark:bg-primary-600 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 dark:hover:bg-primary-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

const ListItem = ({ children, NavLink }) => {
  return (
    <li>
      <a
        href={NavLink}
        className="flex py-2 text-base font-medium hover:text-primary-500 dark:hover:text-primary-400 lg:ml-12 lg:inline-flex transition-colors"
      >
        {children}
      </a>
    </li>
  );
};
