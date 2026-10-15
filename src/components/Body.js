import React, { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse";
import WatchVideo from "./WatchVideo";

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

export default function Body() {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
     {
      path: "/watchvideo/:id",
      element: <WatchVideo />,
    },
  ]);


  return <RouterProvider router={appRouter}></RouterProvider>;
}
