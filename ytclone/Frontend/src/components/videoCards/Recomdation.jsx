import React, { useState, useEffect } from "react";
import RecomCard from "./RecomCard";
import axios from "../../axios";

const Recomdation = ({ tags }) => {
  const [videos, setVideos] = useState([]);


  useEffect(() => {
    const fetchVideos = async () => {
      const tagsQueryParam = tags.join(",");

      const res = await axios.get(
        `/videos/tags?tags=${tagsQueryParam}`
      );
      console.log(res.data);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);
  if(!videos)
  {
    return;
  }

  return (

    <div>
      { videos.map((video) => (
        <RecomCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export default Recomdation;
