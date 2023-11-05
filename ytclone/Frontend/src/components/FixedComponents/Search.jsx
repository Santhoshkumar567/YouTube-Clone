
import React, { useState,useEffect } from 'react'
import axios from "../../axios"
import { useLocation } from 'react-router-dom'
import Card from "../videoCards/Card";

const Search = () => {
  
  const [videos, setVideos] = useState([])

  const query = useLocation().search

  useEffect(()=>{
    const fetchVideos = async () =>{
        const res = await axios.get(`/videos/search${query}`)
        setVideos(res.data)
    }
    fetchVideos()
  },[query])

  return (
    <div className='ml-64 mt-16 grid grid-cols-3 '>{videos.map(video=>(
      <Card key={video._id} video={video} />
    ))}</div>
  )
}

export default Search