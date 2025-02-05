import React from 'react';
import "./Topbar.css";
import { FaBell } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

const Topbar = () => {
  return (
    <div className="Topbar">
      <input type="text" placeholder="Pesquisar..." className="Search-bar" />
      <div className="Topbar-icons">
        <span className="Notification-icon"><FaBell /></span>
        <div className="Profile">
          <span className="User-name">Username</span>
          <span className="Profile-icon"><MdAccountCircle /></span>
        </div>
      </div>
    </div>
  );
}

export default Topbar;