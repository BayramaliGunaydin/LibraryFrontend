import {React,useEffect,useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import User from "./User";
import { Avatar, Card, CardContent, CardHeader, InputAdornment, makeStyles, OutlinedInput } from "@material-ui/core";
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Button from '@mui/material/Button';
import { DataGrid } from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
import Userposts from "../user/Userposts"
import Userlikes from "../user/Userlikes"
import Userbooks from "../user/Userbooks"

const useStyles = makeStyles ((theme)=>({
    card:{
        borderColor:"black",
        border: `1px solid`,
        margin:"7px",
        textalign:"center",
        height:"880px"
    },
    root:{
        width:"240px",
        height:"240px",
        display:"inline-block",
        margin:"10px",
    },
    userpostscard:{
        borderColor:"black",
        border: `1px solid`,
        margin:"7px",
        textalign:"center",
        height:"500px",
        width:"32.45%",
        overflow: 'auto',
        display:"inline-block",
        float:"center"
    }
    }));
    
        

function SingleUser(){
    const {userid}=useParams();
    const [error,setError]=useState(null);
    const[isLoaded,setisLoaded]=useState(false);
    const [error2,setError2]=useState(null);
    const[isLoaded2,setisLoaded2]=useState(false);
    const [error3,setError3]=useState(null);
    const[isLoaded3,setisLoaded3]=useState(false);
    const [error4,setError4]=useState(null);
    const[isLoaded4,setisLoaded4]=useState(false);
    const [user,setUser]=useState(null);
    const[userpostlist,setuserpostlist]=useState(null);
    const[userlikelist,setuserlikelist]=useState(null);
    const[userbooklist,setuserbooklist]=useState(null);
    const classes = useStyles();
    const navigate=useNavigate();
    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 5,
        maxColumns: 6,
      });
      const getposts=()=>{
        fetch("http://localhost:9009/userposts/"+localStorage.getItem("linkuserid"),{
            method:"GET",
            headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("token")
            }
          })
        .then(res2=>res2.json())
        .then(
            (result2)=>{
                setisLoaded2(true);
                setuserpostlist(result2);
            },
            (error2)=>{
                setisLoaded2(true);
                setError2(error2)
            }
        )
    }
    const getlikes=()=>{
        fetch("http://localhost:9009/userlikes/"+localStorage.getItem("currentUser"),{
            method:"GET",
            headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("token")
            }
          })
        .then(res3=>res3.json())
        .then(
            (result3)=>{
                setisLoaded3(true);
                setuserlikelist(result3);
            },
            (error3)=>{
                setisLoaded3(true);
                setError3(error3)
            }
        )
    }
    const getbooks=()=>{
        fetch("http://localhost:9009/userbooks/"+localStorage.getItem("linkuserid"),{
            method:"GET",
            headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("token")
            }
          })
        .then(res4=>res4.json())
        .then(
            (result4)=>{
                setisLoaded4(true);
                setuserbooklist(result4);
            },
            (error4)=>{
                setisLoaded4(true);
                setError4(error4)
            }
        )
    }
    useEffect(()=>{
        fetch("http://localhost:9009/user/"+localStorage.getItem("currentUser"),{
            method:"GET",
            headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("token")
            }
          })
        .then(res=>res.json())
        .then(
            (result)=>{
                setisLoaded(true);
                setUser(result);
            },
            (error)=>{
                setisLoaded(true);
                setError(error)
            }
        )
    },[])

           
        
    if(error&&error2){
        return <div> Error!!!</div>
    }
    else if(!isLoaded&&!isLoaded2){
        <div> Loading... </div>
    }
    else{
        var image= "data:image/jpg;base64," + user.pic;
        console.log(localStorage.getItem("linkuserid"));
        return(
            <div>
<Card className={classes.card}>
    <Link to={{pathname:'/image'}}>
    <Avatar className={classes.root}><img src={image}></img></Avatar>
    </Link>
  <CardHeader className={classes.cardheader}
                title={user.username}
                ></CardHeader>
                <Card className={classes.userpostscard}>
                <div>Myposts{
                error2 ? "error":
                !isLoaded2?getposts():
                isLoaded2?userpostlist.map(post=>(
            <Userposts username={post.customuser.username} text={post.post} userid={post.customuser.id} userpic={post.customuser.pic} bookname={post.book.bookname}></Userposts>            
        )):"Loading.."}</div>
                   
                 </Card>
                 <Card className={classes.userpostscard}><div> MyLikes{
                error3 ? "error":
                !isLoaded3?getlikes():
                isLoaded3?userlikelist.map(like=>(
            <Userlikes username={like.customuserlike.username} userid={like.customuserlike.id} userpic={like.booklike.pic} bookname={like.booklike.bookname}></Userlikes>            
        )):"Loading.."}</div></Card>
        {/* <Card className={classes.userpostscard}><div> MyBooks{
                error4 ? "error":
                !isLoaded4?getbooks():
                isLoaded4?userbooklist.map(book=>(
            <Userbooks username={"asdsad"} userid={"asdds"} bookpic={book.pic} bookname={book.bookname}></Userbooks>            
        )):"Loading.."}</div></Card> */}
                 
</Card>
       
    </div>)
    }
    
}

export default SingleUser;