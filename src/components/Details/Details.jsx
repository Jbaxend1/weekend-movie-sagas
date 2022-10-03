import { useDispatch, useSelector } from 'react-redux';


function Details () {

    const movie = useSelector(store => store.details);

    return (
        <>
            <h5>Movie Details</h5>
            <h2>{movie.title}</h2>
            <img src={movie.poster} alt={movie.title}/>
            <h4>{movie.description}</h4>
        </>

    );
}

export default Details;