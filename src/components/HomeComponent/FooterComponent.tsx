import React from "react";
import {
  Home,
  LayoutGrid,
  LucideMessageSquareText,
  Search,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="fixed bottom-0 border-y border-teal-900 sm:hidden w-full flex justify-around items-center p-4 z-10 bg-white">
        <Link to="/">
          <Home />
        </Link>
        <Link to="/search" className="">
          <Search />
        </Link>
        <Link to="/post" className="">
          <LayoutGrid />
        </Link>
        <Link to="/message" className="">
          <LucideMessageSquareText />
        </Link>
        <Link to="/profile" className="">
          <User />
        </Link>
      </div>
    </>
  );
};

export default Footer;
