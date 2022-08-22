import React,{useState,useEffect} from "react";
import { Avatar, Card, CardContent, CardHeader, InputAdornment, makeStyles, OutlinedInput } from "@material-ui/core";
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';




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


function Userlist(props) {

        const {userid,username,userpic}=props;
        const classes = useStyles();
        const [userlist,setuserlist]=useState([]);
        const [error,setError]=useState(null);
        const[isLoaded,setisLoaded]=useState(false);
       
        return(
            <div>
            <Card className={classes.card}>
      <CardHeader className={classes.cardheader}
        avatar={          
            <Link className={classes.link} to={"/linkuser/"+userid}>                  
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">                   
                       {userpic?<img src={"data:image/jpg;base64," + userpic}></img>:localStorage.getItem("username").charAt(0).toUpperCase()} 
                     </Avatar>                    
                    </Link>         
        }      
        title={username}
      />
    </Card>         
        </div>
            
        )
    
    }
export default Userlist;