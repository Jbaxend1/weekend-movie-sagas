import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from 'react-router-dom';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const history = useHistory();
   

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    function selectDetails (movie) {
        console.log('Movie Id:', movie.id);

        dispatch({ type: 'SELECT_MOVIE', payload: movie });

        history.push('/details');
    }

    return (
        <main>
            
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
        </main>

    );
}

export default MovieList;