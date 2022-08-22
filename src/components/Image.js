import { TimeToLeave } from "@material-ui/icons";
import { wait } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";

const Image = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagebase64, setSelectedImagebase64] = useState(null);
 
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
localStorage.setItem("userpic",base64String.substring(22))
  }
  const saveImage = ()=>{
    fetch("http://localhost:9009/saveimage/"+localStorage.getItem("currentUser"),
    {
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("token")
      },
      body:JSON.stringify({
        base64:selectedImagebase64
      })
    })
    .catch((err)=>console.log(err))
    
    }
  
  return (
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
      /><button onClick={()=>handleImage()}>Save</button><button onClick={()=>saveImage()}>Save2</button>
    </div>
  );
};

export default Image;