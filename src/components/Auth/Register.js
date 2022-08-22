import React, {useState} from "react";
import {FormControl, InputLabel, Input, Button, FormHelperText} from "@material-ui/core"
import { useNavigate } from "react-router";


function Register(){
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
        fetch("http://localhost:9009/register",
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
                            localStorage.setItem("username",username)})
          .catch((err) => console.log(err))
    }

    const handleButton = () => {
        sendRequest()
        setUsername("")
        setPassword("")
        console.log(localStorage)
        history("/")
    }
    const handleButton2 = () => {
        history("/login")
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
                onClick= {() => handleButton()}>Register</Button>
            <FormHelperText style={{margin:20}}>Are you already registered?</FormHelperText>
            <Button variant = "contained"
                style = {{
                background :'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color : 'white'}}
                onClick={() => handleButton2()}>Login</Button>
            
        </FormControl>
     )


}
export default Register;