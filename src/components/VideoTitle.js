import React from 'react'

const VideoTitle = ({ title, description }) => {
  return (
    <div className='pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black aspect-video w-screen'>
      <h1 className='text-6xl font-bold'>{title}</h1>
      <p className='py-6 text-sm w-1/4'>{description}</p>
      <div>
        <button className='bg-white text-black p-4 px-12 text-xl rounded-lg mx-2 hover:bg-opacity-80'>▶️ Play</button>
        <button className='bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg'>More Info</button>
      </div>
    </div>
  ) 
}

export default VideoTitle