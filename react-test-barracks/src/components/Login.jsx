import styles from "./Login.module.css"
export function Login(){
    return(
        <container>
            <form>
                <label>Login</label>
                <br/>
                <label>Email</label>
                <br/>
                <input type="text "className={styles.login} placeholder="Enter e-mail" aria-required></input>
                <br/>
                <label>Password</label>
                <br/>
                <input type="password" placeholder="Enter Password" className="{styles.login}" required></input>
                <br/>
                
                <button type="submit"><label>Login</label></button>
                <button type="submit"><label>Register</label></button>
            </form>
        </container>
    
    );
}