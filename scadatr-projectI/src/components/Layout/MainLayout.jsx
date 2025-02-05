import React from 'react';
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import './MainLayout.css'; // Import the CSS file

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;