import axios from 'axios';

const MOVIES_API="http://localhost:3001/"

async function getMovies(){
    const res= await axios.get(MOVIES_API);
    console.log(res.data);
    return res.data;
}