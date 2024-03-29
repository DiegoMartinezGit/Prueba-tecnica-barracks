import styles from "./Navbar.module.css";
import {useNavigate} from "react-router-dom";
import React from 'react';
export function Logbutton({type}){
    const API_URL= "http://ec2-54-152-66-249.compute-1.amazonaws.com:4000/"
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
        console.log(sessionStorage.getItem("lenght"))
    };
    
    
        return( <>
                {/* {(sessionStorage.getItem("lenght")!==null) && */}
                <div className={styles.NavMenu}>
                    <div className={styles.NavBtn}>
                        <button className={styles.NavBtnLink} onClick={resetSessionStorage}>
                            Log out
                        </button>
                    </div>
                </div>
                {/* } */}
                </>
                );
}
