import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from 'react-router-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

function MovieList() {

    // dispatch setup
    const dispatch = useDispatch();
    // access movie reducer store
    const movies = useSelector(store => store.movies);
    // routing history setup
    const history = useHistory();


    useEffect(() => {
        // On page load fetch movies needed
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    function selectDetails(movie) {
        // pass movie in as an object from movies.map
        console.log('Movie Id:', movie.id);
        // dispatch action to details reducer for use on detail page
        dispatch({ type: 'SELECT_MOVIE', payload: movie });
        // dispatch action to featureGenres generator function
        // for later use of getting specific movie genres
        dispatch({ type: 'FEATURED_GENRES', payload: {id: movie.id } })
        // navigate to the featured movie details component
        history.push('/details');
    }

    return (
        <>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id}>
                            <h3>{movie.title}</h3>
                            <img onClick={(event) => selectDetails(movie)} src={movie.poster} alt={movie.title} />
                        </div>
                    );
                })}
            </section>
        </>

    );
}

export default MovieList;