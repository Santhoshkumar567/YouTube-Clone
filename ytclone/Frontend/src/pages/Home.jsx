import React, { useEffect,useState } from "react";
import axios from "../axios"
import Card from "../components/videoCards/Card";

axios.defaults.withCredentials=true;
const Home = ({type}) => {

  const [videos,setVideos] =useState([]);
 
  
  useEffect(()=>{
    const fetchVideos = async ()=>{
      const res=await axios.get(`/videos/${type}`)
      setVideos(res.data)
    }
    fetchVideos()
  },[type])

  return (
    <>

    <div className="ml-64 mt-20    ">
      <div className="grid grid-cols-3  ">
      {videos.map(video=>(
        <Card key={video._id} video={video} />
      ))}
      
      </div> 
    </div>
    </>
  );
};

export default Home;
