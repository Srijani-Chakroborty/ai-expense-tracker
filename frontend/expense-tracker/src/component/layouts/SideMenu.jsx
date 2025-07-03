import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CharAvatar from "../Cards/CharAvatar";
import { LuPencil } from "react-icons/lu";

const SideMenu = ({ activeMenu, onClose, onEditProfile, onLogoutRequest }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      if (onLogoutRequest) onLogoutRequest();
      return;
    }
    navigate(route);
    if (onClose) onClose();
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 fixed top-[61px] left-0 z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        <div className="relative">
          {user?.profileImageUrl ? (
            <img
              src={user?.profileImageUrl || ""}
              alt="Profile Image"
              className="w-20 h-20 bg-slate-400 rounded-full"
            />
          ) : (
            <CharAvatar
              fullName={user?.fullName}
              width="w-20"
              height="h-20"
              style="text-2xl"
            />
          )}
          <button
            className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-2 shadow hover:bg-purple-700 transition"
            onClick={onEditProfile}
            title="Edit Profile"
          >
            <LuPencil className="text-lg" />
          </button>
        </div>
        <h5 className="text-gray-950 font-medium leading-6">
          {user?.fullName || ""}
        </h5>
      </div>
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu == item.label ? "text-white bg-primary" : ""
          } py-3 px-6 rounded-lg mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
