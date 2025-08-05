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
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
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
            className="menu menu-sm dropdown-content bg-sky-300 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link
                href="/Dashboard"
                className={currentPath === "/Dashboard" ? "bg-white" : ""}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/Issues"
                className={currentPath === "/Issues" ? "bg-white" : ""}
              >
                Issues
              </Link>
            </li>
          </ul>
        </div>
        <div
          className={
            currentPath === "/"
              ? "m-3 border-5 bg-white border-white shadow rounded"
              : "m-3 border-5 border-sky-700 hover:bg-sky-500  hover:border-sky-500 hover:shadow-2xl rounded"
          }
        >
          <Link href="/">
            <VscEditSession
              className={
                currentPath === "/"
                  ? "text-black"
                  : ""
              }
            />
          </Link>
        </div>

        <Link
          className={
            currentPath === "/"
              ? "bg-white border-1 border-white btn btn-ghost text-xl rounded-2xl text-black"
              : "border-1 border-sky-700 btn btn-ghost text-xl rounded-2xl hover:border-sky-600 hover:bg-sky-600"
          }
          href="/"
        >
          Issue Tracker
        </Link>
        <div className="hidden md:flex">
          <ul className="menu menu-horizontal px-1 flex space-x-2">
            <li>
              <Link
                href="/Dashboard"
                className={
                  currentPath === "/Dashboard"
                    ? "bg-white border-1 border-white text-black"
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
                    ? "bg-white border-1 border-white text-black"
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
