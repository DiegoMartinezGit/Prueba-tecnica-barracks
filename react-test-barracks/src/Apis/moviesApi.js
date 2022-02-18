import axios from 'axios';
const MOVIES_API="www.google.cl"
async function getMovies(){
    const res= await axios.get(MOVIES_API);
    console.log(res.data);
    return res.data;
}