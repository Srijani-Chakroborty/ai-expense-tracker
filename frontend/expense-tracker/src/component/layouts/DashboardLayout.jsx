import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import EditProfileModal from "./EditProfileModal";
import Modal from "../Modal";

const SIDEBAR_OPEN_KEY = "sidebarOpen";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Initialize from localStorage, default to true for desktop
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(SIDEBAR_OPEN_KEY);
      if (stored !== null) return stored === "true";
      // Default: open on desktop, closed on mobile
      return window.innerWidth >= 1024; // lg breakpoint
    }
    return false;
  });
  const [editOpen, setEditOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    localStorage.setItem(SIDEBAR_OPEN_KEY, sidebarOpen);
  }, [sidebarOpen]);

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    localStorage.clear();
    clearUser();
    window.location.href = "/login";
  };

  // Responsive sidebar overlay for md and below
  return (
    <div className="">
      <Navbar
        activeMenu={activeMenu}
        onSidebarToggle={() => setSidebarOpen((prev) => !prev)}
        sidebarOpen={sidebarOpen}
      />
      {user && (
        <>
          <EditProfileModal
            isOpen={editOpen}
            onClose={() => setEditOpen(false)}
          />
          {/* Logout confirmation modal at root level */}
          <Modal
            isOpen={showLogoutConfirm}
            onClose={() => setShowLogoutConfirm(false)}
            title="Confirm Logout"
          >
            <div className="flex flex-col items-center gap-4">
              <p className="text-base text-gray-600 mb-4">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-end w-full mt-6 gap-2">
                <button
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                  onClick={() => setShowLogoutConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-primary text-white px-6 py-2 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </Modal>
          <div className="flex w-full">
            {/* Fixed sidebar for all screen sizes */}
            <div
              className={`hidden md:max-lg:block md:hidden lg:block`}
              style={{
                width: "16rem",
                minWidth: "16rem",
                height: "calc(100vh - 61px)",
                position: "fixed",
                top: 61,
                left: 0,
                zIndex: 20,
                background: "white",
                borderRight: "1px solid #e5e7eb",
                padding: "1.25rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                display: sidebarOpen ? "block" : "none",
              }}
            >
              <SideMenu
                activeMenu={activeMenu}
                onClose={() => setSidebarOpen(true)}
                onEditProfile={() => setEditOpen(true)}
                onLogoutRequest={() => setShowLogoutConfirm(true)}
              />
            </div>
            <div
              className={`grow transition-all duration-300 px-2 md:px-5 ${
                sidebarOpen && "lg:ml-0"
              } ${!sidebarOpen ? "w-full" : ""}`}
              style={{ marginLeft: sidebarOpen ? "16rem" : 0 }}
            >
              {children}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
