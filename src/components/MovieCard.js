import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'
import { Link, Navigate } from 'react-router-dom';

const MovieCard = ({posterPath , id}) => {
  if(!posterPath) return null;
  return (
    <div className='w-36 md:w-48 pr-4'>
        <Link to={`/watchvideo/${id}`}>
          <img 
              alt='Movie Card'
              src={IMG_CDN_URL + posterPath}
              className='rounded-lg'
          />
        </Link>
    </div>
  )
}

export default MovieCard