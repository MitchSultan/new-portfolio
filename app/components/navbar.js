'use client';
import React, { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex w-full justify-between items-center z-50 rounded-md shadow-paper border-b border-gray-200 transition-colors duration-300 bg-surface">
      <div className="w-full">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-32 h-24 max-w-full px-4">
            <a href="/#" className="block w-full py-5">
              <Image
                src="/logo.webp"
                alt="logo"
                width={128}
                height={96}
                className="w-full h-auto"
                priority
              />
            </a>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={`${open && "navbarTogglerActive"
                  } absolute right-4 top-1/2 block -translate-y-1/2 rounded-md px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-primary"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-primary"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-primary"></span>
              </button>
              <nav
                id="navbarCollapse"
                className={`absolute right-4 z-50 top-full w-full max-w-[450px] rounded-md bg-surface text-text px-6 py-5 shadow-paper lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:bg-transparent lg:text-text ${!open && "hidden"
                  } `}
              >
                <ul className="block p-6 lg:flex lg:items-center">
                  <ListItem NavLink="/#">Home</ListItem>
                  
                  <DropdownItem title="Work" NavLink="/playground">
                    <SubListItem NavLink="https://evolvesphereconsulting.com">Evolve Sphere</SubListItem>
                    <SubListItem NavLink="https://canvaspile.com">Canvas Pile</SubListItem>
                    <SubListItem NavLink="https://theotherguyske.org">The Other Guys</SubListItem>
                    <SubListItem NavLink="https://luxurybytina.com">Luxury by Tina</SubListItem>
                  </DropdownItem>

                  <ListItem NavLink="/About">About</ListItem>
                  
                  <DropdownItem title="What I do" NavLink="/Services">
                    <SubListItem NavLink="/Services/web-development">Web Development</SubListItem>
                    <SubListItem NavLink="/Services/web-design">Web Design</SubListItem>
                    <SubListItem NavLink="/Services/marketing">Marketing</SubListItem>
                    <SubListItem NavLink="/Services/seo">SEO & Audits</SubListItem>
                  </DropdownItem>

                  <ListItem NavLink="/Webaudits">Web Audits</ListItem>
                </ul>
              </nav>
            </div>
            <div className="hidden justify-end items-center gap-4 pr-16 sm:flex lg:pr-0">
              <a
                href="/#"
                className="px-4 py-2 text-base font-medium text-text hover:text-primary transition-colors"
              >
                Free Stuff
              </a>

              <a
                href="https://wa.me/254703666366"
                className="btn-primary"
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
        className="flex py-2 text-base font-medium hover:text-primary lg:ml-12 lg:inline-flex transition-colors"
      >
        {children}
      </a>
    </li>
  );
};

const DropdownItem = ({ title, NavLink, children }) => {
  return (
    <li className="relative group">
      <a
        href={NavLink}
        className="flex py-2 text-base font-medium hover:text-primary lg:ml-12 lg:inline-flex transition-colors items-center gap-1"
      >
        {title}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </a>
      <div className="absolute left-0 lg:left-12 top-full hidden group-hover:block z-50 pt-2 lg:pt-4">
        <ul className="bg-surface rounded-md shadow-paper border border-gray-200 py-2 min-w-[200px] flex flex-col">
          {children}
        </ul>
      </div>
    </li>
  );
};

const SubListItem = ({ children, NavLink }) => {
  return (
    <li>
      <a
        href={NavLink}
        className="block px-4 py-2 text-sm text-text hover:bg-neutral hover:text-primary transition-colors"
      >
        {children}
      </a>
    </li>
  );
};
