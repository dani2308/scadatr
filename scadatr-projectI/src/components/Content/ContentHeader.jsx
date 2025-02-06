import React from "react";
import { BiSearch, BiNotification, BiUser } from "react-icons/bi";
import "./Content.css";

const ContentHeader = () => {
    return (
      <div className="content-header">                    
            <div className="header-activity">
                <div className="search-box">
                    <input type="text" placeholder="Pesquisar..." />
                    <BiSearch className="icon"/>
                </div>

                <div className="notify">
                    <BiNotification className="icon"/>
                </div>

                <div className="user">
                    User_Name
                    <BiUser className="icon"/>
                </div>    

            </div>

      </div>
    );
};

export default ContentHeader;