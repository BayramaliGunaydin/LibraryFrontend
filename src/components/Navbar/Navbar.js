import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Link, useNavigate} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { LockOpen } from "@material-ui/icons";
import { display } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign:"left"
  },
  link:{
    textDecoration:"none",
    textShadow:"none",
    color:"white",
    margin:"5px",
  },

}));


function Navbar(){
  let history = useNavigate();
    let userid =5;
    const classes = useStyles();

const onClick = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("currentUser")
  localStorage.removeItem("userName")
  localStorage.removeItem("userpic")
  localStorage.removeItem("role")
  history("/")
}



    return(
      
        <div>
           <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          <Link to ="/" className={classes.link}>Home</Link>
          {localStorage.getItem("role") == "ADMIN" ? <Link  className={classes.link} to="/addbook">Addbook</Link>  :           
           <div>
            </div>}
            {localStorage.getItem("role") == "ADMIN" ? <Link  className={classes.link} to="/userlist">Userlist</Link>  :           
           <div>
            </div>}  
          </Typography>
          <Typography variant="h6" classname={classes.typo}>
          {localStorage.getItem("currentUser") == null ? <Link  className={classes.link} to="/login">Login</Link>:
             <div><IconButton className={classes.link} onClick = {onClick}><LockOpen></LockOpen></IconButton>
            <Link  className={classes.link} to={{pathname : '/user/' + localStorage.getItem("currentUser")}}>Profile</Link>
            </div>}
            {localStorage.getItem("currentUser") == null ? <Link  className={classes.link} to="/register">Register</Link>:           
           <div>
            </div>}              
          </Typography>
        </Toolbar>
      </AppBar>          
        </div>
    )
}

export default Navbar;