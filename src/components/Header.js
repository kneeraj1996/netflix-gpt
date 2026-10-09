import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

export default function () {
  const user = useSelector((store) => store.user);
  const lang = useSelector((store) => store.config.lang);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
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
            photoURL: photoURL,
          }),
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    //  unsubscribe when component will unmount
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
      });
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between ">
      <img src={LOGO} alt="Logo" className="w-44" />
      {user != null ? (
        <div className="flex h-12 justify-center text-white">
          <div className="flex text-white mr-2">
            {showGptSearch && (
              <select
                value={lang}
                onChange={handleLanguageChange}
                className="px-3 bg-gray-900 text-white"
              >
                {SUPPORTED_LANGUAGES.map((lng) => (
                  <option
                    key={lng.identifier}
                    className="text-black"
                    value={lng.identifier}
                  >
                    {lng.name}
                  </option>
                ))}
              </select>
            )}
            <button
              className="px-3 ml-2 bg-purple-800 rounded-md text-sm
             text-white"
              onClick={handleGptSearchClick}
            >
              {showGptSearch? 'Homepage': 'GPT Search'}
            </button>
          </div>

          {user && user.photoURL ? (
            <img
              src={user && user.photoURL}
              className="w-12 h-12  mr-2 rounded-md"
            />
          ) : null}
          <button onClick={handleSignOut} className="font-bold">
            (Sign Out)
          </button>
        </div>
      ) : null}
    </div>
  );
}
