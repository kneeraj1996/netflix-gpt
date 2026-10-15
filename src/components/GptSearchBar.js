import { useRef } from "react";
import { useDispatch } from 'react-redux';
import { lang } from "../utils/languageConstants";
import { useSelector } from "react-redux";
import client from '../utils/openai';
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";


const GptSearchBar = () => {
  const currentLanguage = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  // Search movie in tmdb 
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, API_OPTIONS)
    const json = await data.json();
    return json.results;
  }

  const handleGPTSearchClick = async () => {
    console.log(searchText.current.value)
    const prompt = `Act as a movie recommendation system and suggest some movies for the query: ${searchText.current.value}. Only give names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi mil gaya`;
    console.log('prompt comign====',prompt)
    try {
      const response = await client.models.generateContent({
        model: 'gemini-3.5-flash-lite',
        contents: prompt,
      });
       const movieNames = response.text;
       console.log('movieNames=========',movieNames)
        if (movieNames) {
        const gptMovies = movieNames.split(',').map(movie => movie.trim());
       const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie));
       const tmdbResult = await Promise.all(promiseArray);
       console.log('tmdbResult=====',tmdbResult)
       dispatch(addGptMovieResult({
          movieNames: gptMovies,
          movieResults: tmdbResult
        }));
      }
      else {
        console.log('Could not fetch movies')
      }

    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  }

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form className=" m-6 bg-black w-full md:w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[currentLanguage].gptSearchPlaceholder}
        />
        <button 
        onClick={handleGPTSearchClick}
        className="col-span-3 py-2 px-4 m-4 bg-red-700 text-white rounded-lg">
          {lang[currentLanguage].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
