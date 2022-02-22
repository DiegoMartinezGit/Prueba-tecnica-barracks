import styles from "./Navbar.module.css"
import {  Link } from "react-router-dom";
import { Logbutton } from "./Logbutton";


export function Navbar(){
    
    
    return(
        <div className={styles.Nav}>
            <div className={styles.Bars}/>
            <div className={styles.NavMenu}>
            <li>
            <Link className={styles.NavLink} to="/">Home</Link>
            </li>
            <li>
            <Link className={styles.NavLink} to="/Users">Users</Link>
            </li>
            <li>
            <Link className={styles.NavLink} to="/Register">Sign in</Link>
            </li>
            </div>
            <Link className={styles.NavLink} to='/'>
                <h1>NETFLIX</h1>
            </Link>
            <Logbutton></Logbutton>
            
        </div>
    );
}