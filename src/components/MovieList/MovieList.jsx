import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


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
        dispatch({ type: 'FEATURED_GENRES', payload: { id: movie.id } })
        // navigate to the featured movie details component
        history.push('/details');
    }

    return (
        <>
            <h1>MovieList</h1>
            <Container maxWidth='med'>
                <Grid container spacing={4}>{
                    movies.map(movie => {
                        return (
                            <Grid item xs={12} sm={3} key={movie.id}>
                                <Card elevation={5} variant="outlined">
                                    <Typography>{movie.title}</Typography>
                                    <img onClick={(event) => selectDetails(movie)} src={movie.poster} />
                                </Card>
                            </Grid>
                        );
                    })
                }
                </Grid>
            </Container>
        </>

    );
}

export default MovieList;