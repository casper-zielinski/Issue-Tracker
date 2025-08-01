"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { VscEditSession } from "react-icons/vsc";

const Nav = () => {
  const currentPath = usePathname();

  return (
    <div className="navbar bg-sky-700 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/Dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/Issues">Issues</Link>
            </li>
          </ul>
        </div>
        <div
          className={
            currentPath === "/"
              ? "m-3 border-5 bg-gray-900 border-gray-900 shadow rounded"
              : "m-3 border-5 border-sky-700 hover:bg-gray-900  hover:border-gray-900 hover:shadow-2xl rounded"
          }
        >
          <Link href="/">
            <VscEditSession />
          </Link>
        </div>
        <Link
          className={
            currentPath === "/"
              ? "bg-gray-900 border-1 border-gray-900 btn btn-ghost text-xl rounded-2xl"
              : "border-1 border-sky-700 btn btn-ghost text-xl rounded-2xl"
          }
          href="/"
        >
          Issue Tracker
        </Link>
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex space-x-2">
            <li>
              <Link
                href="/Dashboard"
                className={
                  currentPath === "/Dashboard"
                    ? "bg-gray-900 border-1 border-gray-900"
                    : "border-1 border-sky-700"
                }
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/Issues"
                className={
                  currentPath === "/Issues"
                    ? "bg-gray-900 border-1 border-gray-900"
                    : "border-1 border-sky-700"
                }
              >
                Issues
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
