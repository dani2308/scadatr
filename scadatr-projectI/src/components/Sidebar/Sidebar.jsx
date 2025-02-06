import React from "react";
import "./Sidebar.css";
import scadatr_logo from "../../assets/scadatr_logo.png";
import { MdDashboard } from "react-icons/md";
import { GoAlertFill } from "react-icons/go";
import { LuLogs } from "react-icons/lu";
import { TbReportAnalytics } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import { GrConfigure } from "react-icons/gr";
import { BiBookAlt } from "react-icons/bi";


const Sidebar = () => {
  return (
    <div className="menu">
      <div className="logo">
        <BiBookAlt className="logo-icon" />
        <h2>SCADATR</h2>
      </div>

      <div className = "menu-list">
        <a href="#" className="item">
        < MdDashboard className="icon"/>
          Dashboard
        </a>
        <a href="#" className="item">
        < GoAlertFill className="icon"/>
          Alerta
        </a>
        <a href="#" className="item">
        < LuLogs className="icon"/>
          Logs
        </a>
        <a href="#" className="item">
        < TbReportAnalytics className="icon"/>
          Relatórios
        </a>
        <a href="#" className="item">
        < FaUsers className="icon"/>
          Utilizadores
        </a>
        <a href="#" className="item">
        < GrConfigure className="icon"/>
          Configurações
        </a>

      
       
      </div>
    </div>
  );
};

export default Sidebar;
