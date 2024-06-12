'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ILink {
  title: string;
  path: string;
}

const links: ILink[] = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Contents',
    path: '/contents',
  },
  {
    title: 'About',
    path: '/about',
  },
  {
    title: 'Contact',
    path: '/contact',
  },
];

const Logo: FC = () => (
  <Link className="flex items-center" href="/">
    <Image
      alt="Starter Site"
      width="230"
      height="300"
      className="h-14 sm:h-20 w-auto"
      style={{ color: 'transparent' }}
      src="/logo.webp"
    />
    <p className="font-bold text-xl text-secondary-500 ml-3 mt-2">
      My Starter Site
    </p>
  </Link>
);

export const SiteHeader: FC = () => {
  // open / close mobile nav
  const [open, setOpen] = useState(false);
  return (
    <header className="relative w-full mx-auto bg-white px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10 w-full">
          <div className="md:w-0 md:flex-1">
            <Logo />
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button
              aria-label="Toggle Menu"
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              onClick={() => setOpen(!open)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <nav className="hidden md:flex space-x-10">
            {links.map(({ title, path }, index) => (
              <Link
                key={`nav-${index}`}
                className="text-base leading-6 font-medium text-secondary-500 transition duration-300 border-b-2 border-transparent hover:border-b-gray-700 hover:text-gray-500"
                href={path}
              >
                {title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div
        className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-20"
        style={{ display: open ? 'block' : 'none' }}
      >
        <div className="rounded-lg shadow-lg">
          <div className="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5 space-y-6">
              <div className="flex items-center justify-between ">
                <Logo />
                <button
                  aria-label="Toggle Menu"
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-300"
                  onClick={() => setOpen(!open)}
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <nav className="grid gap-y-8">
                {links.map(({ title, path }, index) => (
                  <Link
                    key={`nav-${index}`}
                    className="-m-3 p-3 flex items-center space-x-3 rounded-md transition duration-300"
                    href={path}
                    onClick={() => setOpen(false)}
                  >
                    <svg
                      className="flex-shrink-0 h-6 w-6 text-gray-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      ></path>
                    </svg>
                    <div className="text-base leading-6 font-medium text-gray-900">
                      {title}
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
