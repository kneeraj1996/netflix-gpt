import React from 'react'
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

export default function MainContainer() {
    const movies = useSelector((state) => state.movies?.nowPlayingMovies);
    if(!movies) return null;
    
    const mainMovie = movies[10];

    const { original_title, overview, id  } = mainMovie

  return (
    <div>
        <VideoTitle title={original_title} description={overview} />
        <VideoBackground  movieId={id}/>
    </div>
  )
}
