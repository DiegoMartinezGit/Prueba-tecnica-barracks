import styles from "./Navbar.module.css";
import {useNavigate} from "react-router-dom";
import React from 'react';
export function Logbutton({type}){
    const API_URL= "http://localhost:4000/"
    const navigate=useNavigate();

    function  resetSessionStorage(){

        console.log("loginggout")
        const requestOptions = {
            method: 'DELETE',
            credentials: "include",
            origin: true,
            headers: { 'Content-Type': 'application/json'}
            
        };

        fetch(API_URL + 'logout',requestOptions).then(res=>{
            console.log(res)
            if (res.status===200){
                alert("Logout successfull!")
                navigate("/Login")
            }
            else{
                alert("Upps! something happen ")
            }
    
            sessionStorage.clear();
        })
        
    };
    //if (sessionStorage.getItem("lenght")!==0){
        return(
            <div className={styles.NavMenu}>
                    <div className={styles.NavBtn}>
                        <button className={styles.NavBtnLink} onClick={resetSessionStorage}>
                            Log out
                        </button>
                    </div>
                </div>
        );
    // }else{
    //     return <></>
    // }
    
}