import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //  function fetchMovieseHandler() {
  //    fetch("https://swapi.dev/api/films/")
  //      .then((response) => {
  //        return response.json();
  //      })
  //      .then((data) => {
  //        const transformedMovies = data.results.map((movieData) => {
  //          return {
  //            id: movieData.episode_id,
  //            title: movieData.title,
  //            openingText: movieData.opening_crawl,
  //            releaseDate: movieData.release_date,
  //          };
  //        });
  //        setMovies(transformedMovies);
  //      });
  //  }

  const fetchMovieseHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong!!!");
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieseHandler();
  }, [fetchMovieseHandler]);

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  //  return (
  //    <React.Fragment>
  //      <section>
  //        <button onClick={fetchMovieseHandler}>Fetch Movies</button>
  //      </section>
  //      <section>
  //        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
  //        {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
  //        {!isLoading && error && <p>{error}</p>}
  //        {isLoading && <p>Loading...</p>}
  //      </section>
  //    </React.Fragment>
  //  );
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieseHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
