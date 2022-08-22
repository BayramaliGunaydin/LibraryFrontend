import React,{useState,useEffect} from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core";
import Book from "../book/Book"
import PostForm from "../Post/PostForm";

const useStyles = makeStyles ((theme)=>({
container:{
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#cfe8fc",
}
}));

function Home(){
    const [error,setError]=useState(null);
    const[isLoaded,setisLoaded]=useState(false);
    const[booklist,setbooklist]=useState([]);
    const [likelist, setlikelist] = useState([]);
    const [error2,setError2]=useState(null);
    const[isLoaded2,setisLoaded2]=useState(false);
    const classes=useStyles();

    

    useEffect(()=>{
        fetch("http://localhost:9009/",{
            method:"GET",
            headers:{
              "Authorization":"Bearer "+localStorage.getItem("token")
            }
          })
        .then(res=>res.json())
        .then(
            (result)=>{
                setisLoaded(true);
                setbooklist(result);
            },
            (error)=>{
                setisLoaded(true);
                setError(error)
            }
        )
    },[])
if(error){
    return <div> Error!!!</div>
}
else if(!isLoaded){
    <div> Loading... </div>
}
else{
    return(
        <Container fixed className={classes.container}>
            
            {booklist.map(book=>(
                <Book like={book.likes}title={book.bookname} text={book.author} topic={book.topic} pic={book.pic} bookid={book.id}></Book>            
            ))}
        </Container>
    );
}
}

export default Home;