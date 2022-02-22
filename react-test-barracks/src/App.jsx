import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MoviesList } from "./components/MoviesList";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { UsersList} from "./components/UsersList";

export function App(props){
        return(
            <div>
                <header>
                              
                <Router>
                <Navbar />
                    <Routes>
                        <Route path='/' element={<MoviesList/>} />
                        <Route path='/Users' element={<UsersList/>} />
                        <Route path='/Login' element={<Login type="Login" />} />
                        <Route path='/Register' element={<Login type="Register" />} />
                    </Routes>
                </Router> 
                </header>
              <main>
                  
              </main>
            </div>
            );   
}