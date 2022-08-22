import React, {useState,useEffect} from "react"
import ReactDOM from "react-dom"

function User() {
    const [error,setError] = useState(null);
    const [isLoaded,setisLoaded] = useState(false);
    const [userList,setuserList] = useState([]);

    useEffect(()=>{
         fetch("http://localhost:9009/users")
         .then(res => res.json())
         .then(
             (result) =>{
                 setisLoaded(true);
                 setuserList(result);
             },
             (error)=>{
                 setisLoaded(true);
                 setError(error);
             }
         )
    },[])
    if(error){
        return <div>Error!!!</div>
    }
    else if(!isLoaded){
        return <div>Loading...</div>
    }
    else{
        return(
        <ul>
            {userList.map(user=>(
                <li>
                    {user.username}
                </li>
            ))}
        </ul>);
    }
}

export default User;