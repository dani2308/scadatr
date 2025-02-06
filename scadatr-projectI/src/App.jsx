import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import "./App.css";


const App = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Content />
      </div>
    </div>
  );
}

export default App;