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



function Addbook(props) {
    const {bookid,userpic}=props;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [text, setText] = useState("Bookname");
    const [text3, setText3] = useState("Author");
    const [text2, setText2] = useState("Topic");
    const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagebase64, setSelectedImagebase64] = useState(null);
    var image= "data:image/jpg;base64," + localStorage.getItem("userpic");
    const handleImage = ()=>{
        var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      var img = document.querySelector('img');
      canvas.height = img.naturalHeight;
      canvas.width = img.naturalWidth;
      context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
      var base64String = canvas.toDataURL();
      console.log(base64String.substring(22))
      setSelectedImagebase64(base64String.substring(22));
      localStorage.setItem("bookpic",base64String.substring(22))
        }

    const handlesubmit=()=>{
      setText("");
      setText2("");
      setText3("");    
      savepost();
      localStorage.removeItem("bookpic");
    }
    const handlechange=(value)=>{
      setText(value);
    }
    const handlechange2=(value)=>{
        setText2(value);
      }
      const handlechange3=(value)=>{
        setText3(value);
      }

    const savepost = ()=>{
      fetch("http://localhost:9009/addbook/",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("token")
        },
        body:JSON.stringify({
          bookname:text,
          author:text2,
          topic:text3,
          pic:localStorage.getItem("bookpic")
        })
      })
      .catch((err)=>console.log(err))

      
    }



    return(
         
        <div>
            <Card className={classes.root}>
            <div>
      <h1>Select new profile photo</h1>
      {selectedImage && (
        <div>
        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
        <br />
        <button onClick={()=>setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />
     
      <br /> 
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      /><button onClick={()=>handleImage()}>Save</button>
    </div>
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
          <OutlinedInput
          className={classes.outlined}
          id="outlined"
          inputProps={{maxLength:255}}
          fullWidth
          onChange={(i)=>handlechange2(i.target.value)}
          endAdornment = {
             <InputAdornment position="end">
              



             </InputAdornment>
          }
          value={text2}
          
          
          ></OutlinedInput>
          <OutlinedInput
          className={classes.outlined}
          id="outlined"
          inputProps={{maxLength:255}}
          fullWidth
          onChange={(i)=>handlechange3(i.target.value)}
          endAdornment = {
             <InputAdornment position="end">
              



             </InputAdornment>
          }
          value={text3}
          
          
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

export default Addbook;