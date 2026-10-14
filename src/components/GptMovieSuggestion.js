import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from '../components/MovieList';

const GptMovieSuggestion = () => {

  const { movieResults, movieNames } = useSelector(store => store.gpt);

  console.log('movieNames neeraahh====',movieNames)
  console.log('movieResults=====',movieResults)
  
  if(!movieNames) return null;

  let firstMovies = movieResults[0];
  console.log('firstMovies====',firstMovies)
  return (
    <div className='p-4 m-4 bg-black text-white'>
    
      {/* <MovieList title={movieNames[0]} movies={firstMovies} /> */}
    {
      movieNames.map((movie, index) => <MovieList title={movieNames[index]} 
      movies={movieResults[index]} 
      />)
    }
    </div>
  )
}

export default GptMovieSuggestion