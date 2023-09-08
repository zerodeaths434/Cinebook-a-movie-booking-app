import React, { useContext, useReducer, useState, useEffect } from "react";
import Reducer from "./reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  const [moviesArr, setmoviesArr] = useState([]);
  const [genres, setGenres] = useState([]);
  const [premiereMovies, setpremierMovies] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=5e076fda2c2147597642fd3a261ad883&language=en-US&page=1&region=GB"
      ),
      fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=5e076fda2c2147597642fd3a261ad883&language=en-US"
      ),
      fetch(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=5e076fda2c2147597642fd3a261ad883&language=en-US&page=1&region=GB"
      ),
    ]).then(([resMovies, resGenres, resPremieremovies]) => {
      Promise.all([
        resMovies.json(),
        resGenres.json(),
        resPremieremovies.json(),
      ]).then(([dataMovies, dataGenres, dataPremieremovies]) => {
        setmoviesArr(dataMovies.results);
        setGenres(dataGenres.genres);
        setpremierMovies(dataPremieremovies.results);
      });
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AppContext.Provider
      value={{ dispatch, moviesArr, genres, premiereMovies, state }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
