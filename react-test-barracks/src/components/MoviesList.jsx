import { MovieCard } from "./MovieCard";
import movies from "../movies.json"
import styles from "./MoviesList.module.css"
export function MoviesList(){
    return(
        <ul className={styles.moviesGrid}>
            {movies.map((movie)=>{
            return(<MovieCard key={movie.id} movie={movie}></MovieCard> 
                      );})}
        </ul>
    );
}
