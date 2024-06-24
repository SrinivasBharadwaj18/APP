// import { RootState } from "@reduxjs/toolkit/query"
import axios from "axios"
import { useAppSelector } from "../hooks"



export function Welcome(){

    const token = useAppSelector((state)=> state.tokenizer.token)

    function handleClick(){
        axios.get('http://localhost:3000/users',{  headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }}

        )
        .then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return(
        <>
            <h1>Welcome</h1>
            <button onClick={handleClick}>users</button>
        </>
    )
}




/// you have stored the token in redux .
/// now you have to figure out how to use the token and place it in the header bearer token 
