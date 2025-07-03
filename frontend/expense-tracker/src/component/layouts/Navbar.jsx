import React from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = ({ onSidebarToggle, sidebarOpen }) => {
  return (
    <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <button
        className="block text-black"
        onClick={() => {
          if (onSidebarToggle) onSidebarToggle();
        }}
      >
        {sidebarOpen ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>
      <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
    </div>
  );
};

export default Navbar;
