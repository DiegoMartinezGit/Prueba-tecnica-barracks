import styles from "./MovieCard.module.css"
//import Api from "./api.js"

export function MovieCard({key,movie}){
    const imageUrl="https://image.tmdb.org/t/p/w300"
    return(
        <li key={key} className={styles.movieCard}>
            <img src={imageUrl + movie.poster_path} alt={movie.title} className={styles.movieImage}></img>
            <div>{movie.title}</div>
        </li>
    
    
    );
}