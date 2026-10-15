import React from 'react'
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';
import MoreInfo from './MoreInfo';

export default function MainContainer() {
    const movies = useSelector((state) => state.movies?.nowPlayingMovies);
    const visibleMoreInfo = useSelector((state) => state.movies?.visibleMoreInfo);
    if(!movies) return null;
    
    const mainMovie = movies[10];

    const { original_title, overview, id  } = mainMovie

  return (
    <div className='pt-[30%] bg-black md:pt-0'>
        <VideoTitle title={original_title} description={overview} id={id} />
        <VideoBackground  movieId={id}/>
        {
          visibleMoreInfo?
            <MoreInfo info={mainMovie}/>:
          null
        }
    </div>
  )
}
