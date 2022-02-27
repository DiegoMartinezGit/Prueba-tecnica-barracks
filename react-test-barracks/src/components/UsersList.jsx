//import styles from "./MovieCard.module.css"
import React, { useState, useEffect } from 'react';
import styles from "./UsersList.module.css";
import {useNavigate} from "react-router-dom";




export function UsersList({session}){
    const API_URL= "http://ec2-54-152-66-249.compute-1.amazonaws.com:4000/"
    const [render, setRender] = useState(false);
    const [users, setUsers] = useState([])
    const navigate=useNavigate();
    

    useEffect( () => {
        // GET request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'GET',
            credentials: "include",
        };

        fetch(API_URL + 'getAllUsers',requestOptions)
        .then(async res=>{
            const data=await res.json();
            if (res.status===401){
                alert("Unauthorized User!!")
                navigate("/")
            }
            else if(res.status===200){
                console.log(data.usuarios);
                setRender(true)
                setUsers(data.usuarios);
            }
            else{
                console.log(res)
                alert("Unauthorized User!!")
                navigate("/Login")
            }   
        }) 
    },[]);

        if(render){
            return(
                <div>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Usertype</th>
                            <th>Last Device</th>
                            </tr>
                            
                        </thead>
                        <tbody>
                        {users.map((user)=>{
                        return(
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.usertype}</td>
                                <td>{user.device}</td>
                            </tr> 
                                );})}
                        </tbody>
                        
                    </table>
                </div>
            );
        }else{
            return <div>
            </div>
        }
}
