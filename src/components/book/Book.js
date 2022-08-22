import React, {useState,useEffect,useRef} from "react"
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
import PostForm from "../Post/PostForm";
import { Container } from "@material-ui/core";
import Post from "../Post/Post"
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
    margin:"5px"
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
  buton:{
    marginLeft:"15px"
  }
}));



function Book(props) {
    const {like,title,text,topic,pic,bookid,userid,username,book}=props;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [postlist, setpostlist] = useState([]);
    const [likelist, setlikelist] = useState([]);
    const isInitialMount=useRef(true);
    const [error,setError]=useState(null);
    const[isLoaded,setisLoaded]=useState(false);
    const [error2,setError2]=useState(null);
    const[isLoaded2,setisLoaded2]=useState(false);
    const[liked,setisliked]=useState(false);
    const[likecount,setlikecount]=useState(like.length);
    var image= "data:image/jpg;base64," + pic;
    const[likeid,setlikeid]=useState(null);
    const handleExpandClick = () => {
      setExpanded(!expanded);
      getpost();
    };
    const checklike = () =>{
     console.log(like);
     console.log(localStorage.getItem("currentUser"));
     var likecontrol=like.find((like => like.userid==localStorage.getItem("currentUser")))
     if(likecontrol!=null){
       setlikeid(likecontrol.id);
       setisliked(true);
     }      
    }
    const handlelike = () =>{
      setisliked(!liked);
      if(!liked){
        savelike();
        setlikecount(likecount +1);
      }
      else{
        deletelike();
        setlikecount(likecount +-1);
      }  
     }
     const savelike = () =>{
      fetch("http://localhost:9009/addlike/"+localStorage.getItem("currentUser"),{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("token")
      },
      body:JSON.stringify({
        bookid:bookid
      })
    }
      )
      .then(res => res.json())
      .catch((err)=>console.log(err))
    }
    const addbooklist = () =>{
      fetch("http://localhost:9009/addbooktouser/"+localStorage.getItem("currentUser"),{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("token")
      },
      body:JSON.stringify({
        bookid:bookid
      })
    }
      )
      .then(res => res.json())
      .catch((err)=>console.log(err))
    }
    const deletelike = () =>{
      fetch("http://localhost:9009/deletelike/"+likeid,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("token")
      },
      body:JSON.stringify({
        bookid:bookid
      })
    }
      )
      .then(res => res.json())
      .catch((err)=>console.log(err))
    }

    const getpost = () =>{     
      fetch("http://localhost:9009/posts/"+bookid,{
      method:"GET",
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("token")
      }
    }
      )
      .then(res => res.json())
      .then(
        (result)=>{
            setisLoaded(true);
            setpostlist(result);
        },
        (error)=>{
            setisLoaded(true);
            setError(error)
        }
    )
    }
  

    useEffect(()=>{
     if(isInitialMount.current){
      isInitialMount.current=false;
     }
     else{
      getpost()
     }
    },[likelist])

    useEffect(()=>{    
       checklike();
     },[])






    return(
    
        <div>
            <Card className={classes.root}>
      <CardHeader
        avatar={          
            <img src={image}></img>          
        }      
        title={title}
        subheader={"Yazar:"+text+"      Tür:"+topic}
      />
      <CardActions disableSpacing>
        <IconButton onClick={handlelike} aria-label="add to favorites">
          <FavoriteIcon style={liked?{color:"red"}:null}/>
        </IconButton>
        {likecount}
        {/* <Button variant="outlined" color="primary" className={classes.buton} onClick={addbooklist()}>
        Add My Booklist
      </Button>  */}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
                 
        </IconButton>
        
        
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Container fixed className={classes.container}>
           {error ? "error":
            isLoaded? postlist.map(post=>(
             <Post bookid={post.bookid} username={post.customuser.username} text={post.post} userid={post.customuser.id} userpic={post.customuser.pic}></Post>
            )):"Loading..."   
           }           
           
            <PostForm bookid={bookid}  ></PostForm>
                       
        </Container>
      </Collapse>
    </Card>         
        </div>
    )
 
}

export default Book;