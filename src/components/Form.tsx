import axios from "axios";
import Input from "./Input";
import { useEffect, useState } from "react";
// import { Welcome } from "../pages/Welcome";
import { Navigate, useNavigate } from "react-router-dom";
import { setToken } from "../features/token/tokenSlice";
import { useAppDispatch } from "../hooks";




export default function Form(){
    const [name, setName] = useState("")
    // const[emailid, setemailid] = useState("")
    const[password, setPassword] = useState("")
    const[signedIn, setSignedIn] = useState("false")
    const navigate = useNavigate()
    const dispatch = useAppDispatch();


    useEffect(()=>{
        console.log("ygh");
        <Navigate to={'/Welcome'} />
    },[signedIn])


    function handleChange(event:any){
        if(event.target.name === "username"){
            setName(event.target.value)
            console.log(name)
        }
        // else if(event.target.name === "emailid"){
        //     setemailid(event.target.value)
        //     console.log(emailid)
        // }
        else if(event.target.name === "password"){
            setPassword(event.target.value)
            console.log(password)
        }
    }
    function handleClick(event:any){
        event.preventDefault()
        console.log(name,password)
        axios.post('http://localhost:3000/auth/login',{
            username: name,
            // emailId :emailid,
            password: password
        })
        .then((res)=>{
            console.log(res)
            setSignedIn("true")
            dispatch(setToken({value:res.data.token}))
            navigate("/Welcome")      
            
        })
        .catch((err)=>{
            console.log(err)
        })
        
        
    }



    return(
        <>
        {/* <Input name="emailid" type="text"  value={emailid} handleChange={handleChange} /> */}
        <Input name="username" type="text" value={name} handleChange={handleChange} />
        <Input name="password" type="password" value={password} handleChange={handleChange} />
        <input type="submit" value="Submit"  onClick={handleClick}/>
        </>
    )
}