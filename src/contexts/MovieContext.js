import React, { useEffect, useState, createContext } from 'react'
import { API_KEY } from '../app/config';
import apiService from '../app/apiService';

const MovieContext = createContext();

function MovieProvider({ children }) {
    const [moviesList, setMoviesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        const getMoviesList = async () => {
            setLoading(true);
            try {
                let data = [];
                for (let page = 1; page <= 5; page++) {
                    const response = await apiService.get(`discover/movie?api_key=${API_KEY}&language=en-US&append_to_response=videos&page=${page}`);
                    data = [...data, ...response.data.results];
                }
                setMoviesList(data);
                setError('');
            } catch (error) {
                console.log('getMoviesList', error);
                setError(error.message);
            }
            setLoading(false);
        };
        getMoviesList();
    }, []);
    return (
        <MovieContext.Provider value={{ moviesList, loading, error }}>
            {children}
        </MovieContext.Provider>
    );
};

export { MovieContext, MovieProvider };

