import React from "react";
import { Image, NavLink, Navbar } from "react-bootstrap";

import './sidebar.css'

function SideBar(){
    return(
        <div className="sidebar vh-100">
            <Image fluid roundedCircle src={JSON.parse(localStorage.getItem('userInfo'))?.picture}></Image>
        </div>
    )
}

export default SideBar