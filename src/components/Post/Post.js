import React from "react";
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


function Post(props) {

        const {username,text,userid,userpic}=props;
        const classes = useStyles();
        const handleuser =()=>{
            localStorage.setItem("linkuserid",userid);
        }
    
        return(
        <Card className={classes.card}>
        <CardHeader className={classes.cardheader}
            avatar={<Link className={classes.link} to={{pathname:'linkuser/'+userid}} onClick={()=>handleuser()}>                  
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">                   
                       <img src={"data:image/jpg;base64," + userpic}></img> 
                     </Avatar>                    
                    </Link>}
                    title={username}
                    ></CardHeader>
            <CardContent className={classes.post}>
                
                {text}
           
            
            </CardContent>
            </Card>
            
        )
    
    }

    export default Post;