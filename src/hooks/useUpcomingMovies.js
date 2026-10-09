import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  
  //fETCH DATA FROM TMDB API
  const upcomingMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_OPTIONS,
    );
    const json = await response.json();
    dispatch(addUpcomingMovies(json.results));
  };

  useEffect(() => {
    upcomingMovies();
  }, []);
};

export default useUpcomingMovies;
