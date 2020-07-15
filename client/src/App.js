import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./components/UpdateForm";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [stars, setStars] = useState();
  const [refresh, setRefresh] = useState(false);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => 
        { 
          setMovieList(res.data);
          setStars(res.data.stars);
        })
      .catch(err => console.log(err.response));
  };
  const refresh2 = () => {
    setRefresh(!refresh);
  }

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [refresh]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList}  stars={stars}/>
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} setMovieList={setMovieList} movieList={movieList} refresh2={refresh2}/>
      </Route>

      <Route path="/update-movie/:id" component={UpdateForm} />
    </>
  );
};

export default App;
