import styles from "./App.module.css"
import { MoviesList } from "../components/MoviesList";
import { Login } from "../components/Login";
  
const session="si"
export function App(props){
    if(session==="si"){
        return(
            <div>
                <header>
                    <h1 className={styles.title}>{props.titulo}</h1>
                </header>
              <main>
                  
                  <MoviesList>
                  </MoviesList>
              </main>
            </div>
            );
    }
    else{
        return (
            <div>
                <header>
                    <h1 className={styles.title}>{props.titulo}</h1>
                </header>
                <main>
                    <Login>
                    </Login>
                </main>
            </div>
        );
    }
    
}