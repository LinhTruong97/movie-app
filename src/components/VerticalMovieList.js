import { Alert, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import VerticalMovieCard from './VerticalMovieCard';
import { API_KEY } from '../app/config';
import apiService from '../app/apiService';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SliderPrevArrow, SliderNextArrow } from './SliderArrow';
import LoadingScreen from './LoadingScreen';
import MovieCardModal from './MovieCardModal';


function VerticalMovieList({ title, keyword }) {
    const [moviesList, setMoviesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const getMoviesList = async () => {
            setLoading(true);
            try {
                const response = await apiService.get(`/movie/${keyword}?api_key=${API_KEY}`);
                const data = response.data.results.slice(0, 20);
                setMoviesList(data);
                setError('');
            } catch (error) {
                console.log(error);
                setError(error.message);
            }
            setLoading(false);
        };
        getMoviesList();
    }, [title, keyword]);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    return (
        <>
            <Typography variant="h5" m={3}>
                {title}
            </Typography>

            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                    {error ? (
                        <Alert severity="error" > {error}</Alert>
                    ) : (
                        <Slider {...settings} prevArrow={<SliderPrevArrow />} nextArrow={<SliderNextArrow />} >
                            {moviesList.map((movie, index) => (
                                <Grid
                                    key={movie.id}
                                    onClick={() => handleMovieClick(movie)}
                                    item xs={6} sm={4} md={3}
                                >
                                    <VerticalMovieCard movie={movie} className="movieCard" />
                                </Grid>
                            ))}
                        </Slider>
                    )}
                </>
            )}

            {selectedMovie && <MovieCardModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
        </>
    );
}

export default VerticalMovieList;