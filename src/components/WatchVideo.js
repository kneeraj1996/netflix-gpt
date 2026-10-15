import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { addSelectedVideo } from "../utils/moviesSlice";

const WatchVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useMovieTrailer(id);
  const dispatch = useDispatch();
  const selectedVideo = useSelector((state) => state.movies?.selectedVideo);

  useEffect(() => {
    window.history.pushState({ watchVideo: true }, "", window.location.href);

    const handleBack = () => {
      navigate("/browse", { replace: true });
    };

    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);

  useEffect(() => {

    return () => {
        dispatch(addSelectedVideo(''));
    }
  },[])

  return (
    <div>
      <iframe
        className="w-screen h-screen"
        src={
          "https://www.youtube.com/embed/" +
          selectedVideo +
          "?autoplay=1&controls=0&showinfo=0&rel=0&modestbranding=1"
        }
        title={`YouTube video player for movie ${id}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default WatchVideo;
