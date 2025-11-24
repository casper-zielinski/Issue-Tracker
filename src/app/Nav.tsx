"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { VscEditSession } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Nav = () => {
  const currentPath = usePathname();
  const user = useSelector((state: RootState) => state.userState);

  return (
    <div className="navbar bg-sky-700 shadow-sm h-3">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
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
            className="menu menu-sm dropdown-content bg-sky-300 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link
                href="/Dashboard"
                className={currentPath === "/Dashboard" ? "bg-white" : ""}
                onClick={() => {
                  (document.activeElement as HTMLElement)?.blur(); //to close the dropdown, as HTMLElement because blur is a HTMLElement method
                }}
              >
                <span className="text-black">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/Issues"
                className={currentPath === "/Issues" ? "bg-white" : ""}
                onClick={() => {
                  (document.activeElement as HTMLElement)?.blur(); //to close the dropdown
                }}
              >
                <span className="text-black">Issues</span>
              </Link>
            </li>
            <li>
              <Link
                href="/Settings"
                className={currentPath === "/Settings" ? "bg-white" : ""}
                onClick={() => {
                  (document.activeElement as HTMLElement)?.blur(); //to close the dropdown
                }}
              >
                <span className="text-black">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
        {/* Desktop Navbar */}
        <div
          className={
            currentPath === "/"
              ? "mx-3 border-5 bg-white border-white shadow rounded"
              : "mx-3 border-5 border-sky-700 hover:bg-sky-500  hover:border-sky-500 hover:shadow-2xl hover:text-white rounded"
          }
        >
          <Link href="/">
            <VscEditSession
              className={currentPath === "/" ? "text-black" : ""}
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
        <div className="hidden lg:flex">
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
                  currentPath.match(/^\/Issues(\/.*)?$/) !== null
                    ? "bg-white border-1 border-white text-black"
                    : "border-1 border-sky-700"
                }
              >
                Issues
              </Link>
            </li>
            <li>
              <Link
                href="/Settings"
                className={
                  currentPath === "/Settings"
                    ? "bg-white border-1 border-white text-black"
                    : "border-1 border-sky-700"
                }
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="avatar avatar-placeholder ml-auto">
        <div className="bg-neutral text-neutral-content w-8 sm:w-12 rounded-full">
          <span>{user.email ? user.email.substring(0, 2) : ""}</span>
        </div>
      </div>
    </div>
  );
};

export default Nav;
