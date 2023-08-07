
import { useState, useEffect } from 'react';
import apiService from '../app/apiService';
import { API_KEY } from '../app/config';

const useGenres = () => {
    const [genresList, setGenresList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                setLoading(true);
                const res = await apiService.get(
                    `genre/movie/list?api_key=${API_KEY}&language=en-US`
                );
                setGenresList(res.data.genres);
                setLoading(false);
            } catch (e) {
                setError(e.message);
            }
        };
        fetchGenres();
    }, []);


    return { genresList, loading, error };
};

export default useGenres;
