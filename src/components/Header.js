import React from 'react'
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function 

() {
  const user = useSelector(store => store.user);
  console.log('user coming=',user)
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/')
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between'>
        <img
            src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-08-21/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
            alt='Logo'
            className='w-44'
        />
        {user !=null?

          <div className='flex h-12 justify-center text-white'>
         {user&& user.photoURL?
          <img
            src={user&& user.photoURL}
            className='w-12 h-12 bg-yellow-200 mr-1'
          />:null}
          <button onClick={handleSignOut} className='font-bold'>(Sign Out)</button>
        </div>: null}
    </div>
  )
}
