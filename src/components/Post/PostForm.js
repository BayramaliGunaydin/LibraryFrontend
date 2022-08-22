import React, {useState,useEffect} from "react"
import ReactDOM from "react-dom"
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/Comment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { InputAdornment } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
    textalign:"left"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  
  avatar: {
    backgroundColor: red[500],
  },
  outlined:{
    size:"small",
    width:600,
    margin:"5px",
    alignItems:"left"
  },
  cardheader:{
    textAlign:"left"
  },

}));



function PostForm(props) {
    const {bookid,userpic}=props;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [text, setText] = useState("");
    var image= "data:image/jpg;base64," + localStorage.getItem("userpic");

    const handlesubmit=()=>{
      setText("");
      savepost();
    }
    const handlechange=(value)=>{
      setText(value);
      console.log(userpic)
    }

    const savepost = ()=>{
      fetch("http://localhost:9009/post/"+bookid,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("token")
        },
        body:JSON.stringify({
          userid:localStorage.getItem("currentUser"),
          text:text
        })
      })
      .catch((err)=>console.log(err))

      
    }



    return(
         
        <div>
            <Card className={classes.root}>
      <CardHeader className={classes.cardheader}
        avatar={
          <Link className={classes.link} to={{pathname:'user/'+localStorage.getItem("currentUser")}}>
          <Avatar aria-label="recipe" className={classes.avatar}>
          <img src={image}></img>      
        </Avatar>
        </Link>
        }     
        title = {localStorage.getItem("username")}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <OutlinedInput
          className={classes.outlined}
          id="outlined"
          inputProps={{maxLength:255}}
          fullWidth
          onChange={(i)=>handlechange(i.target.value)}
          endAdornment = {
             <InputAdornment position="end">
              



             </InputAdornment>
          }
          value={text}
          
          
          ></OutlinedInput>
          <Button variant="contained" onClick={handlesubmit}>
        Send
      </Button>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>     
      </CardActions>
    </Card>         
        </div>
    )
 
}

export default PostForm;