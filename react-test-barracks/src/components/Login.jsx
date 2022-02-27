import styles from "./Login.module.css"
import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
export function Login(props){
    const API_URL= "http://ec2-54-152-66-249.compute-1.amazonaws.com:4000/"
    const [inputs, setInputs] = useState({});
    const navigate=useNavigate();

    const handleChange=(event)=>{
    const name = event.target.name;
    const value = event.target.value;
    
    setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.type==="Login"){
            login(inputs);
        }
        else{
            registerUser(inputs);
        }
        
      }
        
    
    async function registerUser(credencials){
        console.log("preguntando...")
        const requestOptions = {
            method: 'PUT',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: credencials.email,
                password:credencials.password,
                usertype:"suscriptor"
            })
        };
        const res= await fetch(API_URL + "registerUser",requestOptions);
        const data= await res.json();
        if (res.status===409){
            alert("user already registered!!")
        }
        else if(res.status===201){
            navigate("/login")
        }
        else{
            alert("Upps! something happen ")
        }
        return data;
    }
    async function  login(credencials){
        const requestOptions = {
            method: 'PUT',
            credentials: "include",
            origin: true,
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: credencials.email,
                password:credencials.password
            })
        };
        
        const res= await fetch(API_URL+"login",requestOptions);
        const data= await res.json();
        
        if (res.status===401){
            //alert("Incorrect Username and/or Password!")
            navigate("/login");
        }
        else if(res.status===200){
            console.log(data.usuario)
            sessionStorage.setItem("email", data.usuario.email);
            sessionStorage.setItem("usertype", data.usuario.usertype);
            sessionStorage.setItem("device", data.usuario.device);
            sessionStorage.setItem("loggedIn", true);
            
             navigate("/");
            alert("Log in succesfull!!")
        }else if(res.status===304){
            navigate("/login");
        }
        else{
            alert("Upps! something happen ")
            navigate("/login");
        }
        return data;
    }
    
    return(
        <div className={styles.grid}>
            <div className={styles.divcontainer}>
                <form onSubmit={handleSubmit}>
                    <label>{props.type}</label>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={inputs.email||""} onChange={handleChange} className={styles.login} placeholder="Enter e-mail" required></input>
                    
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={inputs.password||""}onChange={handleChange} placeholder="Enter Password" className="{styles.login}" required></input>
                    
                    <input type="submit" value={props.type}></input>
                </form>
            </div>
        </div>
    
    );
}
