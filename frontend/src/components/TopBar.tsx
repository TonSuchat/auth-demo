import React from "react";
import { Link } from "react-router-dom";
import { getUserData, getRole } from "../auth";

type TopBarType = {
  onLogout: () => void;
};

const TopBar: React.FC<TopBarType> = ({ onLogout }) => {
  return (
    <nav className="level">
      <div className="level-left"></div>
      <div className="level-right">
        {getRole() === "Admin" && (
          <Link className="level-item" to="/admin/users">
            Users
          </Link>
        )}
        {/* eslint-disable-next-line */}
        <a onClick={onLogout} className="level-item" href="#">
          Logout
        </a>
        <span>Hello {getUserData()?.user?.email}</span>
      </div>
    </nav>
  );
};

export default TopBar;
