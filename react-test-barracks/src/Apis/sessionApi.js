import axios from "axios"
const LAMBDA_URL= "www.google.com"
async function  login(user, password){
    const res= await axios.get(LAMBDA_URL);
    console.log(res.data);
    return res.data;
}

async function registerUser(user,password){
    const res= await axios.get(LAMBDA_URL);
    console.log(res.data);
    return res.data;
}