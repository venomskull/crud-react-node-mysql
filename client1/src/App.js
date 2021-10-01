import './App.css';
import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function App() {
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [newReview, setNewReview] = useState('');
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then(response => {
      setMovieList(response.data);
      // console.log(response);
    });
  }, []);

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName,
      movieReview: review
    }).then(() => {
      // alert('successfully inserted');
      setMovieList([...movieList, { movieName: movieName, movieReview: review }]);
      setMovieName('');
      setReview('');
    })
  }

  const deleteMovie = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`).then(() => {
      setMovieList(movieList.filter(val => val.movieName !== movie));
    })
  }

  const updateReview = (movie) => {
    Axios.put('http://localhost:3001/api/update', {
      movieName: movie,
      movieReview: newReview
    }).then(() => {
      setMovieList(movieList.map(ele => ele.movieName === movie ? {
        movieName: movie,
        movieReview: newReview
      } : ele));
      setNewReview('');
    });
  }

  return (
    <div className='App' >
      <h1>CRUD application</h1>
      <div className="form">
        <label>Movie</label>
        <input type="text" name='movieName' value={movieName} onChange={e => setMovieName(e.target.value)} />
        <label>Review</label>
        <input type="text" name='review' value={review} onChange={e => setReview(e.target.value)} />
        <button onClick={submitReview}>Submit</button>
        {movieList.map((movie, index) => (
          <div className="container" key={index}>
            <h1>{movie.movieName} | {movie.movieReview}</h1>
            <button onClick={() => deleteMovie(movie.movieName)}>Delete</button>
            <input type="text" onChange={e => setNewReview(e.target.value)} />
            <button onClick={() => updateReview(movie.movieName)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
