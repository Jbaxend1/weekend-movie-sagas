import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function Details () {

    const dispatch = useDispatch();

    const history = useHistory();

    const movie = useSelector(store => store.details);

    const genres = useSelector(store => store.genres);


    return (
        <>
            <h5>Movie Details</h5>
            <h2>{movie.title}</h2>
            <img src={movie.poster} alt={movie.title}/>
            <h4>{movie.description}</h4>
            <h2>Genres:</h2>
             {
                genres.map((genres) => {
                    return (
                    <li key={genres.id}>{genres.name}</li>
                    );
                })
                }
            <button onClick={() => history.push('/')}>Back to List</button>
        </>

    );
}

export default Details;