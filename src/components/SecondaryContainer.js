import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'
import { shuffleArray } from '../utils/validate';

export default function SecondaryContainer() {
  const movies = useSelector(store => store.movies);
  const trendingMovies = shuffleArray(movies.nowPlayingMovies);
  const horrorMovies = shuffleArray(movies.nowPlayingMovies);
  return (
    <div className='bg-black'> 
      <div className='-mt-52 z-20 relative'>
          <MovieList title={'Now Playing'} movies={movies.nowPlayingMovies} />
          <MovieList title={'Trending'} movies={trendingMovies} />
          <MovieList title={'Popular'} movies={movies.popularMovies} />
          <MovieList title={'Upcoming'} movies={movies.upcomingMovies} />
          <MovieList title={'Horror'} movies={horrorMovies} />
      </div>
    </div>
  )
}
