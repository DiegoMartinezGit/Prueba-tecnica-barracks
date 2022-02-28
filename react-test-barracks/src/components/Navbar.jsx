import styles from "./Navbar.module.css"
import {  Link } from "react-router-dom";
import { Logbutton } from "./Logbutton";
import React from 'react';


export function Navbar(){
    
    
    return(
        <div className={styles.Nav}>
            <div className={styles.Bars}/>
            <div className={styles.NavMenu}>
            {sessionStorage.getItem("lenght")!==null &&
                <>
                <li>
                <Link className={styles.NavLink} to="/">Home</Link>
                </li>
                <li>
                <Link className={styles.NavLink} to="/Users">Users</Link>
                </li>
                </>
            }
            </div>
            <Link className={styles.NavLink} to='/'>
                <h1>NETFLIX</h1>
            </Link>
            {sessionStorage.getItem("lenght")!==null &&
            <Logbutton></Logbutton>
            }
        </div>
    );
}