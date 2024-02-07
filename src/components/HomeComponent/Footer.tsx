import React from 'react'
import {Home,LayoutGrid,LucideMessageSquareText,Search,User} from "lucide-react";


const Footer = () => {
  return (
    <>
        <p className="">
          <Home />
        </p>
        <p className="">
          <Search />
        </p>
        <p className="">
          <LayoutGrid />
        </p>
        <p className="">
          <LucideMessageSquareText />
        </p>
        <p className="">
          <User />
        </p>
    </>
  )
}

export default Footer