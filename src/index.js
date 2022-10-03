import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';


// *** GENERATOR FUNCTIONS/WATCHER ***

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_ALL_GENRES', fetchGenres);
    yield takeEvery('FEATURED_GENRES', featureGenres);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }

}

function* fetchGenres() {
    // get all genres from the database
    try {
        const genres = yield axios.get('/api/genre');
        console.log('get all:', genres.data)
        yield put({ type: 'SET_GENRES', payload: genres.data })
    } catch {
        console.log('get genre error');
    }
}

function* featureGenres(action) {
    // get specific movie genre from database
    try {
        const genres = yield axios.get(`/api/genre/featured/${action.payload.id}`);
        console.log('get specific:', genres.data);
        yield put({ type: 'SET_FEATURED', payload: genres.data })
    } catch {
        console.log('get featured genres error');
    }
}
// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// *** REDUCERS ***

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        case 'SET_FEATURED':
            return action.payload;
        default:
            return state;
    }
}

const details = (state = {}, action) => {
    if (action.type === 'SELECT_MOVIE') {
        return action.payload;
    }

    return state;
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        details,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
