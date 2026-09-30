import React, { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { onAuthStateChanged } from "firebase/auth";

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

export default function Body() {
  const dispatch = useDispatch();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {

        console.log('on auth state changed====', user)
        const { uid, email, displayName, photoURL } = user;
        console.log('user.displayName=========',user.displayName)
        console.log('data storing===',{
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          })
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL
          }),
        );
      } else {
        dispatch(removeUser());
      }
    });
  }, []);

  return <RouterProvider router={appRouter}></RouterProvider>;
}
