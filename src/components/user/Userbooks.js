import React,{useState,useEffect} from "react";
import { Avatar, Card, CardContent, CardHeader, InputAdornment, makeStyles, OutlinedInput } from "@material-ui/core";
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';




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
    },
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
      },
      inline: {
        display: 'inline',
      },
    }));


function Userbooks(props) {

        const {username,userid,bookpic,bookname}=props;
        const classes = useStyles();
        const [error,setError]=useState(null);
        const[isLoaded,setisLoaded]=useState(false);
        const[userpostlist,setuserpostlist]=useState(null);
       
     
        useEffect(()=>{
            fetch("http://localhost:9009/userbooks/"+localStorage.getItem("linkuserid"),{
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
                setuserpostlist(result);
            },
            (error)=>{
                setisLoaded(true);
                setError(error)
            }
        )

            
           },[userpostlist])
    
        return(
            <List className={classes.root}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={"data:image/jpg;base64," +bookpic} />
              </ListItemAvatar>
              <ListItemText
                primary={bookname}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            
          </List>
            
        )
    
    }

    export default Userbooks;