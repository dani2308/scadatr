import React from 'react';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <div className="row">
        <div className="rectangle large"></div>
      </div>
      <div className="row">
        <div className="rectangle small"></div>
        <div className="rectangle small"></div>
        <div className="rectangle small"></div>
      </div>
      <div className="row">
        <div className="rectangle large"></div>
      </div>
    </div>
  );
};

export default Dashboard;