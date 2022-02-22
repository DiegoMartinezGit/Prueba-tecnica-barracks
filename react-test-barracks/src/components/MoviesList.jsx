import { MovieCard } from "./MovieCard";
import movies from "../movies.json"
import styles from "./MoviesList.module.css"
import  React,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom"
export function MoviesList(){
    const API_URL= "http://localhost:4000/";
    const navigate=useNavigate();
    const [render, setRender] = useState(false);
    useEffect( () => {
        // GET request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'GET',
            credentials: "include",
            headers:{'Content-Type': 'application/json'}
        };
        
        fetch(API_URL + 'movies',requestOptions)
        .then(async res=>{
            if (res.status===401){
                alert("Unlog user pls login!!")
                navigate("/Login")
            }
            else if(res.status===200){
                setRender(true);
            }
            else{
                console.log(res)
                alert("Upps! something happen ")
                navigate("/Login")
            }
            
        })
            
    });

    if (render){
        return(
            <ul className={styles.moviesGrid}>
                {movies.map((movie)=>{
                return(<MovieCard key={movie.id} movie={movie}></MovieCard> 
                          );})}
            </ul>
        );
    }else{
        return <div></div>
    }
    
}
