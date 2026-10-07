import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

export default function 

() {
  const user = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;

        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL
          }),
        );
        navigate('/browse')
      } else {
        dispatch(removeUser());
        navigate('/')
      }
    });

    //  unsubscribe when component will unmount
    return () => {
      unsubscribe()
    }

  }, []);



  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between'>
        <img
            src={LOGO}
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
