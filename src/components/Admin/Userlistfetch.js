import React,{useState,useEffect} from "react";
import { Avatar, Card, CardContent, CardHeader, InputAdornment, makeStyles, OutlinedInput } from "@material-ui/core";
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Userlist from "../Admin/Userlist"
import Container from '@material-ui/core/Container';




const useStyles = makeStyles ((theme)=>({
    link:{
        textDecoration:"none",
        boxShadow:"none",
        color:"white",
        textalign:"left"
    },
    post:{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"flex-start",
        alignItems:"center",
        textalign:"left"
       
    },
    card:{
        borderColor:"black",
        border: `1px solid`,
        margin:"7px",
        textalign:"left"
    },
    cardheader:{
        textAlign:"left"
    }
    }));


function Userlistfetch() {
        const classes = useStyles();
        const [userlist,setuserlist]=useState([]);
        const [error,setError]=useState(null);
        const[isLoaded,setisLoaded]=useState(false);
        useEffect(()=>{
            fetch("http://localhost:9009/users",{
                method:"GET",
                headers:{
                  "Authorization":"Bearer "+localStorage.getItem("token")
                }
              })
            .then(res=>res.json())
            .then(
                (result)=>{
                    setisLoaded(true);
                    setuserlist(result);
                },
                (error)=>{
                    setisLoaded(true);
                    setError(error)
                }
            )
        },[])
    
        return(
            <Container fixed className={classes.container}>
            
            {userlist.map(user=>(
                <Userlist userid={user.id} username={user.username} userpic={user.pic}></Userlist>            
            ))}
        </Container>
            
        )
    
    }
    export default Userlistfetch;