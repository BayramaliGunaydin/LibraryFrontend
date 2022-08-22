import React, {useState} from "react";
import {FormControl, InputLabel, Input, Button, FormHelperText} from "@material-ui/core"
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";


function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    let history = useNavigate();
    const handleUsername = (value) => {
        setUsername(value)
    } 

    const handlePassword = (value) => {
        setPassword(value)
    } 

    const sendRequest = () => {
        console.log(username,password)
        fetch("http://localhost:9009/login",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                username:username,
                password:password
            }),
        })
          .then((res) => res.json())
          .then((result) => {localStorage.setItem("token",result.message);
                            localStorage.setItem("currentUser",result.id);
                            localStorage.setItem("username",username);
                            localStorage.setItem("userpic",result.pic);
                            localStorage.setItem("role",result.role.rolename);
                            window.location.reload(false);
                        })
          .catch((err) => console.log(err))
    }

    const handleButton = () => {
        sendRequest()
        setUsername("")
        setPassword("")
        console.log(localStorage)     
        history("/")
    }




     return(
        <FormControl>
            <InputLabel>Username</InputLabel>
            <Input  onChange = {(i) => handleUsername(i.target.value)}/>
            <InputLabel  style={{top: 80}}>Password</InputLabel>
            <Input  style={{top: 40}}
            onChange = {(i) => handlePassword(i.target.value)}/>
            <Button variant = "contained"
                style = {{marginTop : 60,
                background :'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color : 'white'}}
                onClick= {() => handleButton()}>Login</Button>
            
        </FormControl>
     )
}
export default Login;