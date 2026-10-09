import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  //fETCH DATA FROM TMDB API
  const popularMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_OPTIONS,
    );
    const json = await response.json();
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    popularMovies();
  }, []);
};

export default usePopularMovies;
